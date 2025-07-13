import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types (MVP)
export interface Intake {
  id: string
  first_name: string
  last_name: string
  date_of_birth?: string
  phone?: string
  email?: string
  address?: string
  city?: string
  postal_code?: string
  gender?: string
  medical_conditions?: string
  medications?: string
  allergies?: string
  mobility_level?: string
  care_requirements?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  emergency_contact_relationship?: string
  insurance_provider?: string
  insurance_number?: string
  preferred_start_date?: string
  preferred_schedule?: string
  preferred_time?: string
  duration_per_visit?: string
  additional_notes?: string
  admin_notes?: string
  assigned_caregiver_id?: string
  status: 'pending' | 'approved' | 'rejected' | 'assigned'
  created_at: string
  client_id?: string
  source: 'admin' | 'booking'
}

export interface Client {
  id: string
  first_name: string
  last_name: string
  date_of_birth?: string
  phone?: string
  email?: string
  address?: string
  status: 'active' | 'inactive' | 'discharged'
  notes?: string
}

export interface FamilyMember {
  id: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  is_primary_contact: boolean
  client_id: string
  notes?: string
}

export interface Caregiver {
  id: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  status: 'pending' | 'active' | 'inactive'
  certifications?: string[]
  notes?: string
}

export interface Shift {
  id: string
  client_id: string
  caregiver_id: string
  scheduled_date: string // YYYY-MM-DD
  start_time: string // HH:MM
  end_time: string // HH:MM
  service_type: string
  hourly_rate?: number
  status: 'assigned' | 'checked_in' | 'completed' | 'cancelled' | 'no_show'
  notes?: string
  admin_notes?: string
  // Optionally, add created_at if used elsewhere
  created_at?: string
}

export interface Message {
  id: string
  client_id: string
  sender_id: string
  sender_type: 'family' | 'caregiver' | 'admin'
  recipient_id?: string
  message: string
  created_at: string
}
