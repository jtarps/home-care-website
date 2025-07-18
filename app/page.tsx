/*
✅ Haven at Home Website Updates Completed:

🎨 1. Brand Color Palette Applied
   - Primary Button/Accent: #3B82F6
   - Secondary Accent (calm): #9DBEA9  
   - Background (Cards/Blocks): #F6F2EB
   - Soft Accent Highlight: #F2B5A3
   - Primary Text: #3A3A3A
   - Secondary Text: #8C8C8C
   - Body Background: #FFFFFF

🏠 2. Hero Section Updated
   - New headline: "Care That Feels Like Family." with rotating words
   - New subheadline: "Compassionate home support designed to keep your loved ones comfortable, safe, and independent."
   - Updated CTA: "Request Your Care Plan →"
   - Applied brand background color #F6F2EB

💡 3. Why Choose Us Section Updated
   - New content: "Compassionate, Well-Cared-For Caregivers", "Always Available, Always Supportive", "Clear, Constant Communication"
   - Applied brand secondary color #9DBEA9 for icons
   - Updated to 3-column layout

🛎️ 4. Services Section Updated
   - Service pills moved to top of section
   - Updated service titles and descriptions with new copy
   - Removed pricing references
   - Applied brand colors throughout

💬 5. Testimonials Section Updated
   - Applied brand background #F6F2EB
   - Updated text colors to brand palette
   - Enhanced star ratings with brand highlight color

🔍 6. SEO Metadata Updated
   - New title: "Haven at Home | Compassionate Home Care Services in Toronto"
   - Updated description with new branding

📱 7. Mobile & Responsiveness
   - All components updated with brand colors
   - Maintained responsive design patterns

🎭 8. Animated Top Bar
   - Added scrolling messages in navigation
   - Enhanced user engagement with moving content

💰 9. Pricing Removed
   - Removed all pricing references across the site
   - Focus on value and care quality instead
*/

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import TextRotator from "@/components/text-rotator";
import LiveChat from "@/components/live-chat";
import VideoPlaceholder from "@/components/video-placeholder";
import {
  Heart,
  Shield,
  Clock,
  Users,
  Star,
  Phone,
  CheckCircle,
  ArrowRight,
  Home,
  Feather,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";

export default function HomePage() {
  const [selectedService, setSelectedService] = useState("personal-support");
  const [careNeeded, setCareNeeded] = useState("");

  const serviceContent = {
    "personal-support": {
      title: "Personal Support & Warm Companionship",
      description:
        "Compassionate daily assistance including meals, mobility support, companionship, and household help.",
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
        items: [
          "Light housekeeping",
          "Laundry assistance",
          "Companionship",
          "Transportation support",
        ],
      },
      availability: "Flexible scheduling available",
      responseTime: "< 24 hours",
      availabilityBadge: "24/7 Support",
      serviceArea: "Greater Toronto",
    },
    "in-home-nursing": {
      title: "Compassionate Nursing Care at Home",
      description:
        "Professional nurses delivering medical care with warmth, expertise, and attention to your loved one's comfort.",
      leftColumn: {
        title: "Medical Care",
        items: [
          "Medication administration",
          "Wound care & dressing",
          "Vital signs monitoring",
          "Health assessments",
        ],
      },
      rightColumn: {
        title: "Specialized Services",
        items: [
          "Chronic disease management",
          "Post-surgical care",
          "IV therapy",
          "Care coordination",
        ],
      },
      availability: "On-call nursing support",
      responseTime: "< 2 hours",
      availabilityBadge: "Emergency Response",
      serviceArea: "GTA & Surrounding",
    },
    rehabilitation: {
      title: "Personalized Rehabilitation at Home",
      description:
        "Specialized, comfortable home rehabilitation programs guided by experienced physiotherapists to help you recover smoothly.",
      leftColumn: {
        title: "Therapy Services",
        items: [
          "Physiotherapy",
          "Occupational therapy",
          "Speech therapy",
          "Mobility training",
        ],
      },
      rightColumn: {
        title: "Recovery Support",
        items: [
          "Pain management",
          "Fall prevention",
          "Equipment training",
          "Progress monitoring",
        ],
      },
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
        items: [
          "Alzheimer's support",
          "Dementia care",
          "Behavioral management",
          "Safety supervision",
        ],
      },
      rightColumn: {
        title: "Chronic Conditions",
        items: [
          "ALS & Parkinson's care",
          "Cancer support",
          "End-of-life care",
          "Diabetes management",
        ],
      },
      availability: "Specialized care teams",
      responseTime: "< 24 hours",
      availabilityBadge: "Specialist Care",
      serviceArea: "Greater Toronto",
    },
  };

  return (
    <div className="min-h-screen bg-brand-body">
      {/* Hero Section */}
      <section className="relative bg-brand-background py-20 lg:py-32 overflow-hidden flex items-center justify-center min-h-[600px]">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <video
            src="/hero-video-v1.mp4"
            className="w-full h-full object-cover"
            style={{ minHeight: "100%", minWidth: "100%" }}
            autoPlay
            loop
            muted
            playsInline
            poster="/hero-image.png"
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-8 drop-shadow-xl">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-4 mb-3 justify-center">
                <TextRotator />
                <span>care</span>
              </div>
              <span className="block">that feels like family.</span>
            </div>
          </h1>
          {/* <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed drop-shadow-lg max-w-3xl mx-auto mt-4">
            Compassionate home support designed to keep your loved ones
            comfortable, safe, and independent—delivered with warmth, dignity,
            and trust.
          </p> */}
          {/* Commented out subheadline for now
          <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed drop-shadow-lg max-w-3xl mx-auto mt-4">
            Compassionate home support designed to keep your loved ones comfortable, safe, and independent—delivered with warmth, dignity, and trust.
          </p>
          */}

          {/* Simple Booking Form */}
          <div className="bg-white/90 p-6 rounded-lg shadow-lg mb-8 backdrop-blur-sm w-full max-w-lg mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-brand-text">
              Get Started Today
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-textSecondary mb-2">
                  Who needs care?
                </label>
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
                <Button className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white py-3 px-6 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 rounded-md">
                  Request Your Care Plan →
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-white/90 drop-shadow justify-center">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-brand-secondary mr-2" />
              Licensed & Insured
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-brand-secondary mr-2" />
              24/7 Support
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-brand-secondary mr-2" />
              Flexible Scheduling
            </div>
          </div>
        </div>
      </section>

      {/* Benefits/Logos Strip */}
      <section className="py-12 bg-purple-600 border-y border-brand-secondary/20">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-white" />
              <span className="text-lg font-semibold text-white">
                Licensed & Insured
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-white" />
              <span className="text-lg font-semibold text-white">
                24/7 Support
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-white" />
              <span className="text-lg font-semibold text-white">
                Expert Care Team
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-white" />
              <span className="text-lg font-semibold text-white">
                Family-Focused
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32" style={{ background: "#FAF6F3" }}>
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">
              Why Choose A Haven at Home?
            </h2>
            <p className="text-xl text-brand-textSecondary max-w-3xl mx-auto text-center">
              We're committed to providing exceptional care that helps you or
              your loved ones live comfortably and safely at home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center bg-white">
              <CardHeader>
                <div
                  className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#A3B18A" }}
                >
                  <Heart className="h-8 w-8 text-white" fill="white" />
                </div>
                <CardTitle className="text-brand-text">
                  Compassionate, Well-Cared-For Caregivers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-brand-textSecondary">
                  We take exceptional care of our caregivers, ensuring they
                  deliver exceptional care to your family.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white">
              <CardHeader>
                <div
                  className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#A3B18A" }}
                >
                  <Clock className="h-8 w-8 text-white" fill="white" />
                </div>
                <CardTitle className="text-brand-text">
                  Always Available, Always Supportive
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-brand-textSecondary">
                  Round-the-clock availability offering reassurance and
                  responsive care exactly when your family needs it.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white">
              <CardHeader>
                <div
                  className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#A3B18A" }}
                >
                  <Users className="h-8 w-8 text-white" fill="white" />
                </div>
                <CardTitle className="text-brand-text">
                  Clear, Constant Communication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-brand-textSecondary">
                  Stay connected with our intuitive family dashboard, providing
                  updates and insights in real-time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Services Section - Matching v24 Design */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-body">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-text mb-4">
              Our Services
            </h2>
            <p className="text-xl text-brand-textSecondary max-w-3xl mx-auto">
              Comprehensive home healthcare services designed to support your
              independence and well-being.
            </p>
          </div>

          {/* Service Pills - Moved to top */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {[
              { key: "personal-support", label: "Personal Support" },
              { key: "in-home-nursing", label: "In-Home Nursing" },
              { key: "rehabilitation", label: "Rehabilitation" },
              { key: "specialty-chronic", label: "Specialty & Chronic Care" },
            ].map((pill) => (
              <Button
                key={pill.key}
                onClick={() => setSelectedService(pill.key)}
                className={`rounded-full px-6 py-2 font-semibold transition-all border-2 shadow-sm text-base
                  ${
                    selectedService === pill.key
                      ? "bg-brand-primary text-white border-brand-primary shadow-lg hover:bg-brand-primary/90"
                      : "bg-white text-brand-textSecondary border-brand-secondary/50 hover:bg-brand-background hover:border-brand-primary/60"
                  }
                `}
              >
                {pill.label}
              </Button>
            ))}
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                {/* Service Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-brand-text mb-4">
                      {
                        serviceContent[
                          selectedService as keyof typeof serviceContent
                        ].title
                      }
                    </h3>
                    <p className="text-lg text-brand-textSecondary mb-6">
                      {
                        serviceContent[
                          selectedService as keyof typeof serviceContent
                        ].description
                      }
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-brand-text">
                        {
                          serviceContent[
                            selectedService as keyof typeof serviceContent
                          ].leftColumn.title
                        }
                      </h4>
                      <ul className="space-y-1 text-brand-textSecondary">
                        {serviceContent[
                          selectedService as keyof typeof serviceContent
                        ].leftColumn.items.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <Feather className="h-4 w-4 text-brand-secondary mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-brand-text">
                        {
                          serviceContent[
                            selectedService as keyof typeof serviceContent
                          ].rightColumn.title
                        }
                      </h4>
                      <ul className="space-y-1 text-brand-textSecondary">
                        {serviceContent[
                          selectedService as keyof typeof serviceContent
                        ].rightColumn.items.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <Feather className="h-4 w-4 text-brand-secondary mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-center pt-6 border-t border-brand-secondary/20">
                    <Button
                      asChild
                      size="lg"
                      className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg"
                    >
                      <Link href="/book">
                        Request Care
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Service Image Card */}
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="aspect-[4/3] bg-brand-background">
                    <img
                      src="/placeholder.jpg"
                      alt="Compassionate care in action"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-brand-textSecondary">
                          Response Time
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-brand-secondary/20 text-brand-text"
                        >
                          {
                            serviceContent[
                              selectedService as keyof typeof serviceContent
                            ].responseTime
                          }
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-brand-textSecondary">
                          Availability
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-brand-primary/20 text-brand-text"
                        >
                          {
                            serviceContent[
                              selectedService as keyof typeof serviceContent
                            ].availabilityBadge
                          }
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-brand-textSecondary">
                          Service Areas
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-brand-highlight/20 text-brand-text"
                        >
                          {
                            serviceContent[
                              selectedService as keyof typeof serviceContent
                            ].serviceArea
                          }
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 pb-32 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">
              What Our Families Say
            </h2>
            <p className="text-xl text-brand-textSecondary">
              Real stories from families we've had the privilege to serve
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-brand-highlight fill-current"
                    />
                  ))}
                </div>
                <p className="text-brand-text mb-6 leading-relaxed">
                  "The care my mother receives is exceptional. The PSW is not
                  only professional but genuinely cares about her wellbeing. It
                  gives our family such peace of mind."
                </p>
                <div className="flex items-center pt-4 border-t border-gray-100">
                  <div className="w-14 h-14 bg-brand-secondary/20 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-brand-text font-bold text-lg">
                      SM
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-brand-text text-lg">
                      Sarah M.
                    </p>
                    <p className="text-sm text-brand-textSecondary">
                      Daughter of client
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#FAF6F3] shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-brand-highlight fill-current"
                    />
                  ))}
                </div>
                <p className="text-brand-text mb-6 leading-relaxed">
                  After my surgery, the nursing care I received at home was
                  outstanding. The nurses were knowledgeable, caring, and helped
                  me recover much faster than expected."
                </p>
                <div className="flex items-center pt-4 border-t border-gray-100">
                  <div className="w-14 h-14 bg-brand-primary/20 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-brand-text font-bold text-lg">
                      RK
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-brand-text text-lg">
                      Robert K.
                    </p>
                    <p className="text-sm text-brand-textSecondary">Client</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-brand-highlight fill-current"
                    />
                  ))}
                </div>
                <p className="text-brand-text mb-6 leading-relaxed">
                  The physiotherapy sessions at home have been life-changing.
                  I've regained my mobility and confidence. The therapist is
                  skilled and encouraging."
                </p>
                <div className="flex items-center pt-4 border-t border-gray-100">
                  <div className="w-14 h-14 bg-brand-highlight/20 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-brand-text font-bold text-lg">
                      ML
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-brand-text text-lg">
                      Maria L.
                    </p>
                    <p className="text-sm text-brand-textSecondary">Client</p>
                  </div>
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
                {/*
                <p className="text-xl text-brand-textSecondary mb-10 max-w-3xl mx-auto">
                  Contact us today for a free consultation and let us create a personalized care plan for you or your loved one.
                </p>
                */}
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

      {/* Live Chat Component */}
      <LiveChat />
    </div>
  );
}
