-- Complete database setup for home care website
-- This will drop existing tables and recreate them with correct schema

-- Drop existing tables if they exist (in correct order due to foreign keys)
DROP TABLE IF EXISTS shifts CASCADE;
DROP TABLE IF EXISTS caregivers CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS caregiver_applications CASCADE;
DROP TABLE IF EXISTS intakes CASCADE;

-- Create intakes table for booking form submissions
CREATE TABLE intakes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_name VARCHAR(200) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(20) NOT NULL,
    client_age VARCHAR(10),
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    relationship_to_client VARCHAR(100) NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    care_level VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    medical_conditions TEXT,
    medications TEXT,
    mobility_needs TEXT,
    special_requirements TEXT,
    preferred_date DATE NOT NULL,
    preferred_time VARCHAR(100) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    has_insurance BOOLEAN DEFAULT false,
    insurance_provider VARCHAR(100),
    policy_number VARCHAR(100),
    payment_method VARCHAR(100) NOT NULL,
    emergency_contact_name VARCHAR(100) NOT NULL,
    emergency_contact_phone VARCHAR(20) NOT NULL,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create caregiver_applications table for job applications
CREATE TABLE caregiver_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    date_of_birth DATE,
    experience TEXT NOT NULL,
    certifications TEXT,
    availability TEXT[] NOT NULL,
    preferred_shifts VARCHAR(100),
    transportation VARCHAR(100) NOT NULL,
    languages TEXT,
    professional_references TEXT,
    why_join TEXT NOT NULL,
    has_criminal_check BOOLEAN DEFAULT false,
    has_first_aid BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create caregivers table for internal staff management
CREATE TABLE caregivers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    hire_date DATE,
    status VARCHAR(20) DEFAULT 'active',
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
    insurance_number VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shifts table for scheduling
CREATE TABLE shifts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    caregiver_id UUID REFERENCES caregivers(id) ON DELETE SET NULL,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
    scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
    actual_start TIMESTAMP WITH TIME ZONE,
    actual_end TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'assigned',
    service_type VARCHAR(100),
    hourly_rate DECIMAL(10,2),
    total_hours DECIMAL(5,2),
    total_cost DECIMAL(10,2),
    notes TEXT,
    check_in_location TEXT,
    check_out_location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_intakes_status ON intakes(status);
CREATE INDEX idx_intakes_created_at ON intakes(created_at);
CREATE INDEX idx_intakes_client_email ON intakes(client_email);
CREATE INDEX idx_intakes_service_type ON intakes(service_type);

CREATE INDEX idx_caregiver_applications_status ON caregiver_applications(status);
CREATE INDEX idx_caregiver_applications_email ON caregiver_applications(email);
CREATE INDEX idx_caregiver_applications_created_at ON caregiver_applications(created_at);

CREATE INDEX idx_caregivers_status ON caregivers(status);
CREATE INDEX idx_caregivers_email ON caregivers(email);
CREATE INDEX idx_caregivers_specializations ON caregivers USING GIN(specializations);

CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_phone ON clients(phone);

CREATE INDEX idx_shifts_caregiver_id ON shifts(caregiver_id);
CREATE INDEX idx_shifts_client_id ON shifts(client_id);
CREATE INDEX idx_shifts_status ON shifts(status);
CREATE INDEX idx_shifts_scheduled_start ON shifts(scheduled_start);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_intakes_updated_at BEFORE UPDATE ON intakes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_caregiver_applications_updated_at BEFORE UPDATE ON caregiver_applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_caregivers_updated_at BEFORE UPDATE ON caregivers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shifts_updated_at BEFORE UPDATE ON shifts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE intakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE caregiver_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE caregivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;

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

-- Create policies for caregivers table
CREATE POLICY "Allow authenticated all on caregivers" ON caregivers
    FOR ALL TO authenticated
    USING (true);

-- Create policies for clients table
CREATE POLICY "Allow authenticated all on clients" ON clients
    FOR ALL TO authenticated
    USING (true);

-- Create policies for shifts table
CREATE POLICY "Allow authenticated all on shifts" ON shifts
    FOR ALL TO authenticated
    USING (true);

-- Insert some sample data for testing
INSERT INTO caregivers (first_name, last_name, email, phone, hourly_rate, specializations, availability, status) VALUES
('Sarah', 'Johnson', 'sarah.johnson@example.com', '416-555-0101', 25.00, ARRAY['Personal Care', 'Medication Management'], ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], 'active'),
('Michael', 'Chen', 'michael.chen@example.com', '416-555-0102', 28.00, ARRAY['Nursing Care', 'Wound Care'], ARRAY['Monday', 'Wednesday', 'Friday', 'Saturday', 'Sunday'], 'active'),
('Emily', 'Rodriguez', 'emily.rodriguez@example.com', '416-555-0103', 24.00, ARRAY['Companionship', 'Light Housekeeping'], ARRAY['Tuesday', 'Thursday', 'Saturday', 'Sunday'], 'active');

INSERT INTO clients (first_name, last_name, phone, address, city, postal_code, medical_conditions, care_requirements, emergency_contact_name, emergency_contact_phone, status) VALUES
('Robert', 'Smith', '416-555-0201', '123 Main St', 'Toronto', 'M5V 3A8', 'Diabetes, Hypertension', 'Medication reminders, meal preparation', 'Mary Smith', '416-555-0202', 'active'),
('Margaret', 'Wilson', '416-555-0203', '456 Oak Ave', 'Toronto', 'M4W 2H7', 'Arthritis, Mobility issues', 'Personal care, light housekeeping', 'John Wilson', '416-555-0204', 'active');

-- Success message
SELECT 'Database setup completed successfully! All tables created with proper indexes, triggers, and policies.' as message;
