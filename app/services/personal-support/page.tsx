import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Heart,
  CheckCircle,
  Clock,
  Users,
  Award,
  UserCheck,
  ArrowRight,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function PersonalSupportPage() {
  return (
    <div className="min-h-screen bg-brand-body">
      {/* Header */}
      <section className="bg-brand-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <UserCheck className="h-20 w-20 text-brand-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-6">
              Personal Support Services
            </h1>
            <p className="text-xl text-brand-textSecondary max-w-3xl mx-auto">
              Compassionate personal care and daily living assistance to help
              you maintain independence and dignity in your own home.
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
                    <p className="text-gray-600">
                      Bathing, grooming, dressing, and toileting assistance
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Meal Support</h3>
                    <p className="text-gray-600">
                      Meal planning, preparation, and feeding assistance
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Mobility Assistance</h3>
                    <p className="text-gray-600">
                      Help with walking, transfers, and positioning
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Companionship</h3>
                    <p className="text-gray-600">
                      Social interaction, conversation, and emotional support
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Light Housekeeping</h3>
                    <p className="text-gray-600">
                      Cleaning, laundry, and maintaining a safe environment
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">
                Why Choose Our PSW Services?
              </h3>
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
          <h2 className="text-3xl font-bold text-center mb-12">
            PSW Service Levels
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Companion Care</CardTitle>
                <CardDescription>
                  Light assistance and companionship
                </CardDescription>
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
                  <p className="text-sm text-brand-textSecondary">
                    Light assistance and companionship
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle>Personal Care</CardTitle>
                <CardDescription>
                  Comprehensive daily living support
                </CardDescription>
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
                  <span className="text-sm text-brand-secondary font-medium">
                    Most Popular
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Specialized Care</CardTitle>
                <CardDescription>
                  Advanced support for complex needs
                </CardDescription>
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
                  <p className="text-sm text-brand-textSecondary">
                    Advanced support for complex needs
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-b from-brand-background to-brand-primary">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          {/* Centered CTA Card */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white shadow-2xl border-0">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-brand-textSecondary mb-10 max-w-3xl mx-auto">
                  Contact us today for a free consultation to discuss your
                  personal support care needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Link href="/book" className="inline-block">
                    <div className="bg-brand-primary text-white hover:bg-brand-primary/90 font-bold py-5 px-12 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-200 cursor-pointer flex items-center justify-center text-lg md:text-xl gap-2">
                      Request Your Care Plan
                      <span className="inline-block animate-bounce ml-2">
                        <ArrowRight className="h-6 w-6" />
                      </span>
                    </div>
                  </Link>
                  <a href="tel:+14165552273" className="inline-block">
                    <div className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white bg-transparent font-bold py-5 px-12 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-200 cursor-pointer flex items-center justify-center text-lg md:text-xl">
                      <Phone className="h-6 w-6 mr-2" />
                      Call (416) 555-2273
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gradient Footer Section */}
      <section className="bg-gradient-to-b from-brand-primary via-brand-primary/95 to-brand-primary/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Haven at Home</h3>
              <p className="text-white/80">
                Providing compassionate, professional home care services
                throughout Toronto and the GTA.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-white/60 hover:text-white cursor-pointer" />
                <Twitter className="h-5 w-5 text-white/60 hover:text-white cursor-pointer" />
                <Instagram className="h-5 w-5 text-white/60 hover:text-white cursor-pointer" />
                <Linkedin className="h-5 w-5 text-white/60 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                Services
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/services/personal-support"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Personal Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/in-home-nursing"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    In-Home Nursing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/rehabilitation"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Rehabilitation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/specialty-chronic-care"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Specialty Care
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/caregivers"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Join Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partners"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Partner With Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/policies"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Policies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-white" />
                  <span className="text-white/80">(416) 555-2273</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-white" />
                  <a
                    href="mailto:info@havenathome.com"
                    className="text-white/80 hover:underline"
                  >
                    info@havenathome.com
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-white mt-1" />
                  <span className="text-white/80">
                    123 Main Street
                    <br />
                    Toronto, ON M5V 3A8
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/60">
              © 2024 Haven at Home. All rights reserved. |
              <Link href="/policies" className="hover:text-white ml-1">
                Privacy Policy
              </Link>{" "}
              |
              <Link href="/policies" className="hover:text-white ml-1">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
