-- Standardize medications
ALTER TABLE intakes DROP COLUMN IF EXISTS current_medications;
ALTER TABLE clients DROP COLUMN IF EXISTS current_medications;

-- Standardize mobility
ALTER TABLE intakes DROP COLUMN IF EXISTS mobility_aids;
ALTER TABLE intakes DROP COLUMN IF EXISTS mobility_needs;
ALTER TABLE clients DROP COLUMN IF EXISTS mobility_needs;
ALTER TABLE clients DROP COLUMN IF EXISTS mobility_aids;

-- Standardize insurance
ALTER TABLE intakes DROP COLUMN IF EXISTS policy_number;
ALTER TABLE clients DROP COLUMN IF EXISTS policy_number;

-- Add missing columns if they do not exist
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS scheduled_date DATE;
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS start_time TIME;
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS end_time TIME;
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS service_type TEXT;
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS hourly_rate NUMERIC;
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Update status enum/constraint to allow all values used in the app
-- (If using a CHECK constraint or enum type, update accordingly)
-- Example for CHECK constraint:
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name='shifts' AND column_name='status'
  ) THEN
    BEGIN
      ALTER TABLE shifts DROP CONSTRAINT IF EXISTS shifts_status_check;
    EXCEPTION WHEN undefined_object THEN NULL; END;
    ALTER TABLE shifts ADD CONSTRAINT shifts_status_check 
      CHECK (status IN ('assigned', 'checked_in', 'completed', 'cancelled', 'no_show'));
  END IF;
END$$;

-- Optionally, add created_at if not present
ALTER TABLE shifts ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- (Optional) Remove any other legacy or unused columns after confirming with the codebase 