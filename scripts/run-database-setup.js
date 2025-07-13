import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runSQLFile(filename) {
  try {
    const filePath = path.join(process.cwd(), "scripts", filename)
    const sql = fs.readFileSync(filePath, "utf8")

    console.log(`Running ${filename}...`)
    const { error } = await supabase.rpc("exec_sql", { sql_query: sql })

    if (error) {
      console.error(`Error running ${filename}:`, error)
      return false
    }

    console.log(`✅ ${filename} completed successfully`)
    return true
  } catch (error) {
    console.error(`Error reading ${filename}:`, error)
    return false
  }
}

async function setupDatabase() {
  console.log("🚀 Setting up database...")

  const scripts = [
    "01-create-intakes-table.sql",
    "02-create-caregiver-applications-table.sql",
    "03-create-updated-at-triggers.sql",
    "04-create-admin-tables.sql",
  ]

  for (const script of scripts) {
    const success = await runSQLFile(script)
    if (!success) {
      console.error("❌ Database setup failed")
      process.exit(1)
    }
  }

  console.log("✅ Database setup completed successfully!")
}

setupDatabase()
