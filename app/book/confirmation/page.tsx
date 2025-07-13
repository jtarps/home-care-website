"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, Phone, Mail, Home, Clock } from "lucide-react"
import Link from "next/link"

export default function ConfirmationPage() {
  const [bookingId] = useState(() => Math.random().toString(36).substr(2, 9).toUpperCase())

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Thank you for choosing our home care services</p>
        </div>

        {/* Confirmation Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>Your booking reference: #{bookingId}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Status</p>
                  <p className="text-sm text-gray-600">Pending Review</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Response Time</p>
                  <p className="text-sm text-gray-600">Within 24 hours</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What Happens Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Review & Assessment</h3>
                  <p className="text-sm text-gray-600">
                    Our care coordinator will review your request and may contact you for additional information.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Care Plan Development</h3>
                  <p className="text-sm text-gray-600">
                    We'll create a personalized care plan tailored to your specific needs.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Caregiver Matching</h3>
                  <p className="text-sm text-gray-600">
                    We'll match you with qualified caregivers who meet your requirements.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-medium">Care Begins</h3>
                  <p className="text-sm text-gray-600">
                    Your personalized care service will begin on your preferred start date.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Need Immediate Assistance?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Call Us</h3>
                <p className="text-sm text-gray-600">(416) 555-CARE</p>
              </div>
              <div className="text-center">
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Email Us</h3>
                <p className="text-sm text-gray-600">care@homecare.com</p>
              </div>
              <div className="text-center">
                <Home className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Visit Us</h3>
                <p className="text-sm text-gray-600">123 Care Street</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/services">View Our Services</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
