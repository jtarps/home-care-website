import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CheckCircle, Clock, Users, Award, UserCheck } from "lucide-react"

export default function PersonalSupportPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-red-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <UserCheck className="h-20 w-20 text-red-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Personal Support Worker (PSW) Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compassionate personal care and daily living assistance to help you maintain independence and dignity in
              your own home.
            </p>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">What Our PSWs Provide</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Personal Care</h3>
                    <p className="text-gray-600">Bathing, grooming, dressing, and toileting assistance</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Meal Support</h3>
                    <p className="text-gray-600">Meal planning, preparation, and feeding assistance</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Mobility Assistance</h3>
                    <p className="text-gray-600">Help with walking, transfers, and positioning</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Companionship</h3>
                    <p className="text-gray-600">Social interaction, conversation, and emotional support</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Light Housekeeping</h3>
                    <p className="text-gray-600">Cleaning, laundry, and maintaining a safe environment</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Why Choose Our PSW Services?</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Award className="h-6 w-6 text-blue-500 mr-3" />
                  <span>Certified and experienced PSWs</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-green-500 mr-3" />
                  <span>Flexible scheduling options</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-purple-500 mr-3" />
                  <span>Personalized care plans</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-6 w-6 text-red-500 mr-3" />
                  <span>Compassionate, respectful care</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Levels */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">PSW Service Levels</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Companion Care</CardTitle>
                <CardDescription>Light assistance and companionship</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Social interaction and conversation</li>
                  <li>• Light meal preparation</li>
                  <li>• Medication reminders</li>
                  <li>• Transportation assistance</li>
                  <li>• Light housekeeping</li>
                </ul>
                <div className="mt-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">$25-30/hr</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle>Personal Care</CardTitle>
                <CardDescription>Comprehensive daily living support</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• All companion care services</li>
                  <li>• Personal hygiene assistance</li>
                  <li>• Dressing and grooming</li>
                  <li>• Mobility assistance</li>
                  <li>• Toileting support</li>
                </ul>
                <div className="mt-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">$35-40/hr</p>
                  <span className="text-sm text-green-600 font-medium">Most Popular</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Specialized Care</CardTitle>
                <CardDescription>Advanced support for complex needs</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• All personal care services</li>
                  <li>• Dementia care support</li>
                  <li>• Complex mobility assistance</li>
                  <li>• Specialized equipment use</li>
                  <li>• 24/7 care options</li>
                </ul>
                <div className="mt-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">$45-55/hr</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us today for a free consultation to discuss your PSW care needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Request Care
            </Button>
            <Button variant="outline" size="lg">
              Call (416) 555-2273
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
