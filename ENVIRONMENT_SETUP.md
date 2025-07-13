# Environment Variables Setup

## Required Supabase Environment Variables

You need to add these environment variables to your project. Here's how:

### 1. Create .env.local file in your project root:

\`\`\`bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
\`\`\`

### 2. Get your Supabase credentials:

1. Go to [supabase.com](https://supabase.com)
2. Open your project dashboard
3. Go to **Settings** → **API**
4. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Example .env.local file:

\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

### 4. Restart your development server:

\`\`\`bash
npm run dev
\`\`\`

## Database Setup Steps:

1. **Add environment variables** (above)
2. **Run SQL scripts** in Supabase SQL Editor (in order):
   - `01-create-intakes-table.sql`
   - `02-create-caregiver-applications-table.sql`
   - `03-create-updated-at-triggers.sql`
   - `04-create-admin-tables.sql`
3. **Test the forms** at `/caregivers` and `/book`

## Verification:

After setup, you should have these tables in Supabase:
- ✅ `intakes`
- ✅ `caregiver_applications`
- ✅ `caregivers`
- ✅ `clients`
- ✅ `shifts`
