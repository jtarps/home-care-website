import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Heart,
  Shield,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Phone,
  Stethoscope,
  Activity,
  UserCheck,
} from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Home Care Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive, professional healthcare services delivered in the comfort of your home. Our certified
              caregivers provide personalized care tailored to your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/book">Request Care</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="tel:+14165552273">
                  <Phone className="h-5 w-5 mr-2" />
                  Call (416) 555-2273
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Care Level</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From basic personal support to specialized medical care, we offer comprehensive services to meet every
              need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Personal Support */}
            <Card className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <div className="flex items-center space-x-3">
                  <UserCheck className="h-8 w-8" />
                  <div>
                    <CardTitle className="text-2xl">Personal Support</CardTitle>
                    <p className="text-blue-100">Daily living assistance and companionship</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">Starting at $35/hour</span>
                    <Badge className="bg-green-100 text-green-800">Most Popular</Badge>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Personal hygiene and grooming
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Meal preparation and feeding
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Light housekeeping and laundry
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Companionship and social activities
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Medication reminders
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <Link href="/services/personal-support">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* In-Home Nursing */}
            <Card className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                <div className="flex items-center space-x-3">
                  <Stethoscope className="h-8 w-8" />
                  <div>
                    <CardTitle className="text-2xl">In-Home Nursing</CardTitle>
                    <p className="text-red-100">Professional medical care at home</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">Starting at $65/hour</span>
                    <Badge className="bg-red-100 text-red-800">Medical Care</Badge>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Medication administration
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Wound care and dressing changes
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Vital signs monitoring
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Chronic disease management
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Post-surgical care
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                    <Link href="/services/in-home-nursing">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Rehabilitation */}
            <Card className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <div className="flex items-center space-x-3">
                  <Activity className="h-8 w-8" />
                  <div>
                    <CardTitle className="text-2xl">Rehabilitation</CardTitle>
                    <p className="text-green-100">Recovery and mobility improvement</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">Starting at $85/session</span>
                    <Badge className="bg-green-100 text-green-800">Therapy</Badge>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Physiotherapy and mobility training
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Occupational therapy
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Speech and language therapy
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Pain management techniques
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Fall prevention strategies
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <Link href="/services/rehabilitation">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Specialty & Chronic Care */}
            <Card className="relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <div className="flex items-center space-x-3">
                  <Heart className="h-8 w-8" />
                  <div>
                    <CardTitle className="text-2xl">Specialty & Chronic Care</CardTitle>
                    <p className="text-purple-100">Specialized care for complex conditions</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">Customized Pricing</span>
                    <Badge className="bg-purple-100 text-purple-800">Specialized</Badge>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Alzheimer's and dementia care
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      ALS and Parkinson's support
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Cancer support and recovery
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      End-of-life and palliative care
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Diabetes and heart disease management
                    </li>
                  </ul>
                  <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                    <Link href="/services/specialty-chronic-care">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Services?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every service we provide is backed by our commitment to excellence and compassionate care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Licensed & Insured</h3>
              <p className="text-gray-600">
                All caregivers are fully licensed, bonded, and insured for your protection.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock availability and emergency response when needed.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Care</h3>
              <p className="text-gray-600">Custom care plans tailored to your specific needs and preferences.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compassionate Care</h3>
              <p className="text-gray-600">We treat every client with dignity, respect, and genuine compassion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Comparison Table */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Compare Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the right level of care for your specific needs and budget.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Service Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Personal Support</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">In-Home Nursing</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Rehabilitation</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Specialty Care</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Personal Care Assistance</td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">Medication Management</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-600">Reminders Only</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Medical Procedures</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">Therapy Services</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Specialized Disease Care</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-600">Basic</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-400">—</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to common questions about our home care services.</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">
                What's the difference between Personal Support and In-Home Nursing?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Personal Support Workers (PSWs) provide assistance with daily living activities like bathing, dressing,
                meal preparation, and companionship. In-Home Nursing involves licensed nurses who can administer
                medications, perform medical procedures, wound care, and manage complex health conditions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">How quickly can you start providing care?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We can typically begin Personal Support services within 24-48 hours of your initial consultation.
                Specialized services like nursing or rehabilitation may take 2-5 days to arrange, depending on your
                specific needs and caregiver availability.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">Do you accept insurance coverage?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, we work with most private insurance plans, OHIP for eligible services, and can help you navigate
                government funding programs like the Home and Community Care Support Services. We'll help determine what
                coverage you're eligible for during your consultation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">Can I choose my caregiver?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We believe in finding the right match between clients and caregivers. We'll introduce you to potential
                caregivers and you can choose who you're most comfortable with. If you're not satisfied, we'll find a
                replacement at no additional cost.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">What areas do you serve in Toronto?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We provide services throughout the Greater Toronto Area (GTA), including Toronto, North York,
                Scarborough, Etobicoke, Mississauga, Brampton, Markham, Richmond Hill, and surrounding communities.
                Contact us to confirm service availability in your specific area.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left">What if I need care outside regular hours?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We offer 24/7 care services including overnight care, weekend care, and holiday coverage. Our emergency
                response team is available around the clock for urgent situations. Additional rates may apply for
                after-hours and holiday services.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/book">Request Care</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <a href="tel:+14165552273">
                <Phone className="h-5 w-5 mr-2" />
                Call (416) 555-2273
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
