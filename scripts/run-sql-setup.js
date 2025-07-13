import { supabase } from "../lib/supabase-server.js"
import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function executeSQLFile(filename) {
  try {
    console.log(`\n📄 Executing ${filename}...`)

    const sqlPath = join(__dirname, filename)
    const sqlContent = readFileSync(sqlPath, "utf8")

    // Split SQL content by semicolons and execute each statement
    const statements = sqlContent
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"))

    for (const statement of statements) {
      if (statement.trim()) {
        const { error } = await supabase.rpc("exec_sql", {
          sql: statement + ";",
        })

        if (error) {
          console.error(`❌ Error executing statement: ${statement.substring(0, 50)}...`)
          console.error("Error details:", error)
          return false
        }
      }
    }

    console.log(`✅ Successfully executed ${filename}`)
    return true
  } catch (err) {
    console.error(`❌ Error reading/executing ${filename}:`, err.message)
    return false
  }
}

async function setupDatabase() {
  console.log("🚀 Starting database setup...\n")

  const sqlFiles = [
    "01-create-intakes-table.sql",
    "02-create-caregiver-applications-table.sql",
    "03-create-updated-at-triggers.sql",
  ]

  let allSuccessful = true

  for (const file of sqlFiles) {
    const success = await executeSQLFile(file)
    if (!success) {
      allSuccessful = false
      break
    }
  }

  if (allSuccessful) {
    console.log("\n🎉 Database setup completed successfully!")
    console.log("Your booking form should now work properly.")
  } else {
    console.log("\n❌ Database setup failed. Please check the errors above.")
    process.exit(1)
  }
}

// Execute the setup
setupDatabase().catch((error) => {
  console.error("❌ Setup failed:", error)
  process.exit(1)
})
