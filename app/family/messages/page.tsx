"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MessageSquare, Search, Filter, ArrowLeft, Plus, Clock, User, AlertCircle, CheckCircle, Reply } from 'lucide-react'
import Link from "next/link"
import { format, parseISO } from "date-fns"

interface CareMessage {
  id: string
  client_id: string
  sender_type: string
  sender_name: string
  recipient_type: string
  subject: string
  message: string
  priority: string
  status: string
  reply_to_id?: string
  created_at: string
  read_at?: string
}

interface Client {
  id: string
  first_name: string
  last_name: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<CareMessage[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [selectedMessage, setSelectedMessage] = useState<CareMessage | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
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
        .select("id")
        .eq("auth_user_id", session.user.id)
        .single()

      if (!familyData) {
        setError("Unable to load family member information")
        return
      }

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

      if (clientList.length > 0) {
        const clientIds = clientList.map((client: Client) => client.id)

        // Get messages for all linked clients
        const { data: messageData, error: messageError } = await supabase
          .from("care_messages")
          .select("*")
          .in("client_id", clientIds)
          .order("created_at", { ascending: false })

        if (messageError) {
          setError("Unable to load messages")
          return
        }

        setMessages(messageData || [])
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error("Messages error:", err)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (messageId: string) => {
    try {
      await supabase
        .from("care_messages")
        .update({ status: "read", read_at: new Date().toISOString() })
        .eq("id", messageId)

      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, status: "read", read_at: new Date().toISOString() } : msg))
      )
    } catch (err) {
      console.error("Error marking message as read:", err)
    }
  }

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender_name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || message.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "normal":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSenderIcon = (senderType: string) => {
    switch (senderType) {
      case "caregiver":
        return <User className="h-4 w-4" />
      case "admin":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
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
                <Link href="/family/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
                <p className="text-sm text-gray-600">Communication with your care team</p>
              </div>
            </div>
            <Button asChild>
              <Link href="/family/messages/new">
                <Plus className="h-4 w-4 mr-2" />
                New Message
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Message List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Messages</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="all">All Messages</option>
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                    </select>
                  </div>
                </div>
                <CardDescription>
                  {filteredMessages.length} message{filteredMessages.length !== 1 ? "s" : ""} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No messages found.</p>
                    <Button className="mt-4" asChild>
                      <Link href="/family/messages/new">Send your first message</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedMessage?.id === message.id
                            ? "border-blue-500 bg-blue-50"
                            : message.status === "unread"
                            ? "bg-blue-50 border-blue-200"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          setSelectedMessage(message)
                          if (message.status === "unread") {
                            markAsRead(message.id)
                          }
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {getSenderIcon(message.sender_type)}
                              <span className="font-medium text-sm">{message.sender_name}</span>
                              <Badge className={getPriorityColor(message.priority)} variant="outline">
                                {message.priority}
                              </Badge>
                              {message.status === "unread" && (
                                <Badge variant="default" className="bg-blue-600">
                                  New
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">{message.subject}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-2">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{format(parseISO(message.created_at), "MMM d, yyyy 'at' h:mm a")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Message Detail */}
          <div>
            {selectedMessage ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Message Details</CardTitle>
                    <Button variant="outline" size="sm">
                      <Reply className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        {getSenderIcon(selectedMessage.sender_type)}
                        <span className="font-medium">{selectedMessage.sender_name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(selectedMessage.priority)} variant="outline">
                          {selectedMessage.priority}
                        </Badge>
                        <Badge variant={selectedMessage.status === "unread" ? "default" : "secondary"}>
                          {selectedMessage.status}
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold text-lg mb-2">{selectedMessage.subject}</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      <p>Sent: {format(parseISO(selectedMessage.created_at), "MMMM d, yyyy 'at' h:mm a")}</p>
                      {selectedMessage.read_at && (
                        <p>Read: {format(parseISO(selectedMessage.read_at), "MMMM d, yyyy 'at' h:mm a")}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Select a message to view details</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
