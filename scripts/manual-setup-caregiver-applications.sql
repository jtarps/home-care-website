-- Create caregiver_applications table for caregiver job applications
DROP TABLE IF EXISTS caregiver_applications CASCADE;

CREATE TABLE caregiver_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(10) NOT NULL,
  date_of_birth DATE,
  experience TEXT NOT NULL,
  certifications TEXT[],
  availability TEXT[] NOT NULL,
  preferred_shifts VARCHAR(100),
  transportation VARCHAR(100) NOT NULL,
  languages TEXT[],
  references TEXT,
  why_join TEXT NOT NULL,
  has_criminal_check BOOLEAN DEFAULT false,
  has_first_aid BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'pending',
  application_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_caregiver_applications_status ON caregiver_applications(status);
CREATE INDEX idx_caregiver_applications_email ON caregiver_applications(email);
CREATE INDEX idx_caregiver_applications_created_at ON caregiver_applications(created_at);

-- Enable Row Level Security
ALTER TABLE caregiver_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for caregiver_applications table
CREATE POLICY "Allow public insert on caregiver_applications" ON caregiver_applications
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read on caregiver_applications" ON caregiver_applications
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update on caregiver_applications" ON caregiver_applications
  FOR UPDATE TO authenticated
  USING (true);
