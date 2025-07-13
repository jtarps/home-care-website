"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MapPin, User, CheckCircle, AlertCircle, Phone, MessageSquare } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

interface CaregiverProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  specializations?: string[]
  certifications?: string[]
  status: string
  hourly_rate?: number
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
}

interface Shift {
  id: string
  scheduled_date: string
  start_time: string
  end_time: string
  service_type: string
  status: string
  notes?: string
  duration_hours?: number
  total_cost?: number
  check_in_time?: string
  check_out_time?: string
  client?: Client
}

export default function CaregiverDashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<CaregiverProfile | null>(null)
  const [todayShifts, setTodayShifts] = useState<Shift[]>([])
  const [upcomingShifts, setUpcomingShifts] = useState<Shift[]>([])
  const [recentShifts, setRecentShifts] = useState<Shift[]>([])
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    let mounted = true

    const initializeDashboard = async () => {
      try {
        console.log("Initializing caregiver dashboard...")

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
            router.replace("/caregiver/login")
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
          router.replace("/caregiver/login")
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

      // Load caregiver profile using email (not auth_user_id)
      const { data: caregiverData, error: caregiverError } = await supabase
        .from("caregivers")
        .select(`
          id,
          first_name,
          last_name,
          email,
          phone,
          specializations,
          certifications,
          status,
          hourly_rate
        `)
        .eq("email", user.email)
        .maybeSingle()

      console.log("Caregiver query result:", { caregiverData, caregiverError })

      if (caregiverError) {
        console.error("Caregiver error:", caregiverError)
        throw new Error(`Failed to load caregiver profile: ${caregiverError.message}`)
      }

      if (!caregiverData) {
        throw new Error("This account is not registered as a caregiver. Please contact support.")
      }

      setProfile(caregiverData)
      console.log("Caregiver profile loaded:", caregiverData)

      // Load shifts with client information
      await loadShifts(caregiverData.id)
    } catch (error: any) {
      console.error("Error in loadDashboardData:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const loadShifts = async (caregiverId: string) => {
    try {
      console.log("Loading shifts for caregiver:", caregiverId)

      // Get date ranges
      const today = new Date().toISOString().split("T")[0]
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

      // Load shifts with client information
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
          duration_hours,
          total_cost,
          check_in_time,
          check_out_time,
          client_id,
          clients!inner(
            id,
            first_name,
            last_name,
            address,
            city,
            phone,
            medical_conditions,
            care_requirements
          )
        `)
        .eq("caregiver_id", caregiverId)
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

      // Safely process shifts data
      const processedShifts = shifts.map((shift) => ({
        ...shift,
        client: shift.clients || {
          id: "unknown",
          first_name: "Unknown",
          last_name: "Client",
          address: "Unknown Address",
          city: "Unknown City",
          phone: "",
        },
      }))

      // Filter shifts by date
      const todayShifts = processedShifts.filter((shift) => shift.scheduled_date === today)
      const upcomingShifts = processedShifts
        .filter((shift) => shift.scheduled_date > today && shift.status !== "cancelled")
        .slice(0, 10)
      const recentShifts = processedShifts
        .filter((shift) => shift.scheduled_date < today && shift.status === "completed")
        .slice(-10)
        .reverse()

      setTodayShifts(todayShifts)
      setUpcomingShifts(upcomingShifts)
      setRecentShifts(recentShifts)

      console.log("Shifts loaded successfully:", {
        todayCount: todayShifts.length,
        upcomingCount: upcomingShifts.length,
        recentCount: recentShifts.length,
      })
    } catch (error: any) {
      console.error("Error loading shifts:", error)
      toast.error("Failed to load shifts")
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

  const canCheckIn = (shift: Shift) => {
    const now = new Date()
    const shiftDate = new Date(shift.scheduled_date)
    const [hours, minutes] = shift.start_time.split(":")
    const shiftStart = new Date(shiftDate.setHours(Number.parseInt(hours), Number.parseInt(minutes)))
    const oneHourBefore = new Date(shiftStart.getTime() - 60 * 60 * 1000)

    return now >= oneHourBefore && shift.status === "assigned"
  }

  const handleCheckIn = async (shiftId: string) => {
    try {
      const { error } = await supabase
        .from("shifts")
        .update({
          status: "checked_in",
          check_in_time: new Date().toISOString(),
        })
        .eq("id", shiftId)

      if (error) {
        console.error("Check-in error:", error)
        toast.error("Failed to check in")
        return
      }

      toast.success("Successfully checked in!")

      // Reload shifts to reflect the change
      if (profile) {
        await loadShifts(profile.id)
      }
    } catch (error: any) {
      console.error("Check-in error:", error)
      toast.error("Failed to check in")
    }
  }

  const handleCheckOut = async (shiftId: string) => {
    try {
      const { error } = await supabase
        .from("shifts")
        .update({
          status: "completed",
          check_out_time: new Date().toISOString(),
        })
        .eq("id", shiftId)

      if (error) {
        console.error("Check-out error:", error)
        toast.error("Failed to check out")
        return
      }

      toast.success("Successfully checked out!")

      // Reload shifts to reflect the change
      if (profile) {
        await loadShifts(profile.id)
      }
    } catch (error: any) {
      console.error("Check-out error:", error)
      toast.error("Failed to check out")
    }
  }

  // Show loading while initializing
  if (!initialized || loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your caregiver dashboard...</p>
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
            This account is not registered as a caregiver. Please contact support.
            <Button
              variant="outline"
              size="sm"
              className="ml-2 bg-transparent"
              onClick={() => router.replace("/caregiver/login")}
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {profile.first_name}!</h1>
            <p className="text-blue-100 mt-1">Ready to provide excellent care today</p>
          </div>
          <div className="text-right">
            <Badge className="bg-white/20 text-white border-white/30">
              {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
            </Badge>
            {profile.hourly_rate && <p className="text-blue-100 mt-2 text-sm">${profile.hourly_rate}/hour</p>}
            {profile.specializations && profile.specializations.length > 0 && (
              <p className="text-blue-100 mt-1 text-sm">{profile.specializations.join(", ")}</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Today's Shifts</p>
                <p className="text-2xl font-bold">{todayShifts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Upcoming Shifts</p>
                <p className="text-2xl font-bold">{upcomingShifts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Completed This Month</p>
                <p className="text-2xl font-bold">{recentShifts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Shifts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Today's Shifts
          </CardTitle>
          <CardDescription>Your scheduled shifts for today</CardDescription>
        </CardHeader>
        <CardContent>
          {todayShifts.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No shifts scheduled for today</p>
              <p className="text-sm text-gray-500 mt-1">Enjoy your day off!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todayShifts.map((shift) => (
                <div key={shift.id} className="border rounded-lg p-4 bg-blue-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getStatusColor(shift.status)}>{shift.status.replace("_", " ")}</Badge>
                        <span className="text-sm text-gray-600">{shift.service_type}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <User className="h-4 w-4 mr-1" />
                            {shift.client?.first_name || "Unknown"} {shift.client?.last_name || "Client"}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {shift.client?.address || "Unknown Address"}, {shift.client?.city || "Unknown City"}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                          </div>
                          {shift.duration_hours && (
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <span className="font-medium">{shift.duration_hours}h</span>
                              {shift.total_cost && (
                                <span className="ml-2 text-green-600 font-medium">${shift.total_cost.toFixed(2)}</span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col space-y-2">
                          {shift.client?.phone && (
                            <Link href={`tel:${shift.client.phone}`}>
                              <Button variant="outline" size="sm" className="w-full bg-transparent">
                                <Phone className="h-4 w-4 mr-1" />
                                Call Client
                              </Button>
                            </Link>
                          )}

                          {canCheckIn(shift) && (
                            <Button size="sm" onClick={() => handleCheckIn(shift.id)} className="w-full">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Check In
                            </Button>
                          )}

                          {shift.status === "checked_in" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCheckOut(shift.id)}
                              className="w-full bg-transparent"
                            >
                              Check Out
                            </Button>
                          )}

                          <Link href={`/checkin/${shift.id}`}>
                            <Button size="sm" variant="outline" className="w-full bg-transparent">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {shift.client?.care_requirements && (
                        <>
                          <Separator className="my-3" />
                          <div className="text-sm text-gray-600">
                            <strong>Care Requirements:</strong> {shift.client.care_requirements}
                          </div>
                        </>
                      )}

                      {shift.notes && (
                        <>
                          <Separator className="my-3" />
                          <div className="text-sm text-gray-600">
                            <strong>Notes:</strong> {shift.notes}
                          </div>
                        </>
                      )}

                      {shift.check_in_time && (
                        <>
                          <Separator className="my-3" />
                          <div className="text-sm text-gray-600">
                            <strong>Checked in:</strong>{" "}
                            {new Date(shift.check_in_time).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            {shift.check_out_time && (
                              <span className="ml-4">
                                <strong>Checked out:</strong>{" "}
                                {new Date(shift.check_out_time).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            )}
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

      {/* Upcoming Shifts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Upcoming Shifts
          </CardTitle>
          <CardDescription>Your scheduled shifts for the next 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingShifts.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No upcoming shifts scheduled</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingShifts.slice(0, 5).map((shift) => (
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
                        {shift.client?.first_name || "Unknown"} {shift.client?.last_name || "Client"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatTime(shift.start_time)} - {formatTime(shift.end_time)} • {shift.service_type}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {shift.client?.city || "Unknown City"}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(shift.status)}>{shift.status.replace("_", " ")}</Badge>
                </div>
              ))}
              {upcomingShifts.length > 5 && (
                <div className="text-center pt-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    View All {upcomingShifts.length} Upcoming Shifts
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Shifts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Recent Completed Shifts
          </CardTitle>
          <CardDescription>Your completed shifts from the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          {recentShifts.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No recent completed shifts</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentShifts.slice(0, 5).map((shift) => (
                <div key={shift.id} className="flex items-center justify-between p-3 border rounded-lg bg-green-50">
                  <div className="flex items-center space-x-3">
                    <div className="text-center">
                      <div className="text-sm font-medium">
                        {new Date(shift.scheduled_date).toLocaleDateString("en-US", { month: "short" })}
                      </div>
                      <div className="text-lg font-bold">{new Date(shift.scheduled_date).getDate()}</div>
                    </div>
                    <div>
                      <div className="font-medium">
                        {shift.client?.first_name || "Unknown"} {shift.client?.last_name || "Client"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatTime(shift.start_time)} - {formatTime(shift.end_time)} • {shift.service_type}
                      </div>
                      {shift.check_in_time && shift.check_out_time && (
                        <div className="text-xs text-gray-500">
                          Checked in:{" "}
                          {new Date(shift.check_in_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}{" "}
                          • Checked out:{" "}
                          {new Date(shift.check_out_time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    {shift.total_cost && (
                      <div className="text-sm text-green-600 font-medium mt-1">${shift.total_cost.toFixed(2)}</div>
                    )}
                  </div>
                </div>
              ))}
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
            <Link href="/caregiver/profile">
              <Button className="w-full bg-transparent" variant="outline">
                <User className="h-4 w-4 mr-2" />
                Update Profile
              </Button>
            </Link>
            <Button className="w-full bg-transparent" variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Coordinator
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
