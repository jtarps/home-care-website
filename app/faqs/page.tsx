import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  Search,
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

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-brand-body">
      {/* Header */}
      <section className="bg-brand-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="h-16 w-16 text-brand-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-brand-textSecondary max-w-3xl mx-auto">
              Find answers to common questions about our home care services,
              processes, and policies.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search FAQs..."
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Services */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-brand-primary">
                Services & Care
              </h2>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      What types of home care services do you provide?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      We provide comprehensive home care services including
                      Personal Support Worker (PSW) care, registered nursing
                      services, and physiotherapy. Our PSW services include
                      personal care, companionship, meal preparation, and light
                      housekeeping. Our nursing services cover medication
                      management, wound care, and chronic disease monitoring.
                      Physiotherapy includes mobility assessments, exercise
                      therapy, and rehabilitation support.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>How quickly can care services begin?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      For urgent needs, we can often arrange care within 24-48
                      hours. Regular care typically begins within one week of
                      the initial assessment. Emergency care can sometimes be
                      arranged the same day, depending on availability and the
                      nature of the need.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Can I choose my caregiver?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Yes, we work to match you with caregivers who meet your
                      preferences and needs. During the initial consultation, we
                      discuss your preferences for caregiver characteristics,
                      and we strive to provide consistent caregivers whenever
                      possible. If you're not satisfied with a caregiver match,
                      we'll work to find a better fit.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What areas of Toronto do you serve?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      We serve all areas of Toronto and the Greater Toronto Area
                      (GTA), including North York, Scarborough, Etobicoke,
                      Mississauga, Brampton, Markham, and Richmond Hill. Contact
                      us to confirm service availability in your specific
                      location.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Do you provide 24/7 care?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Yes, we offer 24/7 care options including overnight care,
                      live-in care, and around-the-clock support. We also have a
                      24/7 emergency line for urgent situations. Care schedules
                      can be customized to meet your specific needs, from a few
                      hours per week to continuous care.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Costs & Insurance */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-brand-secondary">
                Costs & Insurance
              </h2>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>How much do your services cost?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Our rates vary by service type and level of care needed.
                      We provide detailed cost estimates during the initial
                      consultation based on your specific care needs and can
                      work with various insurance plans and payment options.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Do you accept insurance?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Yes, we accept most major insurance plans including
                      private health insurance, Veterans Affairs Canada (VAC),
                      WSIB, and motor vehicle accident claims. Some nursing
                      services may be covered by OHIP. We provide direct billing
                      services and can help you understand your coverage
                      options.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Do you offer payment plans?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Yes, we offer flexible payment plans for families who need
                      financial assistance. We accept various payment methods
                      including credit cards, electronic fund transfer, and
                      monthly invoicing. Contact our billing department to
                      discuss options that work for your budget.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What's included in the hourly rate?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Our rates include the caregiver's time, supervision, care
                      coordination, administrative support, and liability
                      insurance. Additional supplies, equipment, or
                      transportation costs may be charged separately. We provide
                      transparent pricing with no hidden fees.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Getting Started */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-brand-highlight">
                Getting Started
              </h2>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      How do I get started with home care services?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Getting started is easy: 1) Contact us for a free
                      consultation, 2) We'll assess your needs and develop a
                      personalized care plan, 3) We match you with qualified
                      caregivers, and 4) Care begins according to your schedule.
                      The entire process typically takes 3-7 days for regular
                      care.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      What happens during the initial assessment?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      During the initial assessment, our care coordinator will
                      visit your home to discuss your needs, health conditions,
                      preferences, and goals. We'll assess the home environment,
                      review medical information, and develop a customized care
                      plan. This consultation is free and typically takes 60-90
                      minutes.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Do I need a doctor's referral?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      A doctor's referral is not required for most of our
                      services, including PSW care and private nursing. However,
                      some insurance plans may require a physician's order for
                      coverage. For OHIP-covered nursing services, a doctor's
                      referral may be necessary. We can help coordinate with
                      your healthcare providers as needed.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      What information do I need to provide?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      We'll need basic contact information, health history,
                      current medications, emergency contacts, insurance
                      information, and details about your care needs and
                      preferences. Having recent medical records or a list of
                      current health conditions is helpful but not required for
                      the initial consultation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Safety & Quality */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-brand-primary">
                Safety & Quality
              </h2>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Are your caregivers licensed and insured?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Yes, all our caregivers are fully licensed, insured, and
                      bonded. PSWs hold certificates from recognized programs,
                      nurses are registered or licensed practical nurses, and
                      physiotherapists are licensed practitioners. We conduct
                      thorough background checks and ensure all staff meet
                      regulatory requirements.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>How do you ensure quality of care?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      We maintain quality through regular supervision, ongoing
                      training, client feedback monitoring, and quality
                      assurance visits. Our care coordinators conduct regular
                      check-ins, and we have a formal quality improvement
                      program. All caregivers receive continuous education and
                      professional development.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      What if I'm not satisfied with the care?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Your satisfaction is our priority. If you have concerns,
                      contact us immediately. We'll investigate promptly and
                      take corrective action, which may include additional
                      training, caregiver replacement, or care plan adjustments.
                      We have a formal complaint resolution process and welcome
                      feedback to improve our services.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>How do you handle emergencies?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      We have a 24/7 emergency line staffed by healthcare
                      professionals. Our caregivers are trained in emergency
                      procedures and know when to call 911, contact family
                      members, or reach our emergency line. We maintain
                      emergency contact information and care plans that include
                      specific emergency protocols for each client.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Family & Communication */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-brand-secondary">
                Family & Communication
              </h2>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      How do you communicate with family members?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      We maintain regular communication through daily care
                      notes, weekly summary reports, and scheduled family
                      meetings. Our care coordinators are available for phone
                      consultations, and we can provide access to our client
                      portal for real-time updates. Communication frequency can
                      be customized to meet family preferences.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>
                      Can family members be involved in care planning?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Absolutely. We encourage family involvement in care
                      planning and decision-making. Family members can
                      participate in assessments, care plan meetings, and
                      ongoing care discussions. We respect the client's privacy
                      preferences while keeping families informed and involved
                      as appropriate.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What if care needs change over time?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Care plans are regularly reviewed and updated as needs
                      change. We conduct formal reassessments every 6 months or
                      sooner if needed. Care can be increased, decreased, or
                      modified based on changing health conditions, recovery
                      progress, or family preferences. Our flexible approach
                      ensures care remains appropriate and effective.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
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
                  Still Have Questions?
                </h2>
                <p className="text-xl text-brand-textSecondary mb-10 max-w-3xl mx-auto">
                  Can't find the answer you're looking for? Our care
                  coordinators are here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <a href="tel:+14165552273" className="inline-block">
                    <div className="bg-brand-primary text-white hover:bg-brand-primary/90 font-bold py-5 px-12 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-200 cursor-pointer flex items-center justify-center text-lg md:text-xl gap-2">
                      <Phone className="h-6 w-6" />
                      Call (416) 555-2273
                    </div>
                  </a>
                  <Link href="/contact" className="inline-block">
                    <div className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white bg-transparent font-bold py-5 px-12 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-200 cursor-pointer flex items-center justify-center text-lg md:text-xl">
                      Contact Us
                      <span className="inline-block animate-bounce ml-2">
                        <ArrowRight className="h-6 w-6" />
                      </span>
                    </div>
                  </Link>
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
