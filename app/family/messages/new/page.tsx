"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Send, AlertCircle, CheckCircle } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Client {
  id: string
  first_name: string
  last_name: string
}

interface FamilyMember {
  id: string
  first_name: string
  last_name: string
}

export default function NewMessagePage() {
  const [familyMember, setFamilyMember] = useState<FamilyMember | null>(null)
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [priority, setPriority] = useState("normal")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        window.location.href = "/family/login"
        return
      }

      // Get family member info
      const { data: familyData } = await supabase
        .from("family_members")
        .select("*")
        .eq("auth_user_id", session.user.id)
        .single()

      if (!familyData) {
        setError("Unable to load family member information")
        return
      }

      setFamilyMember(familyData)

      // Get linked clients
      const { data: clientRelations } = await supabase
        .from("family_client_relationships")
        .select(`
          client_id,
          clients (id, first_name, last_name)
        `)
        .eq("family_member_id", familyData.id)

      const clientList = clientRelations?.map((rel: any) => rel.clients) || []
      setClients(clientList)

      // Auto-select client if only one
      if (clientList.length === 1) {
        setSelectedClient(clientList[0].id)
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("New message error:", err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!selectedClient || !subject.trim() || !message.trim()) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    try {
      const { error: insertError } = await supabase.from("care_messages").insert({
        client_id: selectedClient,
        sender_type: "family",
        sender_id: familyMember?.id,
        sender_name: `${familyMember?.first_name} ${familyMember?.last_name}`,
        recipient_type: "care_team",
        subject: subject.trim(),
        message: message.trim(),
        priority,
        status: "unread",
      })

      if (insertError) {
        setError("Failed to send message. Please try again.")
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/family/messages")
      }, 2000)
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("Send message error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h2>
            <p className="text-gray-600 mb-4">Your message has been sent to the care team. They will respond soon.</p>
            <Button asChild>
              <Link href="/family/messages">View Messages</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/family/messages">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Messages
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">New Message</h1>
                <p className="text-sm text-gray-600">Send a message to your care team</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Send Message to Care Team</CardTitle>
            <CardDescription>
              Use this form to ask questions, request updates, or share important information about your loved one's
              care.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Client Selection */}
              <div className="space-y-2">
                <Label htmlFor="client" className="text-base font-medium">
                  Regarding <span className="text-red-500">*</span>
                </Label>
                <Select value={selectedClient} onValueChange={setSelectedClient} disabled={clients.length <= 1}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select the family member this message is about" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.first_name} {client.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {clients.length === 0 && (
                  <p className="text-sm text-gray-600">No linked family members found. Please contact support.</p>
                )}
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-base font-medium">
                  Priority
                </Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - General question or information</SelectItem>
                    <SelectItem value="normal">Normal - Standard inquiry</SelectItem>
                    <SelectItem value="high">High - Important concern</SelectItem>
                    <SelectItem value="urgent">Urgent - Immediate attention needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-base font-medium">
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief description of your message"
                  className="h-12 text-base"
                  maxLength={200}
                  required
                />
                <p className="text-sm text-gray-500">{subject.length}/200 characters</p>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-base font-medium">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please provide details about your question, concern, or request..."
                  className="min-h-32 text-base resize-none"
                  maxLength={1000}
                  required
                />
                <p className="text-sm text-gray-500">{message.length}/1000 characters</p>
              </div>

              {/* Common Topics */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Common Topics:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <button
                    type="button"
                    className="text-left text-blue-700 hover:text-blue-900 hover:underline"
                    onClick={() => setSubject("Question about medication schedule")}
                  >
                    • Medication questions
                  </button>
                  <button
                    type="button"
                    className="text-left text-blue-700 hover:text-blue-900 hover:underline"
                    onClick={() => setSubject("Schedule change request")}
                  >
                    • Schedule changes
                  </button>
                  <button
                    type="button"
                    className="text-left text-blue-700 hover:text-blue-900 hover:underline"
                    onClick={() => setSubject("Care plan update needed")}
                  >
                    • Care plan updates
                  </button>
                  <button
                    type="button"
                    className="text-left text-blue-700 hover:text-blue-900 hover:underline"
                    onClick={() => setSubject("Emergency contact information")}
                  >
                    • Emergency contacts
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/family/messages">Cancel</Link>
                </Button>
                <Button type="submit" disabled={loading || !selectedClient || !subject.trim() || !message.trim()}>
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Need Immediate Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Emergency</h3>
                <p className="text-sm text-gray-600 mb-3">For urgent medical situations</p>
                <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                  <Link href="tel:911">Call 911</Link>
                </Button>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Care Team</h3>
                <p className="text-sm text-gray-600 mb-3">24/7 support line</p>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="tel:+14165552273">Call (416) 555-2273</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
