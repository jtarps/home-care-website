"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, DollarSign, Calendar, AlertCircle, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface CaregiverProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  address?: string
  city?: string
  postal_code?: string
  date_of_birth?: string
  hourly_rate?: number
  specializations?: string[]
  certifications?: string[]
  availability?: string[]
  languages?: string[]
  emergency_contact_name?: string
  emergency_contact_phone?: string
  hire_date?: string
  status: string
  notes?: string
  created_at: string
  updated_at: string
}

export default function CaregiverProfile() {
  const router = useRouter()
  const [profile, setProfile] = useState<CaregiverProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<CaregiverProfile>>({})

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        router.replace("/caregiver/login")
        return
      }

      const { data: profileData, error: profileError } = await supabase
        .from("caregivers")
        .select("*")
        .eq("email", user.email)
        .single()

      if (profileError) {
        console.error("Profile error:", profileError)
        toast.error("Failed to load profile")
        return
      }

      setProfile(profileData)
      setFormData(profileData)
    } catch (error: any) {
      console.error("Error loading profile:", error)
      toast.error("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!profile) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from("caregivers")
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id)

      if (error) throw error

      setProfile({ ...profile, ...formData })
      setEditing(false)
      toast.success("Profile updated successfully!")
    } catch (error: any) {
      console.error("Save error:", error)
      toast.error("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData(profile || {})
    setEditing(false)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not provided"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "on_leave":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Unable to load your profile. Please contact support if this issue persists.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(profile.status)}>{profile.status.replace("_", " ").toUpperCase()}</Badge>
          {!editing ? (
            <Button onClick={() => setEditing(true)}>Edit Profile</Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={saving}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Personal Information
          </CardTitle>
          <CardDescription>Your basic personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              {editing ? (
                <Input
                  id="first_name"
                  value={formData.first_name || ""}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                />
              ) : (
                <p className="text-sm text-gray-900">{profile.first_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              {editing ? (
                <Input
                  id="last_name"
                  value={formData.last_name || ""}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                />
              ) : (
                <p className="text-sm text-gray-900">{profile.last_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <p className="text-sm text-gray-900">{profile.email}</p>
              </div>
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              {editing ? (
                <Input
                  id="phone"
                  value={formData.phone || ""}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{profile.phone}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              {editing ? (
                <Input
                  id="date_of_birth"
                  type="date"
                  value={formData.date_of_birth || ""}
                  onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{formatDate(profile.date_of_birth)}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hourly_rate">Hourly Rate</Label>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <p className="text-sm text-gray-900">${profile.hourly_rate?.toFixed(2) || "Not set"} per hour</p>
              </div>
              <p className="text-xs text-gray-500">Contact admin to change hourly rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Address Information
          </CardTitle>
          <CardDescription>Your residential address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Street Address</Label>
              {editing ? (
                <Input
                  id="address"
                  value={formData.address || ""}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              ) : (
                <p className="text-sm text-gray-900">{profile.address || "Not provided"}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              {editing ? (
                <Input
                  id="city"
                  value={formData.city || ""}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              ) : (
                <p className="text-sm text-gray-900">{profile.city || "Not provided"}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="postal_code">Postal Code</Label>
              {editing ? (
                <Input
                  id="postal_code"
                  value={formData.postal_code || ""}
                  onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                />
              ) : (
                <p className="text-sm text-gray-900">{profile.postal_code || "Not provided"}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
          <CardDescription>Person to contact in case of emergency</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergency_contact_name">Contact Name</Label>
              {editing ? (
                <Input
                  id="emergency_contact_name"
                  value={formData.emergency_contact_name || ""}
                  onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
                />
              ) : (
                <p className="text-sm text-gray-900">{profile.emergency_contact_name || "Not provided"}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency_contact_phone">Contact Phone</Label>
              {editing ? (
                <Input
                  id="emergency_contact_phone"
                  value={formData.emergency_contact_phone || ""}
                  onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })}
                />
              ) : (
                <p className="text-sm text-gray-900">{profile.emergency_contact_phone || "Not provided"}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
          <CardDescription>Your qualifications and specializations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Specializations</Label>
              <div className="flex flex-wrap gap-2">
                {profile.specializations && profile.specializations.length > 0 ? (
                  profile.specializations.map((spec, index) => (
                    <Badge key={index} variant="outline">
                      {spec}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No specializations listed</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Certifications</Label>
              <div className="flex flex-wrap gap-2">
                {profile.certifications && profile.certifications.length > 0 ? (
                  profile.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {cert}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No certifications listed</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Languages</Label>
              <div className="flex flex-wrap gap-2">
                {profile.languages && profile.languages.length > 0 ? (
                  profile.languages.map((lang, index) => (
                    <Badge key={index} variant="outline">
                      {lang}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No languages listed</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Availability</Label>
              <div className="flex flex-wrap gap-2">
                {profile.availability && profile.availability.length > 0 ? (
                  profile.availability.map((day, index) => (
                    <Badge key={index} variant="outline">
                      {day}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No availability listed</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Hire Date</Label>
            <p className="text-sm text-gray-900">{formatDate(profile.hire_date)}</p>
          </div>

          {profile.notes && (
            <div className="space-y-2">
              <Label>Notes</Label>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{profile.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Account status and timestamps</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Account Status</Label>
              <Badge className={getStatusColor(profile.status)}>{profile.status.replace("_", " ").toUpperCase()}</Badge>
            </div>

            <div className="space-y-2">
              <Label>Member Since</Label>
              <p className="text-sm text-gray-900">{formatDate(profile.created_at)}</p>
            </div>

            <div className="space-y-2">
              <Label>Last Updated</Label>
              <p className="text-sm text-gray-900">{formatDate(profile.updated_at)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
