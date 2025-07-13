-- Create family members table
CREATE TABLE IF NOT EXISTS family_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    relationship_to_client VARCHAR(50) NOT NULL,
    is_primary_contact BOOLEAN DEFAULT false,
    can_update_care_info BOOLEAN DEFAULT false,
    can_view_medical_info BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create family-client relationships table
CREATE TABLE IF NOT EXISTS family_client_relationships (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    family_member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    relationship_type VARCHAR(50) NOT NULL,
    is_emergency_contact BOOLEAN DEFAULT false,
    access_level VARCHAR(20) DEFAULT 'basic' CHECK (access_level IN ('basic', 'full', 'limited')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(family_member_id, client_id)
);

-- Create care messages table
CREATE TABLE IF NOT EXISTS care_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('family', 'caregiver', 'admin', 'care_team')),
    sender_id UUID, -- Can reference family_members, caregivers, or admin users
    sender_name VARCHAR(200) NOT NULL,
    recipient_type VARCHAR(20) NOT NULL CHECK (recipient_type IN ('family', 'caregiver', 'admin', 'care_team')),
    recipient_id UUID,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    priority VARCHAR(10) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'responded', 'archived')),
    reply_to_id UUID REFERENCES care_messages(id),
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create care updates table (for family requests to update care info)
CREATE TABLE IF NOT EXISTS care_updates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    requested_by_family_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
    update_type VARCHAR(50) NOT NULL, -- 'emergency_contact', 'care_preference', 'medication', 'schedule'
    title VARCHAR(255) NOT NULL,
    description TEXT,
    current_value JSONB,
    new_value JSONB,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'implemented')),
    reviewed_by UUID, -- Admin or care coordinator
    reviewed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_family_members_auth_user ON family_members(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_family_members_email ON family_members(email);
CREATE INDEX IF NOT EXISTS idx_family_client_relationships_family ON family_client_relationships(family_member_id);
CREATE INDEX IF NOT EXISTS idx_family_client_relationships_client ON family_client_relationships(client_id);
CREATE INDEX IF NOT EXISTS idx_care_messages_client ON care_messages(client_id);
CREATE INDEX IF NOT EXISTS idx_care_messages_sender ON care_messages(sender_type, sender_id);
CREATE INDEX IF NOT EXISTS idx_care_messages_status ON care_messages(status);
CREATE INDEX IF NOT EXISTS idx_care_updates_client ON care_updates(client_id);
CREATE INDEX IF NOT EXISTS idx_care_updates_family ON care_updates(requested_by_family_id);
CREATE INDEX IF NOT EXISTS idx_care_updates_status ON care_updates(status);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_family_members_updated_at BEFORE UPDATE ON family_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_care_messages_updated_at BEFORE UPDATE ON care_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_care_updates_updated_at BEFORE UPDATE ON care_updates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_client_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE care_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE care_updates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for family_members
CREATE POLICY "Family members can view their own profile" ON family_members
    FOR SELECT USING (auth_user_id = auth.uid());

CREATE POLICY "Family members can update their own profile" ON family_members
    FOR UPDATE USING (auth_user_id = auth.uid());

-- RLS Policies for family_client_relationships
CREATE POLICY "Family members can view their client relationships" ON family_client_relationships
    FOR SELECT USING (
        family_member_id IN (
            SELECT id FROM family_members WHERE auth_user_id = auth.uid()
        )
    );

-- RLS Policies for care_messages
CREATE POLICY "Family members can view messages for their clients" ON care_messages
    FOR SELECT USING (
        client_id IN (
            SELECT fcr.client_id 
            FROM family_client_relationships fcr
            JOIN family_members fm ON fcr.family_member_id = fm.id
            WHERE fm.auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Family members can insert messages for their clients" ON care_messages
    FOR INSERT WITH CHECK (
        client_id IN (
            SELECT fcr.client_id 
            FROM family_client_relationships fcr
            JOIN family_members fm ON fcr.family_member_id = fm.id
            WHERE fm.auth_user_id = auth.uid()
        )
    );

-- RLS Policies for care_updates
CREATE POLICY "Family members can view their care update requests" ON care_updates
    FOR SELECT USING (
        requested_by_family_id IN (
            SELECT id FROM family_members WHERE auth_user_id = auth.uid()
        )
    );

CREATE POLICY "Family members can create care update requests" ON care_updates
    FOR INSERT WITH CHECK (
        requested_by_family_id IN (
            SELECT id FROM family_members WHERE auth_user_id = auth.uid()
        )
    );
