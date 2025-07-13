import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables!")
  console.error("Make sure you have NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local file")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkExistingTables() {
  console.log("🔍 Checking existing tables...")

  try {
    // Check for existing tables
    const { data: tables, error } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .in("table_name", ["intakes", "caregiver_applications", "caregivers", "clients", "shifts"])

    if (error) {
      console.error("Error checking tables:", error)
      return []
    }

    const existingTables = tables?.map((t) => t.table_name) || []
    console.log("📋 Existing tables:", existingTables)
    return existingTables
  } catch (error) {
    console.error("Error checking existing tables:", error)
    return []
  }
}

async function runSQLScript(scriptName, sql) {
  console.log(`\n🚀 Running ${scriptName}...`)

  try {
    const { data, error } = await supabase.rpc("exec_sql", { sql_query: sql })

    if (error) {
      console.error(`❌ Error in ${scriptName}:`, error)
      return false
    }

    console.log(`✅ ${scriptName} completed successfully`)
    return true
  } catch (error) {
    console.error(`❌ Error running ${scriptName}:`, error)
    return false
  }
}

async function setupDatabase() {
  console.log("🏗️  Starting database setup...\n")

  // Check existing tables first
  const existingTables = await checkExistingTables()

  // SQL Scripts
  const scripts = [
    {
      name: "Create Intakes Table",
      sql: `
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
      `,
    },
    {
      name: "Create Caregiver Applications Table",
      sql: `
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
        CREATE INDEX idx_caregiver_applications_availability ON caregiver_applications USING GIN(availability);

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
      `,
    },
    {
      name: "Create Update Triggers",
      sql: `
        -- Create function to update updated_at timestamp
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ language 'plpgsql';

        -- Create triggers for intakes table
        DROP TRIGGER IF EXISTS update_intakes_updated_at ON intakes;
        CREATE TRIGGER update_intakes_updated_at
            BEFORE UPDATE ON intakes
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();

        -- Create triggers for caregiver_applications table
        DROP TRIGGER IF EXISTS update_caregiver_applications_updated_at ON caregiver_applications;
        CREATE TRIGGER update_caregiver_applications_updated_at
            BEFORE UPDATE ON caregiver_applications
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
      `,
    },
    {
      name: "Create Admin Tables",
      sql: `
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
      `,
    },
  ]

  // Run each script
  let allSuccess = true
  for (const script of scripts) {
    const success = await runSQLScript(script.name, script.sql)
    if (!success) {
      allSuccess = false
    }
  }

  if (allSuccess) {
    console.log("\n🎉 Database setup completed successfully!")
    console.log("\n📋 Tables created:")
    console.log("  ✅ intakes")
    console.log("  ✅ caregiver_applications")
    console.log("  ✅ caregivers")
    console.log("  ✅ clients")
    console.log("  ✅ shifts")
    console.log("\n🚀 You can now test the forms at:")
    console.log("  - /caregivers (Caregiver Application)")
    console.log("  - /book (Booking Form)")
    console.log("  - /admin (Admin Dashboard)")
  } else {
    console.log("\n❌ Some scripts failed. Please check the errors above.")
  }
}

// Run the setup
setupDatabase().catch(console.error)
