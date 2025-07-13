-- Database Improvements Script
-- This script addresses the major issues identified in the database analysis

-- 1. Add intake-to-client conversion tracking
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS converted_to_client_id UUID REFERENCES clients(id);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS converted_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS converted_by UUID; -- admin user who approved
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS conversion_status VARCHAR(20) DEFAULT 'pending' 
  CHECK (conversion_status IN ('pending', 'approved', 'rejected', 'converted'));

-- Add date_of_birth column to intakes if not exists
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS date_of_birth DATE;

-- Add status column to intakes if not exists, with useful default and check constraint
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'assigned', 'converted'));

-- Add client_id column and foreign key to intakes if not exists
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS client_id UUID;
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
        WHERE tc.table_name = 'intakes'
          AND tc.constraint_type = 'FOREIGN KEY'
          AND kcu.column_name = 'client_id'
    ) THEN
        ALTER TABLE intakes ADD CONSTRAINT fk_intakes_client_id FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL;
    END IF;
END $$;

-- 2. Add relationship tracking for family members
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS submitted_by_family_id UUID REFERENCES family_members(id);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS primary_family_contact_id UUID REFERENCES family_members(id);

-- 3. Standardize field names across tables
-- Note: These will only work if the columns exist, otherwise they'll be skipped
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'clients' AND column_name = 'medications') THEN
        ALTER TABLE clients RENAME COLUMN medications TO current_medications;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'clients' AND column_name = 'mobility_needs') THEN
        ALTER TABLE clients RENAME COLUMN mobility_needs TO mobility_aids;
    END IF;
END $$;

-- 4. Add missing indexes for performance
CREATE INDEX IF NOT EXISTS idx_intakes_conversion_status ON intakes(conversion_status);
CREATE INDEX IF NOT EXISTS idx_intakes_converted_to_client ON intakes(converted_to_client_id);
CREATE INDEX IF NOT EXISTS idx_intakes_submitted_by_family ON intakes(submitted_by_family_id);
CREATE INDEX IF NOT EXISTS idx_clients_primary_family_contact ON clients(primary_family_contact_id);

-- 5. Create intake approval workflow table
CREATE TABLE IF NOT EXISTS intake_approvals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  intake_id UUID REFERENCES intakes(id) ON DELETE CASCADE,
  reviewed_by UUID, -- admin user
  decision VARCHAR(20) CHECK (decision IN ('approve', 'reject', 'request_info')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create client onboarding checklist table
CREATE TABLE IF NOT EXISTS client_onboarding (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  step VARCHAR(50), -- 'initial_assessment', 'care_plan', 'family_setup', 'insurance_verification', etc.
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  completed_by UUID,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create indexes for new tables
CREATE INDEX IF NOT EXISTS idx_intake_approvals_intake_id ON intake_approvals(intake_id);
CREATE INDEX IF NOT EXISTS idx_intake_approvals_reviewed_by ON intake_approvals(reviewed_by);
CREATE INDEX IF NOT EXISTS idx_client_onboarding_client_id ON client_onboarding(client_id);
CREATE INDEX IF NOT EXISTS idx_client_onboarding_step ON client_onboarding(step);

-- 8. Enable RLS on new tables
ALTER TABLE intake_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_onboarding ENABLE ROW LEVEL SECURITY;

-- 9. Create RLS policies for new tables
CREATE POLICY "Allow authenticated read on intake_approvals" ON intake_approvals
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on intake_approvals" ON intake_approvals
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on intake_approvals" ON intake_approvals
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read on client_onboarding" ON client_onboarding
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on client_onboarding" ON client_onboarding
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on client_onboarding" ON client_onboarding
  FOR UPDATE TO authenticated
  USING (true);

-- 10. Add triggers for updated_at on new tables
CREATE TRIGGER update_client_onboarding_updated_at
    BEFORE UPDATE ON client_onboarding
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 11. Add data validation constraints
ALTER TABLE intakes ADD CONSTRAINT IF NOT EXISTS valid_email_intakes 
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE clients ADD CONSTRAINT IF NOT EXISTS valid_email_clients 
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' OR email IS NULL);

ALTER TABLE intakes ADD CONSTRAINT IF NOT EXISTS valid_service_type 
  CHECK (service_type IN ('Personal Support', 'In-Home Nursing', 'Rehabilitation', 'Specialty & Chronic Care'));

-- 12. Create view for intake-to-client conversion tracking
CREATE OR REPLACE VIEW intake_conversion_status AS
SELECT 
  i.id as intake_id,
  i.first_name,
  i.last_name,
  i.email,
  i.service_type,
  i.conversion_status,
  i.converted_to_client_id,
  i.converted_at,
  c.id as client_id,
  c.status as client_status,
  CASE 
    WHEN i.converted_to_client_id IS NOT NULL THEN 'Converted'
    WHEN i.conversion_status = 'approved' THEN 'Ready for Conversion'
    WHEN i.conversion_status = 'rejected' THEN 'Rejected'
    ELSE 'Pending Review'
  END as conversion_summary
FROM intakes i
LEFT JOIN clients c ON i.converted_to_client_id = c.id
ORDER BY i.created_at DESC;

-- 13. Create function to convert intake to client
CREATE OR REPLACE FUNCTION convert_intake_to_client(
  intake_id UUID,
  converted_by_user UUID,
  care_plan TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  new_client_id UUID;
  intake_record RECORD;
BEGIN
  -- Get intake record
  SELECT * INTO intake_record FROM intakes WHERE id = intake_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Intake not found';
  END IF;
  
  IF intake_record.conversion_status != 'approved' THEN
    RAISE EXCEPTION 'Intake must be approved before conversion';
  END IF;
  
  -- Create new client record
  INSERT INTO clients (
    first_name,
    last_name,
    email,
    phone,
    address,
    city,
    postal_code,
    emergency_contact_name,
    emergency_contact_phone,
    emergency_contact_relationship,
    medical_conditions,
    current_medications,
    mobility_aids,
    care_plan,
    insurance_provider,
    policy_number,
    status
  ) VALUES (
    intake_record.first_name,
    intake_record.last_name,
    intake_record.email,
    intake_record.phone,
    intake_record.address,
    intake_record.city,
    intake_record.postal_code,
    intake_record.emergency_contact_name,
    intake_record.emergency_contact_phone,
    intake_record.emergency_contact_relationship,
    intake_record.medical_conditions,
    intake_record.current_medications,
    intake_record.mobility_aids,
    COALESCE(care_plan, 'Care plan to be developed'),
    intake_record.insurance_provider,
    intake_record.policy_number,
    'active'
  ) RETURNING id INTO new_client_id;
  
  -- Update intake record
  UPDATE intakes SET 
    converted_to_client_id = new_client_id,
    converted_at = NOW(),
    converted_by = converted_by_user,
    conversion_status = 'converted'
  WHERE id = intake_id;
  
  -- Create initial onboarding checklist
  INSERT INTO client_onboarding (client_id, step) VALUES
    (new_client_id, 'initial_assessment'),
    (new_client_id, 'care_plan'),
    (new_client_id, 'family_setup'),
    (new_client_id, 'insurance_verification'),
    (new_client_id, 'caregiver_assignment');
  
  RETURN new_client_id;
END;
$$ LANGUAGE plpgsql;

-- 14. Grant necessary permissions
GRANT SELECT ON intake_conversion_status TO authenticated;
GRANT EXECUTE ON FUNCTION convert_intake_to_client TO authenticated;

-- 15. Create RLS policy for the view
CREATE POLICY "Allow authenticated read on intake_conversion_status" ON intake_conversion_status
  FOR SELECT TO authenticated
  USING (true); 