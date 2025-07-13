"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Heart, Phone, Clock } from "lucide-react"

interface BookingWidgetProps {
  className?: string
}

export default function BookingWidget({ className = "" }: BookingWidgetProps) {
  const [formData, setFormData] = useState({
    service: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    preferredDate: "",
    preferredTime: "",
    careNeeded: "",
    additionalInfo: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className={`w-full max-w-md ${className}`}>
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Request Submitted!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your interest in our home care services. We'll contact you within 24 hours to discuss your
            needs and schedule a consultation.
          </p>
          <Badge variant="secondary" className="mb-4">
            Reference: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </Badge>
          <Button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                service: "",
                name: "",
                phone: "",
                email: "",
                address: "",
                preferredDate: "",
                preferredTime: "",
                careNeeded: "",
                additionalInfo: "",
              })
            }}
            variant="outline"
            className="w-full"
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <CardHeader className="bg-blue-50">
        <CardTitle className="flex items-center text-blue-900">
          <Calendar className="h-5 w-5 mr-2" />
          Request Care
        </CardTitle>
        <p className="text-sm text-blue-700">Get started with a free consultation</p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="service">Service Needed</Label>
            <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal-support">Personal Support</SelectItem>
                <SelectItem value="in-home-nursing">In-Home Nursing</SelectItem>
                <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
                <SelectItem value="specialty-chronic">Specialty & Chronic Care</SelectItem>
                <SelectItem value="consultation">General Consultation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(416) 555-0123"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Toronto, ON"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="date">Preferred Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <Label htmlFor="time">Preferred Time</Label>
              <Select
                value={formData.preferredTime}
                onValueChange={(value) => handleInputChange("preferredTime", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (9AM-12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM-5PM)</SelectItem>
                  <SelectItem value="evening">Evening (5PM-8PM)</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="careNeeded">Who needs care?</Label>
            <Select value={formData.careNeeded} onValueChange={(value) => handleInputChange("careNeeded", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select who needs care" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="myself">Myself</SelectItem>
                <SelectItem value="spouse">My spouse/partner</SelectItem>
                <SelectItem value="parent">My parent</SelectItem>
                <SelectItem value="child">My child</SelectItem>
                <SelectItem value="other">Someone else</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
              placeholder="Tell us about specific care needs, medical conditions, or any questions you have..."
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Request Care"}
          </Button>

          <div className="text-center pt-2">
            <p className="text-xs text-gray-500 mb-2">
              By submitting this form, you agree to be contacted by our care team.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>(416) 555-2273</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
