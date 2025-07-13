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
import { Building, Users, Heart, CheckCircle, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Partner With Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our network of healthcare partners to provide seamless,
              comprehensive care for patients transitioning from hospital to
              home.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Partnership Opportunities
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Building className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <CardTitle>Hospitals & Health Systems</CardTitle>
                <CardDescription>
                  Seamless discharge planning and post-acute care
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 text-sm text-gray-600">
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
                <Users className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <CardTitle>Medical Clinics & Physicians</CardTitle>
                <CardDescription>
                  Extended care support for your patients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 text-sm text-gray-600">
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
                <Heart className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <CardTitle>Rehabilitation Centers</CardTitle>
                <CardDescription>
                  Continued therapy and recovery support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-left space-y-2 text-sm text-gray-600">
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
      </section>

      {/* Benefits of Partnership */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Benefits of Partnership
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">
                For Healthcare Providers
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Improved Patient Outcomes</h4>
                    <p className="text-gray-600">
                      Better continuity of care leads to improved health
                      outcomes and patient satisfaction.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Reduced Readmissions</h4>
                    <p className="text-gray-600">
                      Professional home care support helps prevent complications
                      and hospital readmissions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Enhanced Reputation</h4>
                    <p className="text-gray-600">
                      Partner with a trusted home care provider to enhance your
                      organization's reputation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Streamlined Referrals</h4>
                    <p className="text-gray-600">
                      Easy referral process with dedicated liaison support and
                      regular communication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">
                For Patients & Families
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Seamless Transitions</h4>
                    <p className="text-gray-600">
                      Smooth transition from hospital or clinic to home care
                      without gaps in service.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Coordinated Care</h4>
                    <p className="text-gray-600">
                      All healthcare providers work together to ensure
                      comprehensive, coordinated care.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Comfort of Home</h4>
                    <p className="text-gray-600">
                      Receive professional care in the familiar, comfortable
                      environment of home.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Family Support</h4>
                    <p className="text-gray-600">
                      Education and support for family members to participate in
                      the care process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Partnership Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            How Partnership Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <CardTitle>Initial Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Reach out to discuss partnership opportunities and patient
                  needs.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <CardTitle>Care Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We assess patient needs and develop appropriate care plans.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <CardTitle>Service Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Professional caregivers begin providing services in the
                  patient's home.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <CardTitle>Ongoing Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Regular updates and communication about patient progress and
                  outcomes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-green-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Start a Partnership
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Partnership Inquiry Form</CardTitle>
              <CardDescription>
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
                    className="w-full bg-green-600 hover:bg-green-700"
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

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Partner?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact our partnership team to discuss opportunities and get
            started.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600">(416) 123-4567 ext. 200</p>
                <p className="text-sm text-gray-500">Partnership Development</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600">partnerships@torontohomecare.ca</p>
                <p className="text-sm text-gray-500">
                  We'll respond within 24 hours
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
