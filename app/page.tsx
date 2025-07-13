"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import TextRotator from "@/components/text-rotator"
import LiveChat from "@/components/live-chat"
import { Heart, Shield, Clock, Users, Star, Phone, CheckCircle, ArrowRight, Home } from "lucide-react"

export default function HomePage() {
  const [selectedService, setSelectedService] = useState("personal-support")
  const [careNeeded, setCareNeeded] = useState("")

  const serviceContent = {
    "personal-support": {
      title: "Personal Support Workers (PSW)",
      description:
        "Our certified Personal Support Workers provide compassionate assistance with daily living activities, helping you maintain independence and dignity in your own home.",
      leftColumn: {
        title: "Daily Living Support",
        items: [
          "Personal hygiene assistance",
          "Meal preparation & feeding",
          "Mobility assistance",
          "Medication reminders",
        ],
      },
      rightColumn: {
        title: "Household Support",
        items: ["Light housekeeping", "Laundry assistance", "Companionship", "Transportation support"],
      },
      pricing: "Starting at $35/hour",
      availability: "Flexible scheduling available",
      responseTime: "< 24 hours",
      availabilityBadge: "24/7 Support",
      serviceArea: "Greater Toronto",
    },
    "in-home-nursing": {
      title: "In-Home Nursing Care",
      description:
        "Professional medical care delivered by registered nurses and licensed practical nurses in the comfort of your home.",
      leftColumn: {
        title: "Medical Care",
        items: ["Medication administration", "Wound care & dressing", "Vital signs monitoring", "Health assessments"],
      },
      rightColumn: {
        title: "Specialized Services",
        items: ["Chronic disease management", "Post-surgical care", "IV therapy", "Care coordination"],
      },
      pricing: "Starting at $65/hour",
      availability: "On-call nursing support",
      responseTime: "< 2 hours",
      availabilityBadge: "Emergency Response",
      serviceArea: "GTA & Surrounding",
    },
    rehabilitation: {
      title: "Rehabilitation Services",
      description:
        "Professional rehabilitation services delivered in your home to improve mobility, reduce pain, and enhance your quality of life.",
      leftColumn: {
        title: "Therapy Services",
        items: ["Physiotherapy", "Occupational therapy", "Speech therapy", "Mobility training"],
      },
      rightColumn: {
        title: "Recovery Support",
        items: ["Pain management", "Fall prevention", "Equipment training", "Progress monitoring"],
      },
      pricing: "Starting at $85/session",
      availability: "Flexible scheduling",
      responseTime: "< 48 hours",
      availabilityBadge: "Licensed Therapists",
      serviceArea: "Toronto Region",
    },
    "specialty-chronic": {
      title: "Specialty & Chronic Care",
      description:
        "Specialized care for complex medical conditions including Alzheimer's, dementia, ALS, Parkinson's, cancer support, and end-of-life care.",
      leftColumn: {
        title: "Memory Care",
        items: ["Alzheimer's support", "Dementia care", "Behavioral management", "Safety supervision"],
      },
      rightColumn: {
        title: "Chronic Conditions",
        items: ["ALS & Parkinson's care", "Cancer support", "End-of-life care", "Diabetes management"],
      },
      pricing: "Customized pricing",
      availability: "Specialized care teams",
      responseTime: "< 24 hours",
      availabilityBadge: "Specialist Care",
      serviceArea: "Greater Toronto",
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-3 mb-2">
                    <TextRotator />
                    <span>care.</span>
                  </div>
                  <span className="block">At home.</span>
                </div>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional, personalized home healthcare services in Toronto. Our certified caregivers provide the
                support you need to maintain independence and dignity at home.
              </p>

              {/* Simple Booking Form */}
              <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-lg font-semibold mb-4">Get Started Today</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Who needs care?</label>
                    <Select value={careNeeded} onValueChange={setCareNeeded}>
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
                  <Link href="/book" className="block">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 rounded-md">
                      Request Care
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Licensed & Insured
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  24/7 Support
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Flexible Scheduling
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-blue-100 rounded-full p-8 flex items-center justify-center">
                <div className="text-center">
                  <Heart className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                  <Home className="h-16 w-16 text-blue-500 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Toronto Home Care?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing exceptional care that helps you or your loved ones live comfortably and
              safely at home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Licensed & Certified</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All our caregivers are fully licensed, certified, and undergo comprehensive background checks.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <CardTitle>Compassionate Care</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We treat every client with dignity, respect, and the compassion they deserve.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle>24/7 Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Round-the-clock support and emergency response when you need it most.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <CardTitle>Personalized Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Customized care plans tailored to your specific needs and preferences.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Services Section - Matching v24 Design */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive home healthcare services designed to support your independence and well-being.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              {/* Service Pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Button
                  variant={selectedService === "personal-support" ? "default" : "outline"}
                  onClick={() => setSelectedService("personal-support")}
                  className={`rounded-full px-6 py-2 font-medium transition-all ${
                    selectedService === "personal-support"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Personal Support
                </Button>
                <Button
                  variant={selectedService === "in-home-nursing" ? "default" : "outline"}
                  onClick={() => setSelectedService("in-home-nursing")}
                  className={`rounded-full px-6 py-2 font-medium transition-all ${
                    selectedService === "in-home-nursing"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  In-Home Nursing
                </Button>
                <Button
                  variant={selectedService === "rehabilitation" ? "default" : "outline"}
                  onClick={() => setSelectedService("rehabilitation")}
                  className={`rounded-full px-6 py-2 font-medium transition-all ${
                    selectedService === "rehabilitation"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Rehabilitation
                </Button>
                <Button
                  variant={selectedService === "specialty-chronic" ? "default" : "outline"}
                  onClick={() => setSelectedService("specialty-chronic")}
                  className={`rounded-full px-6 py-2 font-medium transition-all ${
                    selectedService === "specialty-chronic"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Specialty & Chronic Care
                </Button>
              </div>

              {/* Service Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {serviceContent[selectedService as keyof typeof serviceContent].title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {serviceContent[selectedService as keyof typeof serviceContent].description}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">
                      {serviceContent[selectedService as keyof typeof serviceContent].leftColumn.title}
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      {serviceContent[selectedService as keyof typeof serviceContent].leftColumn.items.map(
                        (item, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">
                      {serviceContent[selectedService as keyof typeof serviceContent].rightColumn.title}
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      {serviceContent[selectedService as keyof typeof serviceContent].rightColumn.items.map(
                        (item, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {serviceContent[selectedService as keyof typeof serviceContent].pricing}
                    </p>
                    <p className="text-gray-600">
                      {serviceContent[selectedService as keyof typeof serviceContent].availability}
                    </p>
                  </div>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/book">
                      Request Care
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Service Details Card */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-gray-600">Care Video Preview</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {serviceContent[selectedService as keyof typeof serviceContent].responseTime}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Availability</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {serviceContent[selectedService as keyof typeof serviceContent].availabilityBadge}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Service Areas</span>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      {serviceContent[selectedService as keyof typeof serviceContent].serviceArea}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Families Say</h2>
            <p className="text-xl text-gray-600">Real stories from families we've had the privilege to serve</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The care my mother receives is exceptional. The PSW is not only professional but genuinely cares
                  about her wellbeing. It gives our family such peace of mind."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Sarah M.</p>
                    <p className="text-sm text-gray-600">Daughter of client</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "After my surgery, the nursing care I received at home was outstanding. The nurses were knowledgeable,
                  caring, and helped me recover much faster than expected."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Robert K.</p>
                    <p className="text-sm text-gray-600">Client</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The physiotherapy sessions at home have been life-changing. I've regained my mobility and confidence.
                  The therapist is skilled and encouraging."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Maria L.</p>
                    <p className="text-sm text-gray-600">Client</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Contact us today for a free consultation and let us create a personalized care plan for you or your loved
            one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="inline-block">
              <div className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                Request Care
              </div>
            </Link>
            <a href="tel:+14165552273" className="inline-block">
              <div className="border-2 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 cursor-pointer flex items-center justify-center">
                <Phone className="h-5 w-5 mr-2" />
                Call (416) 555-2273
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Live Chat Component */}
      <LiveChat />
    </div>
  )
}
