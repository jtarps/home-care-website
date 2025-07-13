-- Enable Row Level Security on all tables (only if not already enabled)
DO $$
BEGIN
    -- Enable RLS on caregivers table
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'caregivers' 
        AND rowsecurity = true
    ) THEN
        ALTER TABLE caregivers ENABLE ROW LEVEL SECURITY;
    END IF;

    -- Enable RLS on shifts table
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'shifts' 
        AND rowsecurity = true
    ) THEN
        ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;
    END IF;

    -- Enable RLS on clients table
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = 'clients' 
        AND rowsecurity = true
    ) THEN
        ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Caregivers can view own profile" ON caregivers;
DROP POLICY IF EXISTS "Caregivers can update own profile" ON caregivers;
DROP POLICY IF EXISTS "Caregivers can view assigned shifts" ON shifts;
DROP POLICY IF EXISTS "Caregivers can update assigned shifts" ON shifts;
DROP POLICY IF EXISTS "Caregivers can view assigned clients" ON clients;

-- Create policies for caregivers table
CREATE POLICY "Caregivers can view own profile" ON caregivers
  FOR SELECT USING (auth.email() = email);

CREATE POLICY "Caregivers can update own profile" ON caregivers
  FOR UPDATE USING (auth.email() = email);

-- Create policies for shifts table
CREATE POLICY "Caregivers can view assigned shifts" ON shifts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM caregivers 
      WHERE caregivers.id = shifts.caregiver_id 
      AND caregivers.email = auth.email()
    )
  );

CREATE POLICY "Caregivers can update assigned shifts" ON shifts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM caregivers 
      WHERE caregivers.id = shifts.caregiver_id 
      AND caregivers.email = auth.email()
    )
  );

-- Create policies for clients table
CREATE POLICY "Caregivers can view assigned clients" ON clients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM shifts 
      JOIN caregivers ON caregivers.id = shifts.caregiver_id
      WHERE shifts.client_id = clients.id 
      AND caregivers.email = auth.email()
    )
  );

-- Create helper function to get current caregiver ID
CREATE OR REPLACE FUNCTION get_current_caregiver_id()
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT id FROM caregivers 
    WHERE email = auth.email()
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, UPDATE ON caregivers TO authenticated;
GRANT SELECT, UPDATE ON shifts TO authenticated;
GRANT SELECT ON clients TO authenticated;
