-- Check what tables currently exist in the database
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Check columns in existing tables
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name IN ('intakes', 'caregiver_applications', 'caregivers', 'clients', 'shifts')
ORDER BY table_name, ordinal_position;
