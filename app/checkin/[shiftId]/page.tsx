"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Clock, User, CheckCircle, Navigation, AlertCircle, Phone } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

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
  check_in_location?: string
  check_out_location?: string
  client: {
    id: string
    first_name: string
    last_name: string
    address: string
    city: string
    phone: string
  }
}

export default function CheckInOut() {
  const router = useRouter()
  const params = useParams()
  const shiftId = params.shiftId as string

  const [shift, setShift] = useState<Shift | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    loadShift()
    getCurrentLocation()
  }, [shiftId])

  const loadShift = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        router.replace("/caregiver/login")
        return
      }

      const { data: shiftData, error: shiftError } = await supabase
        .from("shifts")
        .select(`
          *,
          client:clients(id, first_name, last_name, address, city, phone)
        `)
        .eq("id", shiftId)
        .single()

      if (shiftError) {
        console.error("Shift error:", shiftError)
        toast.error("Failed to load shift details")
        return
      }

      setShift(shiftData)
    } catch (error: any) {
      console.error("Error loading shift:", error)
      toast.error("Failed to load shift details")
    } finally {
      setLoading(false)
    }
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => {
        console.error("Location error:", error)
        setLocationError("Unable to get your location. Please enable location services.")
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    )
  }

  const handleCheckIn = async () => {
    if (!shift || !location) return

    setProcessing(true)
    try {
      const checkInTime = new Date().toISOString()
      const locationString = `${location.lat},${location.lng}`

      const { error } = await supabase
        .from("shifts")
        .update({
          status: "checked_in",
          check_in_time: checkInTime,
          check_in_location: locationString,
          notes: notes || shift.notes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", shift.id)

      if (error) throw error

      toast.success("Successfully checked in!")
      router.push("/caregiver/dashboard")
    } catch (error: any) {
      console.error("Check-in error:", error)
      toast.error("Failed to check in. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  const handleCheckOut = async () => {
    if (!shift || !location) return

    setProcessing(true)
    try {
      const checkOutTime = new Date().toISOString()
      const locationString = `${location.lat},${location.lng}`

      const { error } = await supabase
        .from("shifts")
        .update({
          status: "completed",
          check_out_time: checkOutTime,
          check_out_location: locationString,
          notes: notes || shift.notes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", shift.id)

      if (error) throw error

      toast.success("Successfully checked out!")
      router.push("/caregiver/dashboard")
    } catch (error: any) {
      console.error("Check-out error:", error)
      toast.error("Failed to check out. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-blue-100 text-blue-800"
      case "checked_in":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
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
            <p className="mt-4 text-gray-600">Loading shift details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!shift) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Shift not found or you don't have permission to access it.</AlertDescription>
        </Alert>
      </div>
    )
  }

  const isCheckIn = shift.status === "assigned"
  const isCheckOut = shift.status === "checked_in"

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          {isCheckIn ? "Check In" : isCheckOut ? "Check Out" : "Shift Details"}
        </h1>
        <p className="text-gray-600">
          {isCheckIn
            ? "Confirm your arrival at the client location"
            : isCheckOut
              ? "Complete your shift and check out"
              : "Shift has been completed"}
        </p>
      </div>

      {/* Shift Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Shift Information</span>
            <Badge className={getStatusColor(shift.status)}>{shift.status.replace("_", " ")}</Badge>
          </CardTitle>
          <CardDescription>Details for your scheduled shift</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">Time:</span>
                <span className="ml-2">
                  {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                </span>
              </div>

              <div className="flex items-center text-sm">
                <User className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">Client:</span>
                <span className="ml-2">
                  {shift.client.first_name} {shift.client.last_name}
                </span>
              </div>

              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">Address:</span>
                <span className="ml-2">
                  {shift.client.address}, {shift.client.city}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <span className="font-medium">Date:</span>
                <span className="ml-2">{formatDate(shift.scheduled_date)}</span>
              </div>

              <div className="flex items-center text-sm">
                <span className="font-medium">Service:</span>
                <span className="ml-2">{shift.service_type}</span>
              </div>

              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">Phone:</span>
                <Link href={`tel:${shift.client.phone}`} className="ml-2 text-blue-600 hover:underline">
                  {shift.client.phone}
                </Link>
              </div>
            </div>
          </div>

          {shift.notes && (
            <div className="pt-4 border-t">
              <h4 className="font-medium text-sm mb-2">Shift Notes:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{shift.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Location Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Location Verification
          </CardTitle>
          <CardDescription>Your current location for shift verification</CardDescription>
        </CardHeader>
        <CardContent>
          {locationError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{locationError}</AlertDescription>
            </Alert>
          ) : location ? (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Location verified successfully</AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <Navigation className="h-4 w-4" />
              <AlertDescription>Getting your location...</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Notes Section */}
      {(isCheckIn || isCheckOut) && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
            <CardDescription>
              {isCheckIn
                ? "Add any notes about your arrival or initial observations"
                : "Add notes about the completed shift"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  isCheckIn
                    ? "e.g., Client was ready, all supplies available..."
                    : "e.g., All tasks completed, client in good spirits..."
                }
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {(isCheckIn || isCheckOut) && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-4">
              {isCheckIn && (
                <Button onClick={handleCheckIn} disabled={processing || !location} className="w-full" size="lg">
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Checking In...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Check In to Shift
                    </>
                  )}
                </Button>
              )}

              {isCheckOut && (
                <Button onClick={handleCheckOut} disabled={processing || !location} className="w-full" size="lg">
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Checking Out...
                    </>
                  ) : (
                    <>
                      <Navigation className="h-5 w-5 mr-2" />
                      Complete Shift & Check Out
                    </>
                  )}
                </Button>
              )}

              <Button variant="outline" onClick={() => router.push("/caregiver/dashboard")} className="w-full">
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Shift Info */}
      {shift.status === "completed" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <CheckCircle className="h-5 w-5 mr-2" />
              Shift Completed
            </CardTitle>
            <CardDescription>This shift has been successfully completed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {shift.check_in_time && (
              <div className="flex items-center text-sm">
                <span className="font-medium">Checked In:</span>
                <span className="ml-2">
                  {new Date(shift.check_in_time).toLocaleString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}

            {shift.check_out_time && (
              <div className="flex items-center text-sm">
                <span className="font-medium">Checked Out:</span>
                <span className="ml-2">
                  {new Date(shift.check_out_time).toLocaleString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}

            <Button variant="outline" onClick={() => router.push("/caregiver/dashboard")} className="w-full">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
