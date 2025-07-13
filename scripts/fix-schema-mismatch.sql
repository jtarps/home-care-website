-- Fix Schema Mismatch Script
-- This script adds missing columns to intakes table and fixes RLS policies

-- 1. Add missing columns to intakes table
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS allergies TEXT;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS gender VARCHAR(50);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS mobility_level VARCHAR(100);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS care_requirements TEXT;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS preferred_start_date DATE;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS preferred_schedule VARCHAR(100);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS insurance_number VARCHAR(100);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS assigned_caregiver_id UUID;

-- 2. Add foreign key for assigned_caregiver_id if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
    WHERE tc.table_name = 'intakes'
      AND tc.constraint_type = 'FOREIGN KEY'
      AND kcu.column_name = 'assigned_caregiver_id'
  ) THEN
    ALTER TABLE intakes
      ADD CONSTRAINT fk_intakes_assigned_caregiver
      FOREIGN KEY (assigned_caregiver_id) REFERENCES caregivers(id) ON DELETE SET NULL;
  END IF;
END $$;

-- 3. Fix RLS policies for caregivers table
-- Drop existing policies that might be too restrictive
DROP POLICY IF EXISTS "Allow authenticated read on caregivers" ON caregivers;
DROP POLICY IF EXISTS "Allow authenticated insert on caregivers" ON caregivers;
DROP POLICY IF EXISTS "Allow authenticated update on caregivers" ON caregivers;

-- Create new, more permissive policies
CREATE POLICY "Allow authenticated all on caregivers" ON caregivers
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. Ensure intakes table has proper RLS policies
DROP POLICY IF EXISTS "Allow authenticated read on intakes" ON intakes;
DROP POLICY IF EXISTS "Allow authenticated insert on intakes" ON intakes;
DROP POLICY IF EXISTS "Allow authenticated update on intakes" ON intakes;

CREATE POLICY "Allow authenticated all on intakes" ON intakes
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. Add a test caregiver if none exist
INSERT INTO caregivers (first_name, last_name, email, phone, status)
SELECT 'Test', 'Caregiver', 'test@care.com', '555-555-5555', 'active'
WHERE NOT EXISTS (SELECT 1 FROM caregivers WHERE status = 'active' LIMIT 1);

-- 6. Show the updated schema
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'intakes' 
    AND table_schema = 'public'
ORDER BY ordinal_position; 