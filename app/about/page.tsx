import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Award, Shield, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Toronto Home Care</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're dedicated to providing compassionate, professional home care services that allow individuals to
              maintain their independence and dignity in the comfort of their own homes.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2015 by registered nurse Sarah Johnson and Dr. Michael Chen, Toronto Home Care was born
                  from a simple belief: everyone deserves to receive quality healthcare in the comfort and familiarity
                  of their own home.
                </p>
                <p>
                  After witnessing the challenges faced by patients and families navigating the healthcare system, our
                  founders recognized the need for a more personalized, compassionate approach to care. They envisioned
                  a service that would bridge the gap between hospital care and independent living.
                </p>
                <p>
                  Today, we're proud to serve hundreds of families across Toronto and the GTA, providing everything from
                  personal support and nursing care to specialized rehabilitation services. Our team has grown, but our
                  commitment to exceptional, individualized care remains unchanged.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600">Families Served</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600">8</div>
                  <div className="text-gray-600">Years of Service</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600">50+</div>
                  <div className="text-gray-600">Care Professionals</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600">24/7</div>
                  <div className="text-gray-600">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Heart className="h-8 w-8 text-red-500 mr-3" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg">
                  To provide exceptional, compassionate home care services that enhance the quality of life for our
                  clients while supporting their families. We strive to make healthcare accessible, personal, and
                  dignified for everyone we serve.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Users className="h-8 w-8 text-blue-500 mr-3" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg">
                  To be Toronto's most trusted home care provider, known for our clinical excellence, innovative
                  approach, and unwavering commitment to client satisfaction. We envision a future where quality
                  healthcare is accessible to all in their own homes.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compassion</h3>
              <p className="text-gray-600">We treat every client with empathy, kindness, and respect.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">We maintain the highest standards in all aspects of our care.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Integrity</h3>
              <p className="text-gray-600">We operate with honesty, transparency, and ethical practices.</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Collaboration</h3>
              <p className="text-gray-600">We work together with clients, families, and healthcare providers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Sets Us Apart</h2>
            <p className="text-xl text-gray-600">Why families choose Toronto Home Care</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Licensed & Accredited</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All our staff are fully licensed, bonded, and insured. We maintain accreditation with leading
                  healthcare organizations and undergo regular quality audits.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>24/7 Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our support team is available around the clock to address concerns, answer questions, and coordinate
                  care. Emergency support is always just a phone call away.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Personalized Care Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every client receives a customized care plan developed in collaboration with their healthcare team,
                  family members, and personal preferences.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Experienced Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our caregivers have extensive experience and receive ongoing training to stay current with best
                  practices and new developments in home care.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Quality Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We have robust quality assurance processes including regular client feedback, care plan reviews, and
                  continuous improvement initiatives.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="h-12 w-12 text-pink-600 mb-4" />
                <CardTitle>Family-Centered Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We recognize that care extends beyond the individual to include family members, and we work to support
                  the entire family unit.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Preview */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-gray-600">
              Our experienced leadership team brings decades of healthcare expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <CardTitle>Sarah Johnson, RN</CardTitle>
                <p className="text-blue-600">CEO & Co-Founder</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  15+ years of nursing experience with a passion for home-based care and patient advocacy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <CardTitle>Dr. Michael Chen</CardTitle>
                <p className="text-blue-600">Medical Director & Co-Founder</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Board-certified physician specializing in geriatric medicine and home care protocols.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/about/leadership">Meet Our Full Leadership Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience the Difference?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our services and how we can support you and your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/book">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
