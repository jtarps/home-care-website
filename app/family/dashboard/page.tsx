"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, Heart, MessageSquare, AlertCircle, Phone, FileText } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

interface FamilyProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  relationship_to_client: string
  is_primary_contact: boolean
  can_update_care_info: boolean
  can_view_medical_info: boolean
}

interface Client {
  id: string
  first_name: string
  last_name: string
  address: string
  city: string
  phone?: string
  medical_conditions?: string
  care_requirements?: string
  status: string
}

interface Shift {
  id: string
  scheduled_date: string
  start_time: string
  end_time: string
  service_type: string
  status: string
  notes?: string
  check_in_time?: string
  check_out_time?: string
  caregiver?: {
    id: string
    first_name: string
    last_name: string
    phone?: string
  }
}

interface CareMessage {
  id: string
  subject?: string
  message: string
  sender_name: string
  sender_type: string
  priority: string
  status: string
  created_at: string
}

export default function FamilyDashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<FamilyProfile | null>(null)
  const [clients, setClients] = useState<Client[]>([])
  const [upcomingShifts, setUpcomingShifts] = useState<Shift[]>([])
  const [recentShifts, setRecentShifts] = useState<Shift[]>([])
  const [messages, setMessages] = useState<CareMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    let mounted = true

    const initializeDashboard = async () => {
      try {
        console.log("Initializing family dashboard...")

        // Check session first
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        console.log("Session check:", {
          hasSession: !!session,
          userEmail: session?.user?.email,
          error: sessionError?.message,
        })

        if (sessionError) {
          console.error("Session error:", sessionError)
          throw sessionError
        }

        if (!session) {
          console.log("No session found, redirecting to login")
          if (mounted) {
            router.replace("/family/login")
          }
          return
        }

        if (!mounted) return

        console.log("Valid session found, loading dashboard data...")
        await loadDashboardData(session.user)

        if (mounted) {
          setInitialized(true)
        }
      } catch (error: any) {
        console.error("Dashboard initialization error:", error)
        if (mounted) {
          toast.error("Failed to initialize dashboard. Please try logging in again.")
          router.replace("/family/login")
        }
      }
    }

    initializeDashboard()

    return () => {
      mounted = false
    }
  }, [router])

  const loadDashboardData = async (user: any) => {
    try {
      console.log("Loading dashboard data for user:", user.email)

      // Load family member profile
      const { data: familyData, error: familyError } = await supabase
        .from("family_members")
        .select(`
          id,
          first_name,
          last_name,
          email,
          phone,
          relationship_to_client,
          is_primary_contact,
          can_update_care_info,
          can_view_medical_info
        `)
        .eq("auth_user_id", user.id)
        .maybeSingle()

      console.log("Family query result:", { familyData, familyError })

      if (familyError) {
        console.error("Family error:", familyError)
        throw new Error(`Failed to load family profile: ${familyError.message}`)
      }

      if (!familyData) {
        throw new Error("This account is not registered as a family member. Please contact support.")
      }

      setProfile(familyData)
      console.log("Family profile loaded:", familyData)

      // Load clients through relationship table
      await loadClients(familyData.id)

      // Load messages for all clients
      await loadMessages(familyData.id)
    } catch (error: any) {
      console.error("Error in loadDashboardData:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const loadClients = async (familyMemberId: string) => {
    try {
      console.log("Loading clients for family member:", familyMemberId)

      // Get clients through the relationship table
      const { data: relationshipData, error: relationshipError } = await supabase
        .from("family_client_relationships")
        .select(`
          client_id,
          relationship_type,
          is_emergency_contact,
          access_level,
          clients!inner(
            id,
            first_name,
            last_name,
            address,
            city,
            phone,
            medical_conditions,
            care_requirements,
            status
          )
        `)
        .eq("family_member_id", familyMemberId)

      console.log("Relationship query result:", {
        relationshipCount: relationshipData?.length || 0,
        relationshipError: relationshipError?.message,
      })

      if (relationshipError) {
        console.error("Relationship error:", relationshipError)
        toast.error("Failed to load client relationships")
        return
      }

      const relationships = relationshipData || []
      const clients = relationships.map((rel) => rel.clients).filter(Boolean)

      setClients(clients)
      console.log("Clients loaded:", clients)

      // Load shifts for all clients
      if (clients.length > 0) {
        await loadShifts(clients.map((c) => c.id))
      }
    } catch (error: any) {
      console.error("Error loading clients:", error)
      toast.error("Failed to load client information")
    }
  }

  const loadShifts = async (clientIds: string[]) => {
    try {
      console.log("Loading shifts for clients:", clientIds)

      // Get date ranges
      const today = new Date().toISOString().split("T")[0]
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

      // Load shifts with caregiver information
      const { data: shiftsData, error: shiftsError } = await supabase
        .from("shifts")
        .select(`
          id,
          scheduled_date,
          start_time,
          end_time,
          service_type,
          status,
          notes,
          check_in_time,
          check_out_time,
          client_id,
          caregivers(
            id,
            first_name,
            last_name,
            phone
          )
        `)
        .in("client_id", clientIds)
        .gte("scheduled_date", thirtyDaysAgo)
        .lte("scheduled_date", thirtyDaysFromNow)
        .order("scheduled_date", { ascending: true })
        .order("start_time", { ascending: true })

      console.log("Shifts query result:", {
        shiftsCount: shiftsData?.length || 0,
        shiftsError: shiftsError?.message,
      })

      if (shiftsError) {
        console.error("Shifts error:", shiftsError)
        toast.error("Failed to load shifts")
        return
      }

      const shifts = shiftsData || []

      // Filter shifts by date
      const upcomingShifts = shifts
        .filter((shift) => shift.scheduled_date >= today && shift.status !== "cancelled")
        .slice(0, 10)
      const recentShifts = shifts
        .filter((shift) => shift.scheduled_date < today && shift.status === "completed")
        .slice(-10)
        .reverse()

      setUpcomingShifts(upcomingShifts)
      setRecentShifts(recentShifts)

      console.log("Shifts loaded successfully:", {
        upcomingCount: upcomingShifts.length,
        recentCount: recentShifts.length,
      })
    } catch (error: any) {
      console.error("Error loading shifts:", error)
      toast.error("Failed to load shifts")
    }
  }

  const loadMessages = async (familyMemberId: string) => {
    try {
      console.log("Loading messages for family member:", familyMemberId)

      // Get client IDs first
      const { data: relationshipData } = await supabase
        .from("family_client_relationships")
        .select("client_id")
        .eq("family_member_id", familyMemberId)

      if (!relationshipData || relationshipData.length === 0) {
        console.log("No client relationships found")
        return
      }

      const clientIds = relationshipData.map((rel) => rel.client_id)

      // Load messages for all clients
      const { data: messagesData, error: messagesError } = await supabase
        .from("care_messages")
        .select(`
          id,
          subject,
          message,
          sender_name,
          sender_type,
          priority,
          status,
          created_at
        `)
        .in("client_id", clientIds)
        .order("created_at", { ascending: false })
        .limit(10)

      console.log("Messages query result:", {
        messagesCount: messagesData?.length || 0,
        messagesError: messagesError?.message,
      })

      if (messagesError) {
        console.error("Messages error:", messagesError)
        toast.error("Failed to load messages")
        return
      }

      setMessages(messagesData || [])
    } catch (error: any) {
      console.error("Error loading messages:", error)
      toast.error("Failed to load messages")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-blue-100 text-blue-800"
      case "checked_in":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "normal":
        return "bg-blue-100 text-blue-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTime = (time: string) => {
    try {
      return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return time
    }
  }

  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    } catch {
      return date
    }
  }

  // Show loading while initializing
  if (!initialized || loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your family dashboard...</p>
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
            This account is not registered as a family member. Please contact support.
            <Button
              variant="outline"
              size="sm"
              className="ml-2 bg-transparent"
              onClick={() => router.replace("/family/login")}
            >
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {profile.first_name}!</h1>
            <p className="text-purple-100 mt-1">Stay connected with your loved one's care</p>
          </div>
          <div className="text-right">
            <Badge className="bg-white/20 text-white border-white/30">{profile.relationship_to_client}</Badge>
            {profile.is_primary_contact && <p className="text-purple-100 mt-2 text-sm">Primary Contact</p>}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Clients Under Care</p>
                <p className="text-2xl font-bold">{clients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Upcoming Visits</p>
                <p className="text-2xl font-bold">{upcomingShifts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Unread Messages</p>
                <p className="text-2xl font-bold">{messages.filter((m) => m.status === "unread").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            Your Loved Ones
          </CardTitle>
          <CardDescription>Information about clients under your care</CardDescription>
        </CardHeader>
        <CardContent>
          {clients.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No clients found</p>
              <p className="text-sm text-gray-500 mt-1">Please contact support to set up client relationships</p>
            </div>
          ) : (
            <div className="space-y-4">
              {clients.map((client) => (
                <div key={client.id} className="border rounded-lg p-4 bg-purple-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-lg">
                          {client.first_name} {client.last_name}
                        </h3>
                        <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {client.address}, {client.city}
                          </div>
                          {client.phone && (
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                              <Phone className="h-4 w-4 mr-1" />
                              {client.phone}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col space-y-2">
                          {client.phone && (
                            <Link href={`tel:${client.phone}`}>
                              <Button variant="outline" size="sm" className="w-full bg-transparent">
                                <Phone className="h-4 w-4 mr-1" />
                                Call
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>

                      {profile.can_view_medical_info && client.medical_conditions && (
                        <>
                          <Separator className="my-3" />
                          <div className="text-sm text-gray-600">
                            <strong>Medical Conditions:</strong> {client.medical_conditions}
                          </div>
                        </>
                      )}

                      {client.care_requirements && (
                        <>
                          <Separator className="my-3" />
                          <div className="text-sm text-gray-600">
                            <strong>Care Requirements:</strong> {client.care_requirements}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Visits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Upcoming Care Visits
          </CardTitle>
          <CardDescription>Scheduled visits for your loved ones</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingShifts.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No upcoming visits scheduled</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingShifts.slice(0, 5).map((shift) => {
                const client = clients.find((c) => c.id === shift.client_id)
                return (
                  <div key={shift.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-center">
                        <div className="text-sm font-medium">
                          {new Date(shift.scheduled_date).toLocaleDateString("en-US", { month: "short" })}
                        </div>
                        <div className="text-lg font-bold">{new Date(shift.scheduled_date).getDate()}</div>
                      </div>
                      <div>
                        <div className="font-medium">
                          {client?.first_name || "Unknown"} {client?.last_name || "Client"}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatTime(shift.start_time)} - {formatTime(shift.end_time)} • {shift.service_type}
                        </div>
                        {shift.caregiver && (
                          <div className="text-sm text-gray-500">
                            Caregiver: {shift.caregiver.first_name} {shift.caregiver.last_name}
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge className={getStatusColor(shift.status)}>{shift.status.replace("_", " ")}</Badge>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Recent Care Messages
          </CardTitle>
          <CardDescription>Updates and communications from the care team</CardDescription>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No messages yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 5).map((message) => (
                <div key={message.id} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{message.sender_name}</span>
                      <Badge variant="outline" className="text-xs">
                        {message.sender_type}
                      </Badge>
                      <Badge className={getPriorityColor(message.priority)}>{message.priority}</Badge>
                    </div>
                    <span className="text-xs text-gray-500">{new Date(message.created_at).toLocaleDateString()}</span>
                  </div>
                  {message.subject && <h4 className="font-medium text-sm mb-1">{message.subject}</h4>}
                  <p className="text-sm text-gray-600">{message.message}</p>
                </div>
              ))}
              <div className="text-center pt-2">
                <Link href="/family/messages">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    View All Messages
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/family/messages/new">
              <Button className="w-full bg-transparent" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </Link>
            <Button className="w-full bg-transparent" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Request Care Update
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Emergency Contact
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
