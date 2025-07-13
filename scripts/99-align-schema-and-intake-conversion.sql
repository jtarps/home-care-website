-- 1. Align intakes table columns
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS first_name VARCHAR(100);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS last_name VARCHAR(100);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS email VARCHAR(255);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS postal_code VARCHAR(10);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS gender VARCHAR(50);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS medical_conditions TEXT;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS medications TEXT;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS allergies TEXT;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS mobility_level VARCHAR(100);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS care_requirements TEXT;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS emergency_contact_name VARCHAR(100);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS emergency_contact_phone VARCHAR(20);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS emergency_contact_relationship VARCHAR(50);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS insurance_provider VARCHAR(100);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS insurance_number VARCHAR(100);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS preferred_start_date DATE;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS preferred_schedule VARCHAR(100);
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS additional_notes TEXT;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending';
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS assigned_caregiver_id UUID;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS conversion_status VARCHAR(20) DEFAULT 'pending';
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS converted_to_client_id UUID;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS converted_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE intakes ADD COLUMN IF NOT EXISTS converted_by UUID;

-- Add foreign key for assigned_caregiver_id
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

-- Add foreign key for converted_to_client_id
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
    WHERE tc.table_name = 'intakes'
      AND tc.constraint_type = 'FOREIGN KEY'
      AND kcu.column_name = 'converted_to_client_id'
  ) THEN
    ALTER TABLE intakes
      ADD CONSTRAINT fk_intakes_converted_to_client
      FOREIGN KEY (converted_to_client_id) REFERENCES clients(id) ON DELETE SET NULL;
  END IF;
END $$;

-- 2. Align caregivers table columns
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS first_name VARCHAR(100);
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS last_name VARCHAR(100);
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS email VARCHAR(255);
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS postal_code VARCHAR(10);
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS hourly_rate DECIMAL(10,2);
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS specializations TEXT[];
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS certifications TEXT[];
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS availability TEXT[];
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS languages TEXT[];
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS emergency_contact_name VARCHAR(100);
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS emergency_contact_phone VARCHAR(20);
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS hire_date DATE;
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE caregivers ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 3. Align clients table columns
ALTER TABLE clients ADD COLUMN IF NOT EXISTS first_name VARCHAR(100);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS last_name VARCHAR(100);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS email VARCHAR(255);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS postal_code VARCHAR(10);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS gender VARCHAR(50);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS medical_conditions TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS medications TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS allergies TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS mobility_level VARCHAR(100);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS care_requirements TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS emergency_contact_name VARCHAR(100);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS emergency_contact_phone VARCHAR(20);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS emergency_contact_relationship VARCHAR(50);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS insurance_provider VARCHAR(100);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS insurance_number VARCHAR(100);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE clients ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 4. Intake to Client Conversion Function
CREATE OR REPLACE FUNCTION convert_intake_to_client(intake_id UUID, converted_by_user UUID DEFAULT NULL)
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
  -- Only allow conversion if status is approved
  IF intake_record.status != 'approved' THEN
    RAISE EXCEPTION 'Intake must be approved before conversion';
  END IF;
  -- Create new client record
  INSERT INTO clients (
    first_name, last_name, email, phone, address, city, postal_code, date_of_birth, gender, medical_conditions, medications, allergies, mobility_level, care_requirements, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship, insurance_provider, insurance_number, status
  ) VALUES (
    intake_record.first_name, intake_record.last_name, intake_record.email, intake_record.phone, intake_record.address, intake_record.city, intake_record.postal_code, intake_record.date_of_birth, intake_record.gender, intake_record.medical_conditions, intake_record.medications, intake_record.allergies, intake_record.mobility_level, intake_record.care_requirements, intake_record.emergency_contact_name, intake_record.emergency_contact_phone, intake_record.emergency_contact_relationship, intake_record.insurance_provider, intake_record.insurance_number, 'active'
  ) RETURNING id INTO new_client_id;
  -- Update intake record
  UPDATE intakes SET conversion_status = 'converted', converted_to_client_id = new_client_id, converted_at = NOW(), converted_by = converted_by_user WHERE id = intake_id;
  RETURN new_client_id;
END;
$$ LANGUAGE plpgsql; 