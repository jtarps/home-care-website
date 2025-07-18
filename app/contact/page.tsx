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
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    urgency: "",
    message: "",
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.consent) {
      toast.error("You must consent to be contacted.");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_inquiries").insert([
        {
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone,
          department: form.subject,
          urgency: form.urgency,
          message: form.message,
        },
      ]);
      if (error) throw error;
      toast.success("Thank you! Your message has been sent.");
      setSubmitted(true);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        urgency: "",
        message: "",
        consent: false,
      });
    } catch (err) {
      toast.error("Failed to send. Please try again.");
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
              Contact Us
            </h1>
            <p className="text-xl text-brand-textSecondary max-w-3xl mx-auto">
              We're here to help. Reach out to us for care inquiries, questions,
              or to schedule a consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center bg-white">
              <CardHeader>
                <Phone className="h-12 w-12 text-brand-primary mx-auto mb-4" />
                <CardTitle className="text-brand-text">Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-brand-text">
                  (416) 555-2273
                </p>
                <p className="text-brand-textSecondary">24/7 Emergency Line</p>
                <p className="text-sm text-brand-textSecondary mt-2">
                  For urgent care needs and emergencies
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white">
              <CardHeader>
                <Mail className="h-12 w-12 text-brand-secondary mx-auto mb-4" />
                <CardTitle className="text-brand-text">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-brand-text">
                  <a
                    href="mailto:info@havenathome.ca"
                    className="hover:underline text-brand-primary"
                  >
                    info@havenathome.ca
                  </a>
                </p>
                <p className="text-brand-textSecondary">General Inquiries</p>
                <p className="text-sm text-brand-textSecondary mt-2">
                  We respond within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <CardTitle>Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-gray-900">
                  123 Main Street
                </p>
                <p className="text-gray-600">Toronto, ON M5V 3A8</p>
                <p className="text-sm text-gray-500 mt-2">
                  Suite 200, Second Floor
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <CardTitle>Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-gray-900">
                  Mon-Fri: 8AM-6PM
                </p>
                <p className="text-gray-600">Sat-Sun: 9AM-5PM</p>
                <p className="text-sm text-gray-500 mt-2">
                  Care services available 24/7
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {submitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                      <h3 className="text-2xl font-semibold text-green-700 mb-2">
                        Thank you!
                      </h3>
                      <p className="text-green-700">
                        Your message has been received. We will be in touch
                        soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="(416) 555-0123"
                            value={form.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="subject">Subject</Label>
                          <select
                            id="subject"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={form.subject}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select subject</option>
                            <option>General Inquiry</option>
                            <option>Care Services</option>
                            <option>Billing & Insurance</option>
                            <option>Employment</option>
                            <option>Partnership</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="urgency">Urgency</Label>
                          <select
                            id="urgency"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={form.urgency}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select urgency</option>
                            <option>Urgent - Need immediate response</option>
                            <option>
                              High - Need response within 24 hours
                            </option>
                            <option>
                              Normal - Response within 2-3 days is fine
                            </option>
                            <option>Low - No rush</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Please provide details about your inquiry or care needs"
                          className="min-h-[120px]"
                          value={form.message}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="consent"
                          className="rounded"
                          checked={form.consent}
                          onChange={handleChange}
                          required
                        />
                        <Label htmlFor="consent" className="text-sm">
                          I consent to being contacted by Toronto Home Care
                          regarding my inquiry
                        </Label>
                      </div>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        type="submit"
                        disabled={submitting}
                      >
                        {submitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold mb-6">
                Other Ways to Reach Us
              </h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Emergency Care Line
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-red-600">
                      (416) 123-4567
                    </p>
                    <p className="text-gray-600">
                      Available 24/7 for urgent care needs, emergencies, or
                      after-hours support.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Department-Specific Contacts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-semibold">Care Coordination</p>
                      <a
                        href="mailto:care@torontohomecare.ca"
                        className="text-gray-600 hover:underline"
                      >
                        care@torontohomecare.ca
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold">Billing & Insurance</p>
                      <a
                        href="mailto:billing@torontohomecare.ca"
                        className="text-gray-600 hover:underline"
                      >
                        billing@torontohomecare.ca
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold">Human Resources</p>
                      <a
                        href="mailto:careers@torontohomecare.ca"
                        className="text-gray-600 hover:underline"
                      >
                        careers@torontohomecare.ca
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold">Partnerships</p>
                      <a
                        href="mailto:partnerships@torontohomecare.ca"
                        className="text-gray-600 hover:underline"
                      >
                        partnerships@torontohomecare.ca
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Our Office & Service Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Visit Our Office</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We welcome in-person consultations by appointment. Our office
                  is conveniently located in downtown Toronto with accessible
                  parking.
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Address:</strong> 123 Main Street, Suite 200,
                    Toronto, ON M5V 3A8
                  </p>
                  <p>
                    <strong>Parking:</strong> Underground parking available
                  </p>
                  <p>
                    <strong>Transit:</strong> 2 minutes from Union Station
                  </p>
                  <p>
                    <strong>Accessibility:</strong> Wheelchair accessible
                    building
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">
                  We provide home care services throughout:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Toronto (all districts)</li>
                  <li>• North York</li>
                  <li>• Scarborough</li>
                  <li>• Etobicoke</li>
                  <li>• Mississauga</li>
                  <li>• Brampton</li>
                  <li>• Markham</li>
                  <li>• Richmond Hill</li>
                </ul>
                <p className="text-sm text-gray-500 mt-2">
                  Contact us to confirm service availability in your area.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Find Us</h2>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Interactive map would be embedded here
              </p>
              <p className="text-sm text-gray-500">
                123 Main Street, Toronto, ON M5V 3A8
              </p>
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
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-brand-textSecondary mb-10 max-w-3xl mx-auto">
                  Contact us today to discuss your care needs and learn how we
                  can support you and your family.
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
