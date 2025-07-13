-- Create intakes table for booking form submissions
DROP TABLE IF EXISTS intakes CASCADE;

CREATE TABLE intakes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(10) NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  care_type VARCHAR(100),
  start_date DATE,
  frequency VARCHAR(50),
  duration VARCHAR(50),
  mobility_assistance BOOLEAN DEFAULT false,
  personal_care BOOLEAN DEFAULT false,
  medication_management BOOLEAN DEFAULT false,
  meal_preparation BOOLEAN DEFAULT false,
  light_housekeeping BOOLEAN DEFAULT false,
  companionship BOOLEAN DEFAULT false,
  transportation BOOLEAN DEFAULT false,
  specialized_care BOOLEAN DEFAULT false,
  medical_conditions TEXT,
  current_medications TEXT,
  mobility_aids TEXT,
  emergency_contact_name VARCHAR(100),
  emergency_contact_phone VARCHAR(20),
  emergency_contact_relationship VARCHAR(50),
  insurance_provider VARCHAR(100),
  policy_number VARCHAR(100),
  additional_notes TEXT,
  preferred_contact_method VARCHAR(20) DEFAULT 'phone',
  preferred_contact_time VARCHAR(50),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_intakes_status ON intakes(status);
CREATE INDEX idx_intakes_service_type ON intakes(service_type);
CREATE INDEX idx_intakes_created_at ON intakes(created_at);
CREATE INDEX idx_intakes_email ON intakes(email);

-- Enable Row Level Security
ALTER TABLE intakes ENABLE ROW LEVEL SECURITY;

-- Create policies for intakes table
CREATE POLICY "Allow public insert on intakes" ON intakes
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read on intakes" ON intakes
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update on intakes" ON intakes
  FOR UPDATE TO authenticated
  USING (true);
