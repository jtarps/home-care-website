# Database Setup Instructions

## Quick Setup (Recommended)

1. **Copy and run each SQL script in Supabase SQL Editor:**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy and paste each script below, one at a time
   - Click "Run" after each script

## Scripts to Run (in order):

### 1. Intakes Table
\`\`\`sql
-- Copy content from scripts/01-create-intakes-table.sql
\`\`\`

### 2. Caregiver Applications Table  
\`\`\`sql
-- Copy content from scripts/02-create-caregiver-applications-table.sql
\`\`\`

### 3. Triggers
\`\`\`sql
-- Copy content from scripts/03-create-updated-at-triggers.sql
\`\`\`

### 4. Admin Tables
\`\`\`sql
-- Copy content from scripts/04-create-admin-tables.sql
\`\`\`

## Verification

After running all scripts, verify in Supabase:
1. Go to Table Editor
2. You should see these tables:
   - `intakes`
   - `caregiver_applications` 
   - `caregivers`
   - `clients`
   - `shifts`

## Test the Application

1. Visit `/caregivers` - Submit a caregiver application
2. Visit `/book` - Submit a booking request
3. Visit `/admin` - View admin dashboard (requires authentication)

## Troubleshooting

If you get schema errors:
1. Check that all tables exist in Supabase Table Editor
2. Verify column names match the form fields
3. Re-run the specific script that's causing issues
