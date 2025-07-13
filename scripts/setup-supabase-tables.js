import { createClient } from "@supabase/supabase-js"

// Check if we're running in Node.js environment
if (typeof process === "undefined") {
  console.error("This script must be run in Node.js environment")
  process.exit(1)
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables!")
  console.error("Make sure you have these in your .env.local file:")
  console.error("- NEXT_PUBLIC_SUPABASE_URL")
  console.error("- SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function checkExistingTables() {
  console.log("🔍 Checking existing tables...")

  const tablesToCheck = ["intakes", "caregiver_applications", "caregivers", "clients", "shifts"]
  const existingTables = []

  for (const tableName of tablesToCheck) {
    try {
      const { data, error } = await supabase.from(tableName).select("id").limit(1)

      if (!error) {
        existingTables.push(tableName)
        console.log(`  ✅ ${tableName} exists`)
      } else {
        console.log(`  ❌ ${tableName} does not exist`)
      }
    } catch (err) {
      console.log(`  ❌ ${tableName} does not exist`)
    }
  }

  return existingTables
}

async function createIntakesTable() {
  console.log("\n🚀 Creating intakes table...")

  const { error } = await supabase.rpc("exec", {
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
  })

  if (error) {
    console.error("❌ Error creating intakes table:", error)
    return false
  }

  console.log("✅ Intakes table created successfully")
  return true
}

async function createCaregiverApplicationsTable() {
  console.log("\n🚀 Creating caregiver_applications table...")

  const { error } = await supabase.rpc("exec", {
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
  })

  if (error) {
    console.error("❌ Error creating caregiver_applications table:", error)
    return false
  }

  console.log("✅ Caregiver applications table created successfully")
  return true
}

async function setupDatabase() {
  console.log("🏗️  Starting Supabase database setup...\n")

  // Check existing tables
  const existingTables = await checkExistingTables()

  // Create tables
  const success1 = await createIntakesTable()
  const success2 = await createCaregiverApplicationsTable()

  if (success1 && success2) {
    console.log("\n🎉 Database setup completed successfully!")
    console.log("\n📋 Tables ready:")
    console.log("  ✅ intakes")
    console.log("  ✅ caregiver_applications")
    console.log("\n🚀 You can now test the forms at:")
    console.log("  - /caregivers (Caregiver Application)")
    console.log("  - /book (Booking Form)")
  } else {
    console.log("\n❌ Some tables failed to create. Please check the errors above.")
  }
}

// Run the setup
setupDatabase().catch(console.error)
