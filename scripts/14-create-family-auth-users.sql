-- Create family auth users and link them to family_members table
-- Note: This may need to be done manually in Supabase Dashboard if direct auth.users insert fails

-- First, let's check if we can insert into auth.users (this might fail in hosted Supabase)
DO $$
DECLARE
    robert_user_id uuid;
    sarah_user_id uuid;
BEGIN
    -- Try to create auth users (this might fail in production)
    BEGIN
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES 
        (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            'robert.johnson@family.com',
            crypt('password123', gen_salt('bf')),
            NOW(),
            NOW(),
            NOW(),
            '{"provider": "email", "providers": ["email"]}',
            '{"first_name": "Robert", "last_name": "Johnson"}',
            NOW(),
            NOW(),
            '',
            '',
            '',
            ''
        ),
        (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            'sarah.smith@family.com',
            crypt('password123', gen_salt('bf')),
            NOW(),
            NOW(),
            NOW(),
            '{"provider": "email", "providers": ["email"]}',
            '{"first_name": "Sarah", "last_name": "Smith"}',
            NOW(),
            NOW(),
            '',
            '',
            '',
            ''
        );
        
        RAISE NOTICE 'Auth users created successfully';
        
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Could not create auth users directly. Please create them manually in Supabase Dashboard.';
        RAISE NOTICE 'Create users: robert.johnson@family.com and sarah.smith@family.com with password: password123';
    END;
    
    -- Link existing family members to auth users (this will work after manual creation)
    BEGIN
        -- Get Robert's auth user ID
        SELECT id INTO robert_user_id 
        FROM auth.users 
        WHERE email = 'robert.johnson@family.com' 
        LIMIT 1;
        
        -- Get Sarah's auth user ID  
        SELECT id INTO sarah_user_id 
        FROM auth.users 
        WHERE email = 'sarah.smith@family.com' 
        LIMIT 1;
        
        -- Update family members with auth user IDs
        IF robert_user_id IS NOT NULL THEN
            UPDATE family_members 
            SET auth_user_id = robert_user_id
            WHERE email = 'robert.johnson@family.com';
            RAISE NOTICE 'Linked Robert Johnson to auth user';
        END IF;
        
        IF sarah_user_id IS NOT NULL THEN
            UPDATE family_members 
            SET auth_user_id = sarah_user_id
            WHERE email = 'sarah.smith@family.com';
            RAISE NOTICE 'Linked Sarah Smith to auth user';
        END IF;
        
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Auth users not found. Please create them manually first.';
    END;
END $$;

-- Verify the setup using the relationship table
SELECT 
    fm.first_name,
    fm.last_name,
    fm.email,
    fm.auth_user_id IS NOT NULL as has_auth_user,
    c.first_name as client_first_name,
    c.last_name as client_last_name,
    fcr.relationship_type
FROM family_members fm
LEFT JOIN family_client_relationships fcr ON fm.id = fcr.family_member_id
LEFT JOIN clients c ON fcr.client_id = c.id
WHERE fm.email IN ('robert.johnson@family.com', 'sarah.smith@family.com');
