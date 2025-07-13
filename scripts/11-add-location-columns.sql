-- Add location tracking columns for check-in/check-out
-- This ensures we have proper location tracking for the caregiver portal

DO $$
BEGIN
    -- Add check-in location columns if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'check_in_latitude'
    ) THEN
        ALTER TABLE shifts ADD COLUMN check_in_latitude DECIMAL(10, 8);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'check_in_longitude'
    ) THEN
        ALTER TABLE shifts ADD COLUMN check_in_longitude DECIMAL(11, 8);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'check_in_accuracy'
    ) THEN
        ALTER TABLE shifts ADD COLUMN check_in_accuracy DECIMAL(8, 2);
    END IF;
    
    -- Add check-out location columns if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'check_out_latitude'
    ) THEN
        ALTER TABLE shifts ADD COLUMN check_out_latitude DECIMAL(10, 8);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'check_out_longitude'
    ) THEN
        ALTER TABLE shifts ADD COLUMN check_out_longitude DECIMAL(11, 8);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'check_out_accuracy'
    ) THEN
        ALTER TABLE shifts ADD COLUMN check_out_accuracy DECIMAL(8, 2);
    END IF;
    
    -- Add legacy location columns for backward compatibility
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'check_in_location'
    ) THEN
        ALTER TABLE shifts ADD COLUMN check_in_location TEXT;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'check_out_location'
    ) THEN
        ALTER TABLE shifts ADD COLUMN check_out_location TEXT;
    END IF;
    
    RAISE NOTICE 'Location tracking columns added successfully';
END $$;

-- Create shift_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS shift_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shift_id UUID NOT NULL REFERENCES shifts(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL,
    old_status VARCHAR(20),
    new_status VARCHAR(20),
    notes TEXT,
    performed_by UUID REFERENCES auth.users(id),
    performed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on shift_logs for better performance
CREATE INDEX IF NOT EXISTS idx_shift_logs_shift_id ON shift_logs(shift_id);
CREATE INDEX IF NOT EXISTS idx_shift_logs_performed_at ON shift_logs(performed_at);

-- Verify the location columns were added
SELECT 
    'Location tracking setup complete:' as status,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'shifts' 
AND column_name LIKE '%location%' OR column_name LIKE '%latitude%' OR column_name LIKE '%longitude%' OR column_name LIKE '%accuracy%'
ORDER BY column_name;
