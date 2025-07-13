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
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Join Our <span className="text-blue-600">Caring Team</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Make a meaningful difference in people's lives while building a
              rewarding career in home healthcare. We're looking for
              compassionate, dedicated caregivers to join our growing team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                onClick={() => setShowForm(true)}
              >
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 bg-transparent"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us: (555) 123-4567
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe in supporting our caregivers with competitive benefits,
              ongoing training, and a supportive work environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Meaningful Work
              </h3>
              <p className="text-gray-600">
                Make a real difference in people's lives every day
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Job Security
              </h3>
              <p className="text-gray-600">
                Growing industry with stable employment opportunities
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Flexible Schedule
              </h3>
              <p className="text-gray-600">
                Choose shifts that work with your lifestyle
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Supportive Team
              </h3>
              <p className="text-gray-600">
                Work with experienced professionals who care
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Competitive Benefits Package
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Competitive Hourly Rates
                    </h3>
                    <p className="text-gray-600">
                      Starting from $18-25/hour based on experience
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Health Benefits
                    </h3>
                    <p className="text-gray-600">
                      Medical, dental, and vision coverage available
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Paid Training
                    </h3>
                    <p className="text-gray-600">
                      Comprehensive training program with ongoing education
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Flexible Scheduling
                    </h3>
                    <p className="text-gray-600">
                      Part-time and full-time positions available
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Career Growth
                    </h3>
                    <p className="text-gray-600">
                      Opportunities for advancement and specialization
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-6">
                <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">
                  What Our Caregivers Say
                </h3>
              </div>
              <blockquote className="text-gray-600 italic mb-4">
                "Working here has been incredibly rewarding. The support from
                management and the flexibility to choose my schedule has made
                this the best job I've ever had. I truly feel like I'm making a
                difference in my clients' lives."
              </blockquote>
              <div className="text-center">
                <p className="font-semibold text-gray-900">Sarah M.</p>
                <p className="text-sm text-gray-500">
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Requirements & Qualifications
            </h2>
            <p className="text-lg text-gray-600">
              We welcome both experienced caregivers and those new to the field
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">
                  Preferred Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>PSW (Personal Support Worker) certification</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Previous caregiving experience</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>First Aid & CPR certification</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Valid driver's license</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Multilingual abilities</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">
                  Essential Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Compassionate and patient personality</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Reliable and punctual</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Clear background check</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Physical ability to assist clients</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Strong communication skills</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      {showForm && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Caregiver Application
                </CardTitle>
                <CardDescription className="text-center">
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
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700"
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

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Caregiving Career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our team of dedicated professionals making a difference in
            people's lives every day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
              onClick={() => setShowForm(true)}
            >
              Apply Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 bg-transparent"
              asChild
            >
              <a href="mailto:careers@homecare.com">
                <Mail className="mr-2 h-5 w-5" />
                careers@homecare.com
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
