-- Add location tracking and check-in/out columns to shifts table
DO $$
BEGIN
    -- Add check_in_time column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'check_in_time'
    ) THEN
        ALTER TABLE shifts ADD COLUMN check_in_time TIMESTAMPTZ;
    END IF;

    -- Add check_out_time column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'check_out_time'
    ) THEN
        ALTER TABLE shifts ADD COLUMN check_out_time TIMESTAMPTZ;
    END IF;

    -- Add check_in_location column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'check_in_location'
    ) THEN
        ALTER TABLE shifts ADD COLUMN check_in_location JSONB;
    END IF;

    -- Add check_out_location column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'check_out_location'
    ) THEN
        ALTER TABLE shifts ADD COLUMN check_out_location JSONB;
    END IF;

    -- Add shift_status column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'shift_status'
    ) THEN
        ALTER TABLE shifts ADD COLUMN shift_status VARCHAR(20) DEFAULT 'scheduled';
    END IF;

    -- Add notes column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'notes'
    ) THEN
        ALTER TABLE shifts ADD COLUMN notes TEXT;
    END IF;
END $$;

-- Create function to validate check-in timing (within 1 hour of shift start)
CREATE OR REPLACE FUNCTION can_check_in(shift_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    shift_start TIMESTAMPTZ;
    now_time TIMESTAMPTZ;
BEGIN
    SELECT date + start_time INTO shift_start
    FROM shifts 
    WHERE id = shift_id;
    
    now_time := NOW();
    
    -- Allow check-in up to 1 hour before shift start and any time after
    RETURN (now_time >= (shift_start - INTERVAL '1 hour'));
END;
$$ LANGUAGE plpgsql;

-- Create function to handle check-in
CREATE OR REPLACE FUNCTION check_in_shift(
    shift_id UUID,
    location_data JSONB DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    can_check BOOLEAN;
BEGIN
    -- Check if caregiver can check in
    SELECT can_check_in(shift_id) INTO can_check;
    
    IF NOT can_check THEN
        RAISE EXCEPTION 'Cannot check in more than 1 hour before shift start';
    END IF;
    
    -- Update shift with check-in data
    UPDATE shifts 
    SET 
        check_in_time = NOW(),
        check_in_location = location_data,
        shift_status = 'checked_in'
    WHERE id = shift_id
    AND caregiver_id IN (
        SELECT id FROM caregivers WHERE email = auth.email()
    );
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to handle check-out
CREATE OR REPLACE FUNCTION check_out_shift(
    shift_id UUID,
    location_data JSONB DEFAULT NULL,
    shift_notes TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Update shift with check-out data
    UPDATE shifts 
    SET 
        check_out_time = NOW(),
        check_out_location = location_data,
        shift_status = 'completed',
        notes = COALESCE(shift_notes, notes)
    WHERE id = shift_id
    AND caregiver_id IN (
        SELECT id FROM caregivers WHERE email = auth.email()
    )
    AND check_in_time IS NOT NULL; -- Must be checked in first
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_shifts_caregiver_date ON shifts(caregiver_id, date);
CREATE INDEX IF NOT EXISTS idx_shifts_status ON shifts(shift_status);
CREATE INDEX IF NOT EXISTS idx_shifts_check_in ON shifts(check_in_time);

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION can_check_in(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION check_in_shift(UUID, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION check_out_shift(UUID, JSONB, TEXT) TO authenticated;
