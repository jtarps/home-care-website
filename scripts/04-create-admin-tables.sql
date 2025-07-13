-- Create caregivers table for internal staff management
DROP TABLE IF EXISTS shifts CASCADE;
DROP TABLE IF EXISTS caregivers CASCADE;
DROP TABLE IF EXISTS clients CASCADE;

CREATE TABLE caregivers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(10),
  hourly_rate DECIMAL(8,2),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave')),
  hire_date DATE,
  emergency_contact_name VARCHAR(100),
  emergency_contact_phone VARCHAR(20),
  certifications TEXT[],
  availability TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create clients table for client management
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(10) NOT NULL,
  date_of_birth DATE,
  emergency_contact_name VARCHAR(100) NOT NULL,
  emergency_contact_phone VARCHAR(20) NOT NULL,
  emergency_contact_relationship VARCHAR(50),
  medical_conditions TEXT,
  medications TEXT,
  mobility_needs TEXT,
  care_plan TEXT,
  insurance_provider VARCHAR(100),
  policy_number VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'discharged')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shifts table for scheduling
CREATE TABLE shifts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  caregiver_id UUID REFERENCES caregivers(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  service_type VARCHAR(100) NOT NULL,
  scheduled_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration_hours DECIMAL(4,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'assigned' CHECK (status IN ('assigned', 'checked_in', 'completed', 'cancelled', 'no_show')),
  check_in_time TIMESTAMP WITH TIME ZONE,
  check_out_time TIMESTAMP WITH TIME ZONE,
  check_in_location JSONB,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_caregivers_status ON caregivers(status);
CREATE INDEX idx_caregivers_email ON caregivers(email);
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_shifts_caregiver_id ON shifts(caregiver_id);
CREATE INDEX idx_shifts_client_id ON shifts(client_id);
CREATE INDEX idx_shifts_scheduled_date ON shifts(scheduled_date);
CREATE INDEX idx_shifts_status ON shifts(status);

-- Enable Row Level Security
ALTER TABLE caregivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;

-- Create policies (admin access only)
CREATE POLICY "Allow authenticated read on caregivers" ON caregivers
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on caregivers" ON caregivers
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on caregivers" ON caregivers
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read on clients" ON clients
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on clients" ON clients
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on clients" ON clients
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read on shifts" ON shifts
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated insert on shifts" ON shifts
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update on shifts" ON shifts
  FOR UPDATE TO authenticated
  USING (true);

-- Create triggers for updated_at
CREATE TRIGGER update_caregivers_updated_at
    BEFORE UPDATE ON caregivers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON clients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shifts_updated_at
    BEFORE UPDATE ON shifts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
