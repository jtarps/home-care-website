"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Building,
  Users,
  Heart,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import Link from "next/link";

export default function PartnersPage() {
  // State for form fields
  const [form, setForm] = useState({
    contactName: "",
    title: "",
    organization: "",
    organizationType: "",
    email: "",
    phone: "",
    address: "",
    servicesOfInterest: [] as string[],
    patientVolume: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => {
        const arr = new Set(prev.servicesOfInterest);
        if (checked) arr.add(value);
        else arr.delete(value);
        return { ...prev, servicesOfInterest: Array.from(arr) };
      });
    } else {
      setForm((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("partnership_inquiries").insert([
        {
          contact_name: form.contactName,
          title: form.title,
          organization: form.organization,
          organization_type: form.organizationType,
          email: form.email,
          phone: form.phone,
          address: form.address,
          services_of_interest: form.servicesOfInterest,
          patient_volume: form.patientVolume,
          message: form.message,
        },
      ]);
      if (error) throw error;
      toast.success("Thank you! Your partnership inquiry has been submitted.");
      setForm({
        contactName: "",
        title: "",
        organization: "",
        organizationType: "",
        email: "",
        phone: "",
        address: "",
        servicesOfInterest: [],
        patientVolume: "",
        message: "",
      });
      setSubmitted(true);
    } catch (err) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-body">
      {/* Header */}
      <section className="bg-brand-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-6">
              Partner With Us
            </h1>
            <p className="text-xl text-brand-textSecondary max-w-3xl mx-auto">
              Join our network of healthcare partners to provide seamless,
              comprehensive care for patients transitioning from hospital to
              home.
            </p>
            {/* <div className="mt-8">
              <Button
                size="lg"
                className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-3"
                onClick={() => {
                  document
                    .getElementById("partnership-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Apply Now <Phone className="ml-2 h-5 w-5" />
              </Button>
            </div> */}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-brand-text">
            Partnership Opportunities
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Building className="h-16 w-16 text-brand-primary mx-auto mb-4" />
                <CardTitle className="text-brand-text">
                  Hospitals & Health Systems
                </CardTitle>
                <CardDescription className="text-brand-textSecondary">
                  Seamless discharge planning and post-acute care
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 text-sm text-brand-textSecondary">
                  <li>• Reduce readmission rates</li>
                  <li>• Streamlined discharge process</li>
                  <li>• 24/7 care coordination</li>
                  <li>• Real-time patient updates</li>
                  <li>• Quality outcome reporting</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-16 w-16 text-brand-secondary mx-auto mb-4" />
                <CardTitle className="text-brand-text">
                  Medical Clinics & Physicians
                </CardTitle>
                <CardDescription className="text-brand-textSecondary">
                  Extended care support for your patients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 text-sm text-brand-textSecondary">
                  <li>• Medication compliance monitoring</li>
                  <li>• Chronic disease management</li>
                  <li>• Regular health assessments</li>
                  <li>• Direct physician communication</li>
                  <li>• Preventive care support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="h-16 w-16 text-brand-highlight mx-auto mb-4" />
                <CardTitle className="text-brand-text">
                  Rehabilitation Centers
                </CardTitle>
                <CardDescription className="text-brand-textSecondary">
                  Continued therapy and recovery support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 text-sm text-brand-textSecondary">
                  <li>• In-home physiotherapy</li>
                  <li>• Exercise program continuation</li>
                  <li>• Progress monitoring</li>
                  <li>• Equipment and mobility support</li>
                  <li>• Fall prevention programs</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Benefits of Partnership*/}
     {/* <section className="py-20 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-brand-text">
            Benefits of Partnership
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-brand-text">
                For Healthcare Providers
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-secondary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-brand-text">
                      Improved Patient Outcomes
                    </h4>
                    <p className="text-brand-textSecondary">
                      Better continuity of care leads to improved health
                      outcomes and patient satisfaction.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-secondary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-brand-text">
                      Reduced Readmissions
                    </h4>
                    <p className="text-brand-textSecondary">
                      Professional home care support helps prevent complications
                      and hospital readmissions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-secondary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-brand-text">
                      Enhanced Reputation
                    </h4>
                    <p className="text-brand-textSecondary">
                      Partner with a trusted home care provider to enhance your
                      organization's reputation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-secondary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-brand-text">
                      Streamlined Referrals
                    </h4>
                    <p className="text-brand-textSecondary">
                      Easy referral process with dedicated liaison support and
                      regular communication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-brand-text">
                For Patients & Families
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-secondary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-brand-text">
                      Seamless Transitions
                    </h4>
                    <p className="text-brand-textSecondary">
                      Smooth transition from hospital or clinic to home care
                      without gaps in service.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-secondary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-brand-text">
                      Coordinated Care
                    </h4>
                    <p className="text-brand-textSecondary">
                      All healthcare providers work together to ensure
                      comprehensive, coordinated care.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-secondary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-brand-text">
                      Comfort of Home
                    </h4>
                    <p className="text-brand-textSecondary">
                      Receive professional care in the familiar, comfortable
                      environment of home.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-secondary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-brand-text">
                      Family Support
                    </h4>
                    <p className="text-brand-textSecondary">
                      Education and support for family members to participate in
                      the care process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* How Partnership Works */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-brand-text">
            How Partnership Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="bg-brand-primary/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-brand-primary">
                    1
                  </span>
                </div>
                <CardTitle className="text-brand-text">
                  Initial Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-brand-textSecondary">
                  Reach out to discuss partnership opportunities and patient
                  needs.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="bg-brand-secondary/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-brand-secondary">
                    2
                  </span>
                </div>
                <CardTitle className="text-brand-text">
                  Care Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-brand-textSecondary">
                  We assess patient needs and develop appropriate care plans.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="bg-brand-highlight/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-brand-highlight">
                    3
                  </span>
                </div>
                <CardTitle className="text-brand-text">
                  Service Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-brand-textSecondary">
                  Professional caregivers begin providing services in the
                  patient's home.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="bg-brand-primary/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-brand-primary">
                    4
                  </span>
                </div>
                <CardTitle className="text-brand-text">
                  Ongoing Communication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-brand-textSecondary">
                  Regular updates and communication about patient progress and
                  outcomes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Contact Form */}
      <section id="partnership-form" className="py-20 bg-brand-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-brand-text">
            Start a Partnership
          </h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-brand-text">
                Partnership Inquiry Form
              </CardTitle>
              <CardDescription className="text-brand-textSecondary">
                Let's discuss how we can work together to provide better patient
                care.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <h3 className="text-2xl font-semibold text-green-700 mb-2">
                    Thank you!
                  </h3>
                  <p className="text-green-700">
                    Your partnership inquiry has been received. We will be in
                    touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Contact Name</Label>
                      <Input
                        id="contactName"
                        value={form.contactName}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Title/Position</Label>
                      <Input
                        id="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Enter your title"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="organization">Organization Name</Label>
                    <Input
                      id="organization"
                      value={form.organization}
                      onChange={handleChange}
                      placeholder="Enter organization name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="organizationType">Organization Type</Label>
                    <select
                      id="organizationType"
                      value={form.organizationType}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select organization type</option>
                      <option>Hospital/Health System</option>
                      <option>Medical Clinic</option>
                      <option>Physician Practice</option>
                      <option>Rehabilitation Center</option>
                      <option>Long-term Care Facility</option>
                      <option>Other Healthcare Provider</option>
                    </select>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Organization Address</Label>
                    <Input
                      id="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Enter organization address"
                    />
                  </div>
                  <div>
                    <Label>Services of Interest</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          value="PSW Services"
                          checked={form.servicesOfInterest.includes(
                            "PSW Services"
                          )}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-sm">PSW Services</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          value="Nursing Care"
                          checked={form.servicesOfInterest.includes(
                            "Nursing Care"
                          )}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-sm">Nursing Care</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          value="Physiotherapy"
                          checked={form.servicesOfInterest.includes(
                            "Physiotherapy"
                          )}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-sm">Physiotherapy</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          value="All Services"
                          checked={form.servicesOfInterest.includes(
                            "All Services"
                          )}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-sm">All Services</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="patientVolume">
                      Expected Monthly Patient Volume
                    </Label>
                    <select
                      id="patientVolume"
                      value={form.patientVolume}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select expected volume</option>
                      <option>1-5 patients</option>
                      <option>6-15 patients</option>
                      <option>16-30 patients</option>
                      <option>31-50 patients</option>
                      <option>50+ patients</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your organization and partnership goals"
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button
                    className="w-full bg-brand-primary hover:bg-brand-primary/90"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting
                      ? "Submitting..."
                      : "Submit Partnership Inquiry"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
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
                  Ready to Partner?
                </h2>
                <p className="text-xl text-brand-textSecondary mb-10 max-w-3xl mx-auto">
                  Contact our partnership team to discuss opportunities and get
                  started.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <a href="tel:+14165552273" className="inline-block">
                    <div className="bg-brand-primary text-white hover:bg-brand-primary/90 font-bold py-5 px-12 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-200 cursor-pointer flex items-center justify-center text-lg md:text-xl gap-2">
                      <Phone className="h-6 w-6" />
                      Call (416) 555-2273
                    </div>
                  </a>
                  <a
                    href="mailto:partnerships@havenathome.com"
                    className="inline-block"
                  >
                    <div className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white bg-transparent font-bold py-5 px-12 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-200 cursor-pointer flex items-center justify-center text-lg md:text-xl">
                      <Mail className="h-6 w-6 mr-2" />
                      partnerships@havenathome.com
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
