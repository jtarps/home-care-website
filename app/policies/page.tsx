import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, FileText, Lock, CheckCircle } from "lucide-react"

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="h-16 w-16 text-blue-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Policies & Compliance</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to privacy, security, and regulatory compliance ensures the highest standards of care and
              protection for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Navigation */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <Lock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <CardTitle>Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">How we collect, use, and protect your personal information</p>
              </CardContent>
            </Card>
            <Card className="text-center cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <CardTitle>Terms of Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Terms and conditions for using our home care services</p>
              </CardContent>
            </Card>
            <Card className="text-center cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <CardTitle>Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Our regulatory compliance and quality standards</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy Policy */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Lock className="h-6 w-6 mr-3 text-blue-500" />
                Privacy Policy
              </CardTitle>
              <CardDescription>Last updated: January 1, 2024</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3 className="text-xl font-semibold mb-4">Information We Collect</h3>
              <p className="mb-4">We collect information necessary to provide quality home care services, including:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Personal identification information (name, address, phone number, email)</li>
                <li>Health information and medical history</li>
                <li>Emergency contact information</li>
                <li>Insurance and billing information</li>
                <li>Care preferences and service requirements</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">How We Use Your Information</h3>
              <p className="mb-4">Your information is used exclusively for:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Providing personalized home care services</li>
                <li>Care planning and coordination</li>
                <li>Communication with you and your healthcare providers</li>
                <li>Billing and insurance processing</li>
                <li>Quality assurance and service improvement</li>
                <li>Compliance with healthcare regulations</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Information Sharing</h3>
              <p className="mb-4">
                We do not sell, trade, or rent your personal information. We may share information only:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>With your healthcare providers as necessary for care coordination</li>
                <li>With insurance companies for billing purposes</li>
                <li>With family members as authorized by you</li>
                <li>When required by law or regulation</li>
                <li>In emergency situations to protect your health and safety</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Data Security</h3>
              <p className="mb-4">We implement comprehensive security measures including:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Encrypted data storage and transmission</li>
                <li>Secure access controls and authentication</li>
                <li>Regular security audits and updates</li>
                <li>Staff training on privacy and security protocols</li>
                <li>Compliance with healthcare data protection standards</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Your Rights</h3>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Access your personal information</li>
                <li>Request corrections to inaccurate information</li>
                <li>Limit how your information is used or shared</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>File a complaint about our privacy practices</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="mb-4">For privacy-related questions or concerns, contact our Privacy Officer:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Email:</strong> privacy@torontohomecare.ca
                </p>
                <p>
                  <strong>Phone:</strong> (416) 123-4567 ext. 300
                </p>
                <p>
                  <strong>Mail:</strong> Privacy Officer, Toronto Home Care, 123 Main Street, Suite 200, Toronto, ON M5V
                  3A8
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Terms of Service */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <FileText className="h-6 w-6 mr-3 text-green-500" />
                Terms of Service
              </CardTitle>
              <CardDescription>Last updated: January 1, 2024</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3 className="text-xl font-semibold mb-4">Service Agreement</h3>
              <p className="mb-4">
                By engaging our home care services, you agree to these terms and conditions. Our services are provided
                subject to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Completion of initial assessment and care planning</li>
                <li>Acceptance of our care policies and procedures</li>
                <li>Agreement to payment terms and conditions</li>
                <li>Compliance with safety and access requirements</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Client Responsibilities</h3>
              <p className="mb-4">Clients and families are responsible for:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Providing accurate health and contact information</li>
                <li>Maintaining a safe home environment for caregivers</li>
                <li>Timely payment for services rendered</li>
                <li>Communicating changes in care needs or preferences</li>
                <li>Treating caregivers with respect and courtesy</li>
                <li>Providing reasonable notice for service changes or cancellations</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Service Delivery</h3>
              <p className="mb-4">We commit to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Providing qualified, trained caregivers</li>
                <li>Delivering services according to the agreed care plan</li>
                <li>Maintaining professional standards and ethics</li>
                <li>Ensuring continuity of care whenever possible</li>
                <li>Responding promptly to concerns or emergencies</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Payment Terms</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Payment is due according to agreed billing schedule</li>
                <li>Late payment fees may apply after 30 days</li>
                <li>Insurance claims will be processed promptly</li>
                <li>Clients are responsible for non-covered services</li>
                <li>Payment plans are available upon request</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Cancellation Policy</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>24-hour notice required for routine service cancellations</li>
                <li>Emergency cancellations accepted without penalty</li>
                <li>Services may be terminated for non-payment or safety concerns</li>
                <li>Either party may terminate services with 7 days written notice</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Limitation of Liability</h3>
              <p className="mb-4">
                Our liability is limited to the cost of services provided. We maintain comprehensive insurance coverage
                and follow all applicable regulations.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <CheckCircle className="h-6 w-6 mr-3 text-purple-500" />
                Regulatory Compliance
              </CardTitle>
              <CardDescription>Our commitment to meeting all regulatory standards</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h3 className="text-xl font-semibold mb-4">Healthcare Regulations</h3>
              <p className="mb-4">Toronto Home Care operates in full compliance with:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Ontario Personal Health Information Protection Act (PHIPA)</li>
                <li>Regulated Health Professions Act (RHPA)</li>
                <li>Home Care and Community Services Act</li>
                <li>Occupational Health and Safety Act</li>
                <li>Human Rights Code</li>
                <li>Employment Standards Act</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Professional Standards</h3>
              <p className="mb-4">All our healthcare professionals maintain:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Current professional licenses and certifications</li>
                <li>Continuing education requirements</li>
                <li>Professional liability insurance</li>
                <li>Criminal background checks</li>
                <li>Regular competency assessments</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Quality Assurance</h3>
              <p className="mb-4">Our quality program includes:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Regular client satisfaction surveys</li>
                <li>Clinical supervision and monitoring</li>
                <li>Incident reporting and investigation</li>
                <li>Continuous improvement initiatives</li>
                <li>External quality audits</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Accreditation</h3>
              <p className="mb-4">We maintain accreditation from:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Accreditation Canada</li>
                <li>Ontario Association of Non-Profit Homes and Services for Seniors</li>
                <li>Better Business Bureau</li>
                <li>Canadian Home Care Association</li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Reporting and Transparency</h3>
              <p className="mb-4">We are committed to transparency through:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Annual quality reports</li>
                <li>Public disclosure of outcomes</li>
                <li>Open communication with regulatory bodies</li>
                <li>Client and family feedback mechanisms</li>
                <li>Community engagement and education</li>
              </ul>

              <div className="bg-blue-50 p-6 rounded-lg mt-8">
                <h4 className="font-semibold mb-2">Questions About Our Policies?</h4>
                <p className="text-gray-600">
                  Contact our Compliance Officer at compliance@torontohomecare.ca or (416) 123-4567 ext. 400 for any
                  questions about our policies or regulatory compliance.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
