-- Fix computed columns constraint error by properly handling dependencies
-- This script handles the "column can only be updated to DEFAULT" error

DO $$
BEGIN
    -- Drop the trigger first to remove dependency
    DROP TRIGGER IF EXISTS update_shift_calculations ON shifts;
    DROP TRIGGER IF EXISTS update_shift_computed_columns ON shifts;
    
    -- Now drop the functions
    DROP FUNCTION IF EXISTS calculate_shift_details();
    DROP FUNCTION IF EXISTS calculate_shift_details() CASCADE;
    
    -- Check if columns are generated and drop them if they are
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' 
        AND column_name = 'duration_hours' 
        AND is_generated = 'ALWAYS'
    ) THEN
        ALTER TABLE shifts DROP COLUMN duration_hours CASCADE;
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' 
        AND column_name = 'total_cost' 
        AND is_generated = 'ALWAYS'
    ) THEN
        ALTER TABLE shifts DROP COLUMN total_cost CASCADE;
    END IF;
    
    -- Add regular columns if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'duration_hours'
    ) THEN
        ALTER TABLE shifts ADD COLUMN duration_hours DECIMAL(4,2);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'total_cost'
    ) THEN
        ALTER TABLE shifts ADD COLUMN total_cost DECIMAL(10,2);
    END IF;
    
    RAISE NOTICE 'Columns updated successfully';
END $$;

-- Create function to calculate shift details
CREATE OR REPLACE FUNCTION calculate_shift_details()
RETURNS TRIGGER AS $$
DECLARE
    caregiver_rate DECIMAL(10,2);
    calculated_hours DECIMAL(4,2);
    start_datetime TIMESTAMP;
    end_datetime TIMESTAMP;
BEGIN
    -- Get caregiver hourly rate
    IF NEW.caregiver_id IS NOT NULL THEN
        SELECT hourly_rate INTO caregiver_rate
        FROM caregivers 
        WHERE id = NEW.caregiver_id;
    END IF;
    
    -- Set default rate if not found
    IF caregiver_rate IS NULL THEN
        caregiver_rate := 25.00;
    END IF;
    
    -- Create full datetime objects for calculation
    start_datetime := NEW.scheduled_date + NEW.start_time::time;
    end_datetime := NEW.scheduled_date + NEW.end_time::time;
    
    -- Handle overnight shifts (end time is next day)
    IF NEW.end_time::time < NEW.start_time::time THEN
        end_datetime := end_datetime + INTERVAL '1 day';
    END IF;
    
    -- Calculate duration in hours
    calculated_hours := EXTRACT(EPOCH FROM (end_datetime - start_datetime)) / 3600.0;
    
    -- Ensure positive duration
    IF calculated_hours <= 0 THEN
        calculated_hours := 1.0; -- Minimum 1 hour
    END IF;
    
    -- Update the calculated fields
    NEW.duration_hours := ROUND(calculated_hours, 2);
    NEW.total_cost := ROUND(calculated_hours * caregiver_rate, 2);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_shift_calculations
    BEFORE INSERT OR UPDATE ON shifts
    FOR EACH ROW
    EXECUTE FUNCTION calculate_shift_details();

-- Update existing records that don't have calculated values
UPDATE shifts SET 
    duration_hours = CASE 
        WHEN end_time::time < start_time::time THEN
            -- Overnight shift
            ROUND(EXTRACT(EPOCH FROM (
                (scheduled_date + end_time::time + INTERVAL '1 day') - 
                (scheduled_date + start_time::time)
            )) / 3600.0, 2)
        ELSE
            -- Same day shift
            ROUND(EXTRACT(EPOCH FROM (
                (scheduled_date + end_time::time) - 
                (scheduled_date + start_time::time)
            )) / 3600.0, 2)
    END,
    total_cost = CASE 
        WHEN end_time::time < start_time::time THEN
            -- Overnight shift
            ROUND((EXTRACT(EPOCH FROM (
                (scheduled_date + end_time::time + INTERVAL '1 day') - 
                (scheduled_date + start_time::time)
            )) / 3600.0) * COALESCE((SELECT hourly_rate FROM caregivers WHERE id = shifts.caregiver_id), 25.00), 2)
        ELSE
            -- Same day shift
            ROUND((EXTRACT(EPOCH FROM (
                (scheduled_date + end_time::time) - 
                (scheduled_date + start_time::time)
            )) / 3600.0) * COALESCE((SELECT hourly_rate FROM caregivers WHERE id = shifts.caregiver_id), 25.00), 2)
    END
WHERE duration_hours IS NULL OR total_cost IS NULL;

-- Verify the fix worked
SELECT 
    'Fixed computed columns - verification:' as status,
    COUNT(*) as total_shifts,
    COUNT(CASE WHEN duration_hours IS NOT NULL THEN 1 END) as shifts_with_duration,
    COUNT(CASE WHEN total_cost IS NOT NULL THEN 1 END) as shifts_with_cost
FROM shifts;

-- Show sample of calculated values
SELECT 
    'Sample calculated shifts:' as info,
    scheduled_date,
    start_time,
    end_time,
    duration_hours,
    total_cost,
    status
FROM shifts 
WHERE duration_hours IS NOT NULL 
ORDER BY scheduled_date DESC, start_time 
LIMIT 5;
