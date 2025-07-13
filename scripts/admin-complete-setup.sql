-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (in correct order to handle dependencies)
DROP TABLE IF EXISTS shifts CASCADE;
DROP TABLE IF EXISTS shift_logs CASCADE;
DROP TABLE IF EXISTS intakes CASCADE;
DROP TABLE IF EXISTS caregiver_applications CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS caregivers CASCADE;

-- Create caregivers table first (since it's referenced by other tables)
CREATE TABLE IF NOT EXISTS caregivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(10),
  date_of_birth DATE,
  hourly_rate DECIMAL(10,2),
  specializations TEXT[],
  certifications TEXT[],
  availability TEXT[],
  languages TEXT[],
  emergency_contact_name VARCHAR(200),
  emergency_contact_phone VARCHAR(20),
  hire_date DATE,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(10) NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(50),
  medical_conditions TEXT,
  medications TEXT,
  allergies TEXT,
  mobility_level VARCHAR(100),
  care_requirements TEXT,
  emergency_contact_name VARCHAR(200),
  emergency_contact_phone VARCHAR(20),
  emergency_contact_relationship VARCHAR(100),
  insurance_provider VARCHAR(200),
  insurance_number VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'discharged')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create intakes table (with foreign key reference to caregivers)
CREATE TABLE IF NOT EXISTS intakes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(10) NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(50),
  medical_conditions TEXT,
  medications TEXT,
  allergies TEXT,
  mobility_level VARCHAR(100),
  care_requirements TEXT,
  emergency_contact_name VARCHAR(200),
  emergency_contact_phone VARCHAR(20),
  emergency_contact_relationship VARCHAR(100),
  insurance_provider VARCHAR(200),
  insurance_number VARCHAR(100),
  preferred_start_date DATE,
  preferred_schedule TEXT,
  additional_notes TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'assigned')),
  assigned_caregiver_id UUID REFERENCES caregivers(id) ON DELETE SET NULL, -- Fixed: direct FK
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create caregiver_applications table
CREATE TABLE IF NOT EXISTS caregiver_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(10),
  date_of_birth DATE,
  experience_years INTEGER,
  certifications TEXT[],
  specializations TEXT[],
  availability TEXT[],
  languages TEXT[],
  hourly_rate_expectation DECIMAL(10,2),
  why_interested TEXT,
  previous_experience TEXT,
  professional_references TEXT, -- Fixed: renamed from 'references'
  background_check_consent BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'hired')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shifts table
CREATE TABLE IF NOT EXISTS shifts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  caregiver_id UUID REFERENCES caregivers(id) ON DELETE SET NULL,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  scheduled_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  service_type VARCHAR(200) NOT NULL,
  hourly_rate DECIMAL(10,2),
  duration_hours DECIMAL(4,2) GENERATED ALWAYS AS (
      EXTRACT(EPOCH FROM (end_time - start_time)) / 3600
  ) STORED,
  total_cost DECIMAL(10,2) GENERATED ALWAYS AS (
      CASE 
          WHEN hourly_rate IS NOT NULL THEN 
              hourly_rate * (EXTRACT(EPOCH FROM (end_time - start_time)) / 3600)
          ELSE NULL
      END
  ) STORED,
  status VARCHAR(50) DEFAULT 'assigned' CHECK (status IN ('assigned', 'checked_in', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  admin_notes TEXT,
  check_in_time TIMESTAMP WITH TIME ZONE,
  check_out_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shift_logs table
CREATE TABLE IF NOT EXISTS shift_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shift_id UUID REFERENCES shifts(id) ON DELETE CASCADE,
  action VARCHAR(200) NOT NULL,
  old_status VARCHAR(50),
  new_status VARCHAR(50),
  notes TEXT,
  performed_by VARCHAR(200),
  performed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_intakes_updated_at ON intakes;
CREATE TRIGGER update_intakes_updated_at 
  BEFORE UPDATE ON intakes 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_caregiver_applications_updated_at ON caregiver_applications;
CREATE TRIGGER update_caregiver_applications_updated_at 
  BEFORE UPDATE ON caregiver_applications 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_caregivers_updated_at ON caregivers;
CREATE TRIGGER update_caregivers_updated_at 
  BEFORE UPDATE ON caregivers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
CREATE TRIGGER update_clients_updated_at 
  BEFORE UPDATE ON clients 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_shifts_updated_at ON shifts;
CREATE TRIGGER update_shifts_updated_at 
  BEFORE UPDATE ON shifts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO caregivers (first_name, last_name, email, phone, city, hourly_rate, specializations, availability, status) VALUES
('Sarah', 'Johnson', 'sarah.johnson@email.com', '416-555-0101', 'Toronto', 28.50, ARRAY['Personal Care', 'Medication Management'], ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], 'active'),
('Michael', 'Chen', 'michael.chen@email.com', '416-555-0102', 'Toronto', 32.00, ARRAY['Nursing Care', 'Wound Care'], ARRAY['Monday', 'Wednesday', 'Friday', 'Saturday', 'Sunday'], 'active'),
('Emily', 'Rodriguez', 'emily.rodriguez@email.com', '416-555-0103', 'Mississauga', 26.00, ARRAY['Companionship', 'Light Housekeeping'], ARRAY['Tuesday', 'Thursday', 'Saturday', 'Sunday'], 'active');

INSERT INTO clients (first_name, last_name, phone, address, city, postal_code, date_of_birth, medical_conditions, mobility_level, status) VALUES
('Robert', 'Smith', '416-555-0201', '123 Main St', 'Toronto', 'M5V 3A8', '1945-03-15', 'Diabetes, Hypertension', 'Needs Assistance', 'active'),
('Margaret', 'Wilson', '416-555-0202', '456 Oak Ave', 'Toronto', 'M4W 2H7', '1938-07-22', 'Arthritis, Heart Condition', 'Wheelchair', 'active'),
('James', 'Brown', '416-555-0203', '789 Pine St', 'Mississauga', 'L5B 1M4', '1942-11-08', 'Dementia, Mobility Issues', 'Needs Assistance', 'active');

INSERT INTO intakes (first_name, last_name, phone, address, city, postal_code, care_requirements, status) VALUES
('Dorothy', 'Davis', '416-555-0301', '321 Elm St', 'Toronto', 'M6K 1X9', 'Personal care assistance, meal preparation', 'pending'),
('William', 'Miller', '416-555-0302', '654 Maple Ave', 'Scarborough', 'M1B 2C3', 'Medication management, companionship', 'pending');

INSERT INTO caregiver_applications (first_name, last_name, email, phone, experience_years, specializations, hourly_rate_expectation, status) VALUES
('Jessica', 'Taylor', 'jessica.taylor@email.com', '416-555-0401', 3, ARRAY['Personal Care', 'Dementia Care'], 27.00, 'pending'),
('David', 'Anderson', 'david.anderson@email.com', '416-555-0402', 5, ARRAY['Physical Therapy', 'Rehabilitation'], 35.00, 'pending');

-- Sample shifts
INSERT INTO shifts (caregiver_id, client_id, scheduled_date, start_time, end_time, service_type, hourly_rate, status) VALUES
((SELECT id FROM caregivers WHERE email = 'sarah.johnson@email.com'), (SELECT id FROM clients WHERE phone = '416-555-0201'), CURRENT_DATE + INTERVAL '1 day', '09:00', '13:00', 'Personal Care', 28.50, 'assigned'),
((SELECT id FROM caregivers WHERE email = 'michael.chen@email.com'), (SELECT id FROM clients WHERE phone = '416-555-0202'), CURRENT_DATE + INTERVAL '2 days', '14:00', '18:00', 'Nursing Care', 32.00, 'assigned');
