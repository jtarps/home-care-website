-- Create test caregiver and client data with shifts

-- First, ensure we have a test caregiver
INSERT INTO caregivers (
    first_name, 
    last_name, 
    email, 
    phone, 
    address, 
    city, 
    postal_code, 
    status, 
    hourly_rate,
    created_at,
    updated_at
) VALUES (
    'Sarah', 
    'Johnson', 
    'test@caregiver.com', 
    '416-555-0123', 
    '123 Caregiver St', 
    'Toronto', 
    'M5V 3A8', 
    'active', 
    28.50,
    NOW(),
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    phone = EXCLUDED.phone,
    address = EXCLUDED.address,
    city = EXCLUDED.city,
    postal_code = EXCLUDED.postal_code,
    status = EXCLUDED.status,
    hourly_rate = EXCLUDED.hourly_rate,
    updated_at = NOW();

-- Create test clients
INSERT INTO clients (
    first_name, 
    last_name, 
    email, 
    phone, 
    address, 
    city, 
    postal_code, 
    status,
    created_at,
    updated_at
) VALUES 
(
    'Margaret', 
    'Smith', 
    'margaret.smith@email.com', 
    '416-555-0456', 
    '456 Elder Ave', 
    'Toronto', 
    'M4K 2B7', 
    'active',
    NOW(),
    NOW()
),
(
    'Robert', 
    'Wilson', 
    'robert.wilson@email.com', 
    '416-555-0789', 
    '789 Senior Blvd', 
    'Toronto', 
    'M6G 1C3', 
    'active',
    NOW(),
    NOW()
),
(
    'Dorothy', 
    'Brown', 
    'dorothy.brown@email.com', 
    '416-555-0321', 
    '321 Care Lane', 
    'Toronto', 
    'M5T 1R4', 
    'active',
    NOW(),
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    phone = EXCLUDED.phone,
    address = EXCLUDED.address,
    city = EXCLUDED.city,
    postal_code = EXCLUDED.postal_code,
    status = EXCLUDED.status,
    updated_at = NOW();

-- Get the caregiver and client IDs
DO $$
DECLARE
    caregiver_id UUID;
    client1_id UUID;
    client2_id UUID;
    client3_id UUID;
BEGIN
    -- Get IDs
    SELECT id INTO caregiver_id FROM caregivers WHERE email = 'test@caregiver.com';
    SELECT id INTO client1_id FROM clients WHERE email = 'margaret.smith@email.com';
    SELECT id INTO client2_id FROM clients WHERE email = 'robert.wilson@email.com';
    SELECT id INTO client3_id FROM clients WHERE email = 'dorothy.brown@email.com';
    
    -- Delete existing shifts for this caregiver to avoid duplicates
    DELETE FROM shifts WHERE caregiver_id = caregiver_id;
    
    -- Create shifts for today
    INSERT INTO shifts (
        caregiver_id,
        client_id,
        scheduled_date,
        start_time,
        end_time,
        service_type,
        status,
        notes,
        created_at,
        updated_at
    ) VALUES 
    -- Today's shifts
    (
        caregiver_id,
        client1_id,
        CURRENT_DATE,
        '09:00:00',
        '13:00:00',
        'Personal Support',
        'assigned',
        'Morning care routine, medication assistance, light housekeeping',
        NOW(),
        NOW()
    ),
    (
        caregiver_id,
        client2_id,
        CURRENT_DATE,
        '14:30:00',
        '17:30:00',
        'Companionship',
        'assigned',
        'Afternoon visit, social interaction, meal preparation',
        NOW(),
        NOW()
    ),
    
    -- Tomorrow's shifts
    (
        caregiver_id,
        client1_id,
        CURRENT_DATE + INTERVAL '1 day',
        '08:00:00',
        '12:00:00',
        'Personal Support',
        'assigned',
        'Morning care, shower assistance, medication',
        NOW(),
        NOW()
    ),
    (
        caregiver_id,
        client3_id,
        CURRENT_DATE + INTERVAL '1 day',
        '15:00:00',
        '18:00:00',
        'Nursing Care',
        'assigned',
        'Wound care, vital signs monitoring, medication administration',
        NOW(),
        NOW()
    ),
    
    -- Day after tomorrow
    (
        caregiver_id,
        client2_id,
        CURRENT_DATE + INTERVAL '2 days',
        '10:00:00',
        '14:00:00',
        'Personal Support',
        'assigned',
        'Personal care, mobility assistance, meal prep',
        NOW(),
        NOW()
    ),
    
    -- Some completed shifts from yesterday
    (
        caregiver_id,
        client1_id,
        CURRENT_DATE - INTERVAL '1 day',
        '09:00:00',
        '13:00:00',
        'Personal Support',
        'completed',
        'Completed morning care routine',
        NOW(),
        NOW()
    ),
    (
        caregiver_id,
        client3_id,
        CURRENT_DATE - INTERVAL '1 day',
        '14:00:00',
        '17:00:00',
        'Nursing Care',
        'completed',
        'Completed nursing assessment and care',
        NOW(),
        NOW()
    ),
    
    -- Some shifts from earlier this week
    (
        caregiver_id,
        client2_id,
        CURRENT_DATE - INTERVAL '2 days',
        '11:00:00',
        '15:00:00',
        'Companionship',
        'completed',
        'Social visit and light activities',
        NOW(),
        NOW()
    ),
    (
        caregiver_id,
        client1_id,
        CURRENT_DATE - INTERVAL '3 days',
        '08:30:00',
        '12:30:00',
        'Personal Support',
        'completed',
        'Morning care and household tasks',
        NOW(),
        NOW()
    );
    
    RAISE NOTICE 'Test caregiver and shifts created successfully!';
    RAISE NOTICE 'Caregiver ID: %', caregiver_id;
    RAISE NOTICE 'Created % shifts', (SELECT COUNT(*) FROM shifts WHERE caregiver_id = caregiver_id);
END $$;

-- Verify the data
SELECT 
    c.first_name || ' ' || c.last_name as caregiver_name,
    c.email,
    c.status,
    c.hourly_rate,
    COUNT(s.id) as total_shifts,
    COUNT(CASE WHEN s.scheduled_date = CURRENT_DATE THEN 1 END) as today_shifts,
    COUNT(CASE WHEN s.status = 'completed' THEN 1 END) as completed_shifts
FROM caregivers c
LEFT JOIN shifts s ON c.id = s.caregiver_id
WHERE c.email = 'test@caregiver.com'
GROUP BY c.id, c.first_name, c.last_name, c.email, c.status, c.hourly_rate;
