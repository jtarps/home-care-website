-- Updated intakes table for admin (full info) and booking (minimal info)
DROP TABLE IF EXISTS intakes CASCADE;

CREATE TABLE intakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  phone VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  gender VARCHAR(20),
  medical_conditions TEXT,
  medications TEXT,
  allergies TEXT,
  mobility_level VARCHAR(50),
  care_requirements TEXT,
  emergency_contact_name VARCHAR(100),
  emergency_contact_phone VARCHAR(20),
  emergency_contact_relationship VARCHAR(50),
  insurance_provider VARCHAR(100),
  insurance_number VARCHAR(50),
  preferred_start_date DATE,
  preferred_schedule VARCHAR(50),
  preferred_time VARCHAR(50),
  duration_per_visit VARCHAR(50),
  additional_notes TEXT,
  admin_notes TEXT,
  assigned_caregiver_id UUID REFERENCES caregivers(id),
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'assigned')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  client_id UUID REFERENCES clients(id),
  source VARCHAR(20) NOT NULL DEFAULT 'admin'
);

-- Index for faster lookup
CREATE INDEX IF NOT EXISTS idx_intakes_status ON intakes(status);
CREATE INDEX IF NOT EXISTS idx_intakes_created_at ON intakes(created_at);

ALTER TABLE intakes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated read" ON intakes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert" ON intakes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON intakes FOR UPDATE TO authenticated USING (true);

-- Ensure clients table has created_at and status
ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'active';

-- Ensure caregivers table has created_at and status
ALTER TABLE caregivers
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE caregivers
  ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'active';
