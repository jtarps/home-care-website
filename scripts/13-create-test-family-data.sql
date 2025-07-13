-- Insert test family members
INSERT INTO family_members (
    auth_user_id,
    first_name,
    last_name,
    email,
    phone,
    relationship_to_client,
    is_primary_contact,
    can_update_care_info,
    can_view_medical_info
) VALUES 
-- Family member for Mary Johnson (assuming she's our test client)
(
    NULL, -- Will be set when auth user is created
    'Robert',
    'Johnson',
    'robert.johnson@family.com',
    '416-555-0101',
    'Son',
    true,
    true,
    true
),
(
    NULL,
    'Sarah',
    'Johnson-Smith',
    'sarah.smith@family.com',
    '416-555-0102',
    'Daughter',
    false,
    true,
    true
);

-- Get the client ID for Mary Johnson (or create if doesn't exist)
DO $$
DECLARE
    mary_client_id UUID;
    robert_family_id UUID;
    sarah_family_id UUID;
BEGIN
    -- Get or create Mary Johnson as a client
    SELECT id INTO mary_client_id FROM clients WHERE first_name = 'Mary' AND last_name = 'Johnson';
    
    IF mary_client_id IS NULL THEN
        INSERT INTO clients (
            first_name,
            last_name,
            email,
            phone,
            address,
            city,
            postal_code,
            date_of_birth,
            gender,
            medical_conditions,
            medications,
            care_requirements,
            emergency_contact_name,
            emergency_contact_phone,
            emergency_contact_relationship,
            status
        ) VALUES (
            'Mary',
            'Johnson',
            'mary.johnson@email.com',
            '416-555-0100',
            '123 Maple Street',
            'Toronto',
            'M5V 3A8',
            '1945-03-15',
            'Female',
            'Diabetes, Hypertension, Mild Dementia',
            'Metformin 500mg twice daily, Lisinopril 10mg daily, Donepezil 5mg daily',
            'Personal care assistance, medication reminders, companionship, light housekeeping',
            'Robert Johnson',
            '416-555-0101',
            'Son',
            'active'
        ) RETURNING id INTO mary_client_id;
    END IF;

    -- Get family member IDs
    SELECT id INTO robert_family_id FROM family_members WHERE email = 'robert.johnson@family.com';
    SELECT id INTO sarah_family_id FROM family_members WHERE email = 'sarah.smith@family.com';

    -- Create family-client relationships
    INSERT INTO family_client_relationships (
        family_member_id,
        client_id,
        relationship_type,
        is_emergency_contact,
        access_level
    ) VALUES 
    (robert_family_id, mary_client_id, 'Son', true, 'full'),
    (sarah_family_id, mary_client_id, 'Daughter', false, 'full')
    ON CONFLICT (family_member_id, client_id) DO NOTHING;

    -- Insert some test care messages
    INSERT INTO care_messages (
        client_id,
        sender_type,
        sender_id,
        sender_name,
        recipient_type,
        subject,
        message,
        priority,
        status
    ) VALUES 
    (
        mary_client_id,
        'family',
        robert_family_id,
        'Robert Johnson',
        'care_team',
        'Question about medication timing',
        'Hi, I noticed Mom seems confused about when to take her evening medications. Could someone please review the schedule with her during tomorrow''s visit?',
        'normal',
        'unread'
    ),
    (
        mary_client_id,
        'caregiver',
        NULL,
        'Jennifer Smith (Caregiver)',
        'family',
        'Weekly Update - Mary Johnson',
        'Mary had a great week! She''s been more engaged during our activities and her appetite has improved. We worked on some light exercises and she enjoyed our walk in the garden. No concerns to report.',
        'normal',
        'unread'
    );

    -- Insert some care update requests
    INSERT INTO care_updates (
        client_id,
        update_type,
        title,
        description,
        new_value,
        requested_by_family_id,
        status
    ) VALUES 
    (
        mary_client_id,
        'emergency_contact',
        'Add secondary emergency contact',
        'Please add my daughter Sarah as a secondary emergency contact',
        '{"name": "Sarah Johnson-Smith", "phone": "416-555-0102", "relationship": "Daughter"}',
        robert_family_id,
        'pending'
    ),
    (
        mary_client_id,
        'care_preference',
        'Preferred meal times',
        'Mom prefers to have lunch at 12:30 PM instead of 1:00 PM',
        '{"lunch_time": "12:30 PM", "notes": "Better appetite at this time"}',
        robert_family_id,
        'approved'
    );

END $$;

-- Add some additional shifts for better demo data
DO $$
DECLARE
    mary_client_id UUID;
    test_caregiver_id UUID;
BEGIN
    SELECT id INTO mary_client_id FROM clients WHERE first_name = 'Mary' AND last_name = 'Johnson';
    SELECT id INTO test_caregiver_id FROM caregivers WHERE email = 'test@caregiver.com';
    
    IF mary_client_id IS NOT NULL AND test_caregiver_id IS NOT NULL THEN
        -- Add some completed shifts (past week)
        INSERT INTO shifts (
            caregiver_id,
            client_id,
            scheduled_date,
            start_time,
            end_time,
            service_type,
            hourly_rate,
            status,
            notes,
            check_in_time,
            check_out_time
        ) VALUES 
        (
            test_caregiver_id,
            mary_client_id,
            CURRENT_DATE - INTERVAL '2 days',
            '09:00:00',
            '13:00:00',
            'Personal Care & Companionship',
            25.00,
            'completed',
            'Assisted with morning routine, medication reminder, light housekeeping, and enjoyed conversation over lunch.',
            CURRENT_DATE - INTERVAL '2 days' + TIME '08:58:00',
            CURRENT_DATE - INTERVAL '2 days' + TIME '13:05:00'
        ),
        (
            test_caregiver_id,
            mary_client_id,
            CURRENT_DATE - INTERVAL '1 day',
            '14:00:00',
            '18:00:00',
            'Personal Care & Meal Preparation',
            25.00,
            'completed',
            'Prepared dinner, assisted with evening medications, and helped with light exercises.',
            CURRENT_DATE - INTERVAL '1 day' + TIME '13:55:00',
            CURRENT_DATE - INTERVAL '1 day' + TIME '18:10:00'
        ),
        -- Add upcoming shifts
        (
            test_caregiver_id,
            mary_client_id,
            CURRENT_DATE + INTERVAL '1 day',
            '10:00:00',
            '14:00:00',
            'Personal Care & Companionship',
            25.00,
            'assigned',
            'Regular morning care routine and companionship',
            NULL,
            NULL
        ),
        (
            test_caregiver_id,
            mary_client_id,
            CURRENT_DATE + INTERVAL '3 days',
            '15:00:00',
            '19:00:00',
            'Personal Care & Meal Preparation',
            25.00,
            'assigned',
            'Afternoon care and dinner preparation',
            NULL,
            NULL
        )
        ON CONFLICT DO NOTHING;
    END IF;
END $$;
