import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  Heart,
  Shield,
  Users,
  Clock,
  Star,
  Phone,
  MapPin,
  Mail,
} from "lucide-react";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Our Services | Haven at Home",
  description:
    "Comprehensive home care services including nursing, personal support, physiotherapy, and specialized care in Toronto.",
};

const services = [
  {
    id: "nursing",
    title: "In-Home Nursing Care",
    duration: "24/7 AVAILABLE",
    description:
      "Professional nursing care delivered in the comfort of your home. Our registered nurses provide comprehensive medical care, medication management, wound care, and health monitoring. We work closely with your healthcare team to ensure continuity of care and optimal health outcomes.",
    features: [
      "Medication management and administration",
      "Wound care and dressing changes",
      "Health monitoring and assessments",
      "IV therapy and injections",
      "Post-surgery care and recovery support",
    ],
    image: "/images/sample-placeholder.jpg",
    href: "/services/nursing",
  },
  {
    id: "personal-support",
    title: "Personal Support Services",
    duration: "FLEXIBLE SCHEDULES",
    description:
      "Compassionate personal support workers help with daily activities, personal hygiene, and companionship. Our PSWs are trained to provide respectful, dignified care while promoting independence and maintaining your quality of life.",
    features: [
      "Personal hygiene and grooming assistance",
      "Mobility and transfer support",
      "Meal preparation and feeding assistance",
      "Light housekeeping and laundry",
      "Companionship and social interaction",
    ],
    image: "/images/sample-placeholder.jpg",
    href: "/services/personal-support",
  },
  {
    id: "physiotherapy",
    title: "Physiotherapy & Rehabilitation",
    duration: "60-90 MIN SESSIONS",
    description:
      "Expert physiotherapy services to help you recover mobility, reduce pain, and improve function. Our physiotherapists develop personalized treatment plans using evidence-based techniques to restore your independence and quality of life.",
    features: [
      "Comprehensive movement assessment",
      "Pain management and relief",
      "Strength and balance training",
      "Post-surgery rehabilitation",
      "Fall prevention programs",
    ],
    image: "/images/sample-placeholder.jpg",
    href: "/services/physiotherapy",
  },
  {
    id: "specialty-care",
    title: "Specialty Chronic Care",
    duration: "SPECIALIZED PROGRAMS",
    description:
      "Specialized care for chronic conditions including dementia, diabetes, heart disease, and respiratory conditions. Our experienced team provides comprehensive care management, education, and support for both clients and families.",
    features: [
      "Dementia and Alzheimer's care",
      "Diabetes management and education",
      "Cardiac and respiratory care",
      "Palliative and end-of-life care",
      "Family education and support",
    ],
    image: "/images/sample-placeholder.jpg",
    href: "/services/specialty-chronic-care",
  },
];

const whyChooseUs = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description:
      "Our caregivers are not just professionals—they're compassionate individuals who treat every client like family.",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description:
      "All our caregivers are licensed, bonded, and insured for your complete peace of mind.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "We're here when you need us, with round-the-clock care and emergency response capabilities.",
  },
  {
    icon: Users,
    title: "Personalized Plans",
    description:
      "Every care plan is customized to your specific needs, preferences, and lifestyle.",
  },
  {
    icon: Star,
    title: "Experienced Team",
    description:
      "Our caregivers have years of experience and specialized training in various care disciplines.",
  },
];

const serviceComparison = [
  {
    service: "Nursing Care",
    duration: "24/7",
    caregiver: "RN/RPN",
    includes: [
      "Medical care",
      "Medication management",
      "Health monitoring",
      "Wound care",
    ],
    bestFor: "Complex medical needs, post-surgery recovery",
  },
  {
    service: "Personal Support",
    duration: "Flexible",
    caregiver: "PSW",
    includes: [
      "Personal care",
      "Mobility support",
      "Meal prep",
      "Companionship",
    ],
    bestFor: "Daily living assistance, companionship",
  },
  {
    service: "Physiotherapy",
    duration: "60-90 min",
    caregiver: "Physiotherapist",
    includes: [
      "Movement assessment",
      "Pain management",
      "Rehabilitation",
      "Exercise programs",
    ],
    bestFor: "Recovery, mobility improvement, pain relief",
  },
  {
    service: "Specialty Care",
    duration: "Ongoing",
    caregiver: "Specialized",
    includes: [
      "Condition management",
      "Family education",
      "Care coordination",
      "Support services",
    ],
    bestFor: "Chronic conditions, specialized needs",
  },
];

const faqs = [
  {
    question: "How do I get started with home care services?",
    answer:
      "Getting started is easy! Simply contact us for a free consultation where we'll assess your needs, discuss your preferences, and create a personalized care plan. We can begin services as soon as the next day.",
  },
  {
    question: "What qualifications do your caregivers have?",
    answer:
      "All our caregivers are licensed professionals with appropriate certifications (RN, RPN, PSW, Physiotherapist) and undergo thorough background checks, drug testing, and continuous training to ensure the highest quality care.",
  },
  {
    question: "How much do home care services cost?",
    answer:
      "Costs vary based on the type and frequency of care needed. We offer flexible pricing options and can work with various insurance providers. Contact us for a detailed quote based on your specific requirements.",
  },
  {
    question: "Can I change my care plan if my needs change?",
    answer:
      "Absolutely! We understand that care needs evolve over time. We regularly reassess your care plan and can adjust services, schedules, or caregivers as needed to ensure you always receive the most appropriate care.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We provide home care services throughout the Greater Toronto Area, including Toronto, Mississauga, Brampton, Vaughan, Richmond Hill, and surrounding communities. Contact us to confirm service availability in your area.",
  },
  {
    question: "How quickly can you start providing care?",
    answer:
      "We can typically begin services within 24-48 hours of your initial consultation. For urgent situations, we can arrange emergency care even sooner. We understand that care needs don't always follow a schedule.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Comprehensive home care services designed to support your health,
              independence, and quality of life in the comfort of your own home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/book">
                <Button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold rounded-lg">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Left Column - Content */}
                  <div className="p-12 flex flex-col justify-center">
                    <div className="mb-6">
                      <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                        • WHERE YOU START
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold text-slate-900 mb-3">
                      {service.title}
                    </h2>

                    <p className="text-lg text-slate-600 mb-6">
                      {service.duration}
                    </p>

                    <p className="text-slate-700 leading-relaxed mb-8">
                      {service.description}
                    </p>

                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">
                        Your treatment includes:
                      </h3>
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <Check className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-slate-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href={service.href}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg">
                        LEARN MORE
                      </Button>
                    </Link>
                  </div>

                  {/* Right Column - Image */}
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why Choose Haven at Home?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We're committed to providing exceptional care that goes beyond the
              basics, ensuring you and your family receive the support you
              deserve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <item.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Comparison Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Compare Our Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Find the perfect care solution for your needs with our
              comprehensive service comparison.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {serviceComparison.map((service, index) => (
              <Card
                key={index}
                className="bg-white border border-slate-200 shadow-lg"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">
                    {service.service}
                  </h3>

                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-slate-500">Duration</p>
                      <p className="font-semibold text-slate-900">
                        {service.duration}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-slate-500">Caregiver</p>
                      <p className="font-semibold text-slate-900">
                        {service.caregiver}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500 mb-2">Includes:</p>
                      <ul className="space-y-1">
                        {service.includes.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-center text-sm text-slate-700"
                          >
                            <Check className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500 mb-1">Best for:</p>
                      <p className="text-sm text-slate-700">
                        {service.bestFor}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get answers to common questions about our home care services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="bg-white border border-slate-200 shadow-sm"
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Get Started?"
        subtitle="Contact us today to discuss your care needs and learn how we can support you and your family."
        primaryButtonText="Contact Us"
        secondaryButtonText="Book Consultation"
        showSubtitle={true}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
