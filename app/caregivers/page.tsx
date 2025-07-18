"use client";

import type React from "react";
import { ChangeEvent } from "react";

import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Heart,
  Shield,
  Clock,
  Users,
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import Link from "next/link";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  dateOfBirth: string;
  experienceYears: string;
  certifications: string;
  specializations: string[];
  availability: string[];
  languages: string;
  hourlyRateExpectation: string;
  whyInterested: string;
  previousExperience: string;
  professionalReferences: string;
  backgroundCheckConsent: boolean;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  dateOfBirth: "",
  experienceYears: "",
  certifications: "",
  specializations: [],
  availability: [],
  languages: "",
  hourlyRateExpectation: "",
  whyInterested: "",
  previousExperience: "",
  professionalReferences: "",
  backgroundCheckConsent: false,
};

const specializationOptions = [
  "Personal Care",
  "Medication Management",
  "Nursing Care",
  "Wound Care",
  "Companionship",
  "Light Housekeeping",
  "Physical Therapy",
  "Mobility Assistance",
  "Dementia Care",
  "Post-Surgery Care",
];

const availabilityOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function CaregiversPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [documents, setDocuments] = useState<File[]>([]);

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSpecialization = (spec: string) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter((s) => s !== spec)
        : [...prev.specializations, spec],
    }));
  };

  const toggleAvailability = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day],
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files));
    }
  };

  const submitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload documents to Supabase Storage
      let documentUrls: string[] = [];
      if (documents.length > 0) {
        for (const file of documents) {
          const { data, error } = await supabase.storage
            .from("caregiver-documents")
            .upload(`applications/${Date.now()}-${file.name}`, file);
          if (error) throw error;
          // Get public URL
          const { data: publicUrlData } = supabase.storage
            .from("caregiver-documents")
            .getPublicUrl(data.path);
          documentUrls.push(publicUrlData.publicUrl);
        }
      }
      // Map form data to database columns
      const applicationData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address || null,
        city: formData.city || null,
        postal_code: formData.postalCode || null,
        date_of_birth: formData.dateOfBirth || null,
        experience_years: formData.experienceYears
          ? Number.parseInt(formData.experienceYears)
          : null,
        certifications: formData.certifications
          ? formData.certifications.split(",").map((c) => c.trim())
          : [],
        specializations: formData.specializations,
        availability: formData.availability,
        languages: formData.languages
          ? formData.languages.split(",").map((l) => l.trim())
          : [],
        hourly_rate_expectation: formData.hourlyRateExpectation
          ? Number.parseFloat(formData.hourlyRateExpectation)
          : null,
        why_interested: formData.whyInterested || null,
        previous_experience: formData.previousExperience || null,
        professional_references: formData.professionalReferences || null,
        background_check_consent: formData.backgroundCheckConsent,
        status: "pending",
        documents: documentUrls,
      };

      const { error } = await supabase
        .from("caregiver_applications")
        .insert([applicationData]);

      if (error) throw error;

      toast.success(
        "Application submitted successfully! We'll be in touch soon."
      );
      setFormData(initialFormData);
      setDocuments([]);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-body">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-brand-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-brand-text mb-6">
              Join Our <span className="text-brand-primary">Caring Team</span>
            </h1>
            <p className="text-xl text-brand-textSecondary mb-8 max-w-3xl mx-auto">
              Make a meaningful difference in people's lives while building a
              rewarding career in home healthcare. We're looking for
              compassionate, dedicated caregivers to join our growing team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-3"
                onClick={() => {
                  setShowForm(true);
                  // Scroll to form when it appears
                  setTimeout(() => {
                    document
                      .getElementById("application-form")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-3 bg-transparent"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us: (416) 555-2273
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-brand-textSecondary max-w-2xl mx-auto">
              We believe in supporting our caregivers with competitive benefits,
              ongoing training, and a supportive work environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-brand-secondary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="text-xl font-semibold text-brand-text mb-2">
                Meaningful Work
              </h3>
              <p className="text-brand-textSecondary">
                Make a real difference in people's lives every day
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-secondary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="text-xl font-semibold text-brand-text mb-2">
                Job Security
              </h3>
              <p className="text-brand-textSecondary">
                Growing industry with stable employment opportunities
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-secondary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="text-xl font-semibold text-brand-text mb-2">
                Flexible Schedule
              </h3>
              <p className="text-brand-textSecondary">
                Choose shifts that work with your lifestyle
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-secondary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="text-xl font-semibold text-brand-text mb-2">
                Supportive Team
              </h3>
              <p className="text-brand-textSecondary">
                Work with experienced professionals who care
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-6">
                Competitive Benefits Package
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-secondary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-brand-text">
                      Competitive Compensation
                    </h3>
                    <p className="text-brand-textSecondary">
                      Attractive rates based on experience and qualifications
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-secondary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-brand-text">
                      Health Benefits
                    </h3>
                    <p className="text-brand-textSecondary">
                      Medical, dental, and vision coverage available
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-secondary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-brand-text">
                      Paid Training
                    </h3>
                    <p className="text-brand-textSecondary">
                      Comprehensive training program with ongoing education
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-secondary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-brand-text">
                      Flexible Scheduling
                    </h3>
                    <p className="text-brand-textSecondary">
                      Part-time and full-time positions available
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-brand-secondary mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-brand-text">
                      Career Growth
                    </h3>
                    <p className="text-brand-textSecondary">
                      Opportunities for advancement and specialization
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-6">
                <Star className="h-12 w-12 text-brand-highlight mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-brand-text">
                  What Our Caregivers Say
                </h3>
              </div>
              <blockquote className="text-brand-textSecondary italic mb-4">
                "Working here has been incredibly rewarding. The support from
                management and the flexibility to choose my schedule has made
                this the best job I've ever had. I truly feel like I'm making a
                difference in my clients' lives."
              </blockquote>
              <div className="text-center">
                <p className="font-semibold text-brand-text">Sarah M.</p>
                <p className="text-sm text-brand-textSecondary">
                  Personal Support Worker, 3 years
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">
              Requirements & Qualifications
            </h2>
            <p className="text-lg text-brand-textSecondary">
              We welcome both experienced caregivers and those new to the field
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-brand-secondary">
                  Preferred Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-brand-secondary mr-2" />
                  <span>PSW (Personal Support Worker) certification</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-brand-secondary mr-2" />
                  <span>Previous caregiving experience</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-brand-secondary mr-2" />
                  <span>First Aid & CPR certification</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-brand-secondary mr-2" />
                  <span>Valid driver's license</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-brand-secondary mr-2" />
                  <span>Multilingual abilities</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-brand-primary">
                  Essential Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-brand-primary mr-2" />
                  <span>Compassionate and patient personality</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-brand-primary mr-2" />
                  <span>Reliable and punctual</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-brand-primary mr-2" />
                  <span>Clear background check</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-brand-primary mr-2" />
                  <span>Physical ability to assist clients</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-brand-primary mr-2" />
                  <span>Strong communication skills</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      {showForm && (
        <section
          id="application-form"
          className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-background"
        >
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center text-brand-text">
                  Caregiver Application
                </CardTitle>
                <CardDescription className="text-center text-brand-textSecondary">
                  Please fill out all required fields to submit your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={submitApplication} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) =>
                            handleInputChange("dateOfBirth", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Address Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) =>
                            handleInputChange("address", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) =>
                            handleInputChange("postalCode", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Professional Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="experienceYears">
                          Years of Experience
                        </Label>
                        <Input
                          id="experienceYears"
                          type="number"
                          min="0"
                          value={formData.experienceYears}
                          onChange={(e) =>
                            handleInputChange("experienceYears", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="hourlyRateExpectation">
                          Hourly Rate Expectation ($)
                        </Label>
                        <Input
                          id="hourlyRateExpectation"
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.hourlyRateExpectation}
                          onChange={(e) =>
                            handleInputChange(
                              "hourlyRateExpectation",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="certifications">
                        Certifications (comma-separated)
                      </Label>
                      <Input
                        id="certifications"
                        value={formData.certifications}
                        onChange={(e) =>
                          handleInputChange("certifications", e.target.value)
                        }
                        placeholder="e.g., PSW, First Aid, CPR"
                      />
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="languages">
                        Languages Spoken (comma-separated)
                      </Label>
                      <Input
                        id="languages"
                        value={formData.languages}
                        onChange={(e) =>
                          handleInputChange("languages", e.target.value)
                        }
                        placeholder="e.g., English, French, Spanish"
                      />
                    </div>
                  </div>

                  {/* Specializations */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Areas of Specialization
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {specializationOptions.map((spec) => (
                        <div key={spec} className="flex items-center space-x-2">
                          <Checkbox
                            id={spec}
                            checked={formData.specializations.includes(spec)}
                            onCheckedChange={() => toggleSpecialization(spec)}
                          />
                          <Label htmlFor={spec} className="text-sm">
                            {spec}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Availability
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {availabilityOptions.map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox
                            id={day}
                            checked={formData.availability.includes(day)}
                            onCheckedChange={() => toggleAvailability(day)}
                          />
                          <Label htmlFor={day} className="text-sm">
                            {day}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience & Motivation */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Experience & Motivation
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="whyInterested">
                          Why are you interested in becoming a caregiver?
                        </Label>
                        <Textarea
                          id="whyInterested"
                          value={formData.whyInterested}
                          onChange={(e) =>
                            handleInputChange("whyInterested", e.target.value)
                          }
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="previousExperience">
                          Describe your previous caregiving experience
                        </Label>
                        <Textarea
                          id="previousExperience"
                          value={formData.previousExperience}
                          onChange={(e) =>
                            handleInputChange(
                              "previousExperience",
                              e.target.value
                            )
                          }
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="professionalReferences">
                          Professional References (Name, Title, Phone)
                        </Label>
                        <Textarea
                          id="professionalReferences"
                          value={formData.professionalReferences}
                          onChange={(e) =>
                            handleInputChange(
                              "professionalReferences",
                              e.target.value
                            )
                          }
                          rows={3}
                          placeholder="Please provide at least 2 professional references"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div>
                    <Label htmlFor="documents">
                      Upload Documents (certifications, resume, etc.)
                    </Label>
                    <Input
                      id="documents"
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    {documents.length > 0 && (
                      <ul className="mt-2 text-sm text-gray-600">
                        {documents.map((file, idx) => (
                          <li key={idx}>{file.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Background Check Consent */}
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="backgroundCheckConsent"
                        checked={formData.backgroundCheckConsent}
                        onCheckedChange={(checked) =>
                          handleInputChange(
                            "backgroundCheckConsent",
                            checked as boolean
                          )
                        }
                        required
                      />
                      <Label
                        htmlFor="backgroundCheckConsent"
                        className="text-sm"
                      >
                        I consent to a background check being conducted as part
                        of the application process *
                      </Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                      className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-brand-primary hover:bg-brand-primary/90"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-b from-brand-background to-brand-primary">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          {/* Centered CTA Card */}
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white shadow-2xl border-0">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text mb-6">
                  Ready to Start Your Caregiving Career?
                </h2>
                <p className="text-xl text-brand-textSecondary mb-10 max-w-3xl mx-auto">
                  Join our team of dedicated professionals making a difference
                  in people's lives every day.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Button
                    size="lg"
                    className="bg-brand-primary text-white hover:bg-brand-primary/90 px-8 py-3 font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-200"
                    onClick={() => {
                      setShowForm(true);
                      setTimeout(() => {
                        document
                          .getElementById("application-form")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                  >
                    Apply Now
                    <span className="inline-block animate-bounce ml-2">
                      <ArrowRight className="h-6 w-6" />
                    </span>
                  </Button>
                  <a
                    href="mailto:careers@havenathome.com"
                    className="inline-block"
                  >
                    <div className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white bg-transparent font-bold py-5 px-12 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-200 cursor-pointer flex items-center justify-center text-lg md:text-xl">
                      <Mail className="h-6 w-6 mr-2" />
                      careers@havenathome.com
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
