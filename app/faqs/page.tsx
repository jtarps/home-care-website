import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { HelpCircle, Search } from "lucide-react"

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="h-16 w-16 text-blue-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our home care services, processes, and policies.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input placeholder="Search FAQs..." className="pl-10 py-3 text-lg" />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Services */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-blue-600">Services & Care</h2>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>What types of home care services do you provide?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      We provide comprehensive home care services including Personal Support Worker (PSW) care,
                      registered nursing services, and physiotherapy. Our PSW services include personal care,
                      companionship, meal preparation, and light housekeeping. Our nursing services cover medication
                      management, wound care, and chronic disease monitoring. Physiotherapy includes mobility
                      assessments, exercise therapy, and rehabilitation support.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>How quickly can care services begin?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      For urgent needs, we can often arrange care within 24-48 hours. Regular care typically begins
                      within one week of the initial assessment. Emergency care can sometimes be arranged the same day,
                      depending on availability and the nature of the need.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Can I choose my caregiver?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Yes, we work to match you with caregivers who meet your preferences and needs. During the initial
                      consultation, we discuss your preferences for caregiver characteristics, and we strive to provide
                      consistent caregivers whenever possible. If you're not satisfied with a caregiver match, we'll
                      work to find a better fit.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What areas of Toronto do you serve?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      We serve all areas of Toronto and the Greater Toronto Area (GTA), including North York,
                      Scarborough, Etobicoke, Mississauga, Brampton, Markham, and Richmond Hill. Contact us to confirm
                      service availability in your specific location.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Do you provide 24/7 care?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Yes, we offer 24/7 care options including overnight care, live-in care, and around-the-clock
                      support. We also have a 24/7 emergency line for urgent situations. Care schedules can be
                      customized to meet your specific needs, from a few hours per week to continuous care.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Costs & Insurance */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-green-600">Costs & Insurance</h2>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>How much do your services cost?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Our rates vary by service type and level of care needed. PSW services range from $25-55/hour,
                      nursing services from $55-100/hour, and physiotherapy from $90-150 per session. We provide
                      detailed cost estimates during the initial consultation based on your specific care needs.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Do you accept insurance?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Yes, we accept most major insurance plans including private health insurance, Veterans Affairs
                      Canada (VAC), WSIB, and motor vehicle accident claims. Some nursing services may be covered by
                      OHIP. We provide direct billing services and can help you understand your coverage options.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Do you offer payment plans?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Yes, we offer flexible payment plans for families who need financial assistance. We accept various
                      payment methods including credit cards, electronic fund transfer, and monthly invoicing. Contact
                      our billing department to discuss options that work for your budget.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What's included in the hourly rate?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Our hourly rates include the caregiver's time, supervision, care coordination, administrative
                      support, and liability insurance. Additional supplies, equipment, or transportation costs may be
                      charged separately. We provide transparent pricing with no hidden fees.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Getting Started */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-purple-600">Getting Started</h2>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>How do I get started with home care services?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Getting started is easy: 1) Contact us for a free consultation, 2) We'll assess your needs and
                      develop a personalized care plan, 3) We match you with qualified caregivers, and 4) Care begins
                      according to your schedule. The entire process typically takes 3-7 days for regular care.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What happens during the initial assessment?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      During the initial assessment, our care coordinator will visit your home to discuss your needs,
                      health conditions, preferences, and goals. We'll assess the home environment, review medical
                      information, and develop a customized care plan. This consultation is free and typically takes
                      60-90 minutes.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Do I need a doctor's referral?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      A doctor's referral is not required for most of our services, including PSW care and private
                      nursing. However, some insurance plans may require a physician's order for coverage. For
                      OHIP-covered nursing services, a doctor's referral may be necessary. We can help coordinate with
                      your healthcare providers as needed.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What information do I need to provide?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      We'll need basic contact information, health history, current medications, emergency contacts,
                      insurance information, and details about your care needs and preferences. Having recent medical
                      records or a list of current health conditions is helpful but not required for the initial
                      consultation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Safety & Quality */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-red-600">Safety & Quality</h2>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Are your caregivers licensed and insured?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Yes, all our caregivers are fully licensed, insured, and bonded. PSWs hold certificates from
                      recognized programs, nurses are registered or licensed practical nurses, and physiotherapists are
                      licensed practitioners. We conduct thorough background checks and ensure all staff meet regulatory
                      requirements.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>How do you ensure quality of care?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      We maintain quality through regular supervision, ongoing training, client feedback monitoring, and
                      quality assurance visits. Our care coordinators conduct regular check-ins, and we have a formal
                      quality improvement program. All caregivers receive continuous education and professional
                      development.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What if I'm not satisfied with the care?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Your satisfaction is our priority. If you have concerns, contact us immediately. We'll investigate
                      promptly and take corrective action, which may include additional training, caregiver replacement,
                      or care plan adjustments. We have a formal complaint resolution process and welcome feedback to
                      improve our services.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>How do you handle emergencies?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      We have a 24/7 emergency line staffed by healthcare professionals. Our caregivers are trained in
                      emergency procedures and know when to call 911, contact family members, or reach our emergency
                      line. We maintain emergency contact information and care plans that include specific emergency
                      protocols for each client.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Family & Communication */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-orange-600">Family & Communication</h2>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>How do you communicate with family members?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      We maintain regular communication through daily care notes, weekly summary reports, and scheduled
                      family meetings. Our care coordinators are available for phone consultations, and we can provide
                      access to our client portal for real-time updates. Communication frequency can be customized to
                      meet family preferences.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Can family members be involved in care planning?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Absolutely. We encourage family involvement in care planning and decision-making. Family members
                      can participate in assessments, care plan meetings, and ongoing care discussions. We respect the
                      client's privacy preferences while keeping families informed and involved as appropriate.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What if care needs change over time?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Care plans are regularly reviewed and updated as needs change. We conduct formal reassessments
                      every 6 months or sooner if needed. Care can be increased, decreased, or modified based on
                      changing health conditions, recovery progress, or family preferences. Our flexible approach
                      ensures care remains appropriate and effective.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Can't find the answer you're looking for? Our care coordinators are here to help.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <HelpCircle className="h-8 w-8 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600">(416) 123-4567</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <HelpCircle className="h-8 w-8 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600">info@torontohomecare.ca</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <HelpCircle className="h-8 w-8 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Schedule Consultation</h3>
                <p className="text-gray-600">Free in-home assessment</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
