"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Phone, Clock, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "agent"
  timestamp: Date
}

const autoResponses = [
  {
    keywords: ["hello", "hi", "hey"],
    response:
      "Hello! I'm here to help you with any questions about our home care services. How can I assist you today?",
  },
  {
    keywords: ["price", "cost", "pricing", "rate"],
    response:
      "Our services start at $35/hour for personal support workers. For detailed pricing information, I'd be happy to connect you with our care coordinator. Would you like me to schedule a free consultation?",
  },
  {
    keywords: ["services", "what do you offer", "help"],
    response:
      "We offer Personal Support Workers, In-Home Nursing, Rehabilitation Services, and Specialty & Chronic Care. Which service are you most interested in learning about?",
  },
  {
    keywords: ["availability", "hours", "24/7"],
    response:
      "We provide 24/7 support and can typically respond within 24 hours for new care requests. Emergency support is available when needed. Would you like to discuss your specific scheduling needs?",
  },
  {
    keywords: ["book", "schedule", "appointment"],
    response:
      "I'd be happy to help you request care! You can click 'Request Care' on our website or call us at (416) 555-2273. Would you prefer to speak with someone right away?",
  },
]

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Sarah from Toronto Home Care. How can I help you today?",
      sender: "agent",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAutoResponse = (userMessage: string): string | null => {
    const lowerMessage = userMessage.toLowerCase()

    for (const response of autoResponses) {
      if (response.keywords.some((keyword) => lowerMessage.includes(keyword))) {
        return response.response
      }
    }

    return "Thank you for your message! One of our care coordinators will respond shortly. For immediate assistance, please call us at (416) 555-2273."
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate agent typing and response
    setTimeout(() => {
      const autoResponse = getAutoResponse(inputValue)
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: autoResponse,
        sender: "agent",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, agentMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 left-6 w-80 h-96 shadow-2xl z-50 flex flex-col">
          <CardHeader className="bg-blue-600 text-white rounded-t-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-sm">Toronto Home Care</CardTitle>
                  <div className="flex items-center text-xs text-blue-100">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                    Online now
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-700 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-3 border-t bg-gray-50">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50 text-xs"
                  onClick={() => setInputValue("What services do you offer?")}
                >
                  Our Services
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50 text-xs"
                  onClick={() => setInputValue("What are your rates?")}
                >
                  Pricing
                </Badge>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50 text-xs"
                  onClick={() => setInputValue("How do I book care?")}
                >
                  Book Care
                </Badge>
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 text-sm"
                />
                <Button onClick={handleSendMessage} size="icon" className="bg-blue-600 hover:bg-blue-700 h-9 w-9">
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Typically responds in minutes
                </div>
                <Button variant="ghost" size="sm" className="text-xs h-6 px-2" asChild>
                  <a href="tel:+14165552273">
                    <Phone className="h-3 w-3 mr-1" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
