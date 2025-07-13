import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runSQLScript(filename) {
  try {
    console.log(`Running ${filename}...`)

    const sqlPath = join(__dirname, filename)
    const sql = readFileSync(sqlPath, "utf8")

    const { data, error } = await supabase.rpc("exec_sql", { sql_query: sql })

    if (error) {
      console.error(`Error running ${filename}:`, error)
      return false
    }

    console.log(`✅ Successfully ran ${filename}`)
    return true
  } catch (err) {
    console.error(`Error reading ${filename}:`, err)
    return false
  }
}

async function setupDatabase() {
  console.log("🚀 Setting up database...")

  const scripts = [
    "01-create-intakes-table.sql",
    "02-create-caregiver-applications-table.sql",
    "03-create-updated-at-triggers.sql",
  ]

  for (const script of scripts) {
    const success = await runSQLScript(script)
    if (!success) {
      console.error("❌ Database setup failed")
      process.exit(1)
    }
  }

  console.log("✅ Database setup completed successfully!")
}

// Run the setup
setupDatabase().catch(console.error)
