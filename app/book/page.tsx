"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  User,
  Heart,
  CreditCard,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface FormData {
  // Step 1: Service Selection
  serviceType: string;
  careLevel: string;
  frequency: string;

  // Step 2: Personal Information
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  address: string;
  city: string;
  postalCode: string;
  relationshipToClient: string;

  // Step 3: Scheduling
  preferredDate: string;
  preferredTime: string;
  durationPerVisit: string;
}

const initialFormData: FormData = {
  serviceType: "",
  careLevel: "",
  frequency: "",
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  address: "",
  city: "",
  postalCode: "",
  relationshipToClient: "",
  preferredDate: "",
  preferredTime: "",
  durationPerVisit: "",
};

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.serviceType)
          newErrors.serviceType = "Please select a service type";
        if (!formData.careLevel)
          newErrors.careLevel = "Please select a care level";
        if (!formData.frequency)
          newErrors.frequency = "Please select frequency";
        break;
      case 2:
        if (!formData.clientName)
          newErrors.clientName = "Client name is required";
        if (!formData.clientEmail) newErrors.clientEmail = "Email is required";
        if (!formData.clientPhone)
          newErrors.clientPhone = "Phone number is required";
        break;
      case 3:
        if (!formData.preferredDate)
          newErrors.preferredDate = "Start date is required";
        if (!formData.preferredTime)
          newErrors.preferredTime = "Preferred time is required";
        if (!formData.durationPerVisit)
          newErrors.durationPerVisit = "Duration is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const submitForm = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Split client name into first and last name
      const nameParts = formData.clientName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // Prepare the data object with only the fields that exist in the database
      const submissionData: any = {
        first_name: firstName,
        last_name: lastName,
        email: formData.clientEmail,
        phone: formData.clientPhone,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        // Store service/care/frequency as additional_notes for admin follow-up
        additional_notes: `Service Type: ${formData.serviceType}\nCare Level: ${formData.careLevel}\nFrequency: ${formData.frequency}\nRelationship to Client: ${formData.relationshipToClient}`,
        preferred_start_date: formData.preferredDate || null,
        preferred_time: formData.preferredTime || null,
        duration_per_visit: formData.durationPerVisit || null,
        status: "pending",
        source: "booking",
      };

      const { data, error } = await supabase
        .from("intakes")
        .insert([submissionData])
        .select();

      if (error) {
        throw error;
      }

      window.location.href = "/book/confirmation";
    } catch (error) {
      setErrors({
        submit: "There was an error submitting your booking. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Service Selection</h2>
              <p className="text-gray-600">
                Tell us about the type of care you need
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="serviceType">Type of Service *</Label>
                <Select
                  value={formData.serviceType}
                  onValueChange={(value) =>
                    updateFormData("serviceType", value)
                  }
                >
                  <SelectTrigger
                    className={errors.serviceType ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Personal Support">
                      Personal Support
                    </SelectItem>
                    <SelectItem value="In-Home Nursing">
                      In-Home Nursing
                    </SelectItem>
                    <SelectItem value="Rehabilitation">
                      Rehabilitation
                    </SelectItem>
                    <SelectItem value="Specialty & Chronic Care">
                      Specialty & Chronic Care
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.serviceType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.serviceType}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="careLevel">Level of Care *</Label>
                <Select
                  value={formData.careLevel}
                  onValueChange={(value) => updateFormData("careLevel", value)}
                >
                  <SelectTrigger
                    className={errors.careLevel ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select care level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Light Care">Light Care</SelectItem>
                    <SelectItem value="Moderate Care">Moderate Care</SelectItem>
                    <SelectItem value="Intensive Care">
                      Intensive Care
                    </SelectItem>
                    <SelectItem value="Specialized Care">
                      Specialized Care
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.careLevel && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.careLevel}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="frequency">Frequency *</Label>
                <Select
                  value={formData.frequency}
                  onValueChange={(value) => updateFormData("frequency", value)}
                >
                  <SelectTrigger
                    className={errors.frequency ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="How often do you need care?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="As needed">As needed</SelectItem>
                  </SelectContent>
                </Select>
                {errors.frequency && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.frequency}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
              <p className="text-gray-600">
                We need your contact details to get started
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => updateFormData("clientName", e.target.value)}
                  className={errors.clientName ? "border-red-500" : ""}
                  placeholder="Full name of person receiving care"
                />
                {errors.clientName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.clientName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientEmail">Email *</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) =>
                      updateFormData("clientEmail", e.target.value)
                    }
                    className={errors.clientEmail ? "border-red-500" : ""}
                  />
                  {errors.clientEmail && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.clientEmail}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="clientPhone">Phone Number *</Label>
                  <Input
                    id="clientPhone"
                    type="tel"
                    value={formData.clientPhone}
                    onChange={(e) =>
                      updateFormData("clientPhone", e.target.value)
                    }
                    className={errors.clientPhone ? "border-red-500" : ""}
                  />
                  {errors.clientPhone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.clientPhone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="relationshipToClient">
                    Your Relationship to Client *
                  </Label>
                  <Select
                    value={formData.relationshipToClient}
                    onValueChange={(value) =>
                      updateFormData("relationshipToClient", value)
                    }
                  >
                    <SelectTrigger
                      className={
                        errors.relationshipToClient ? "border-red-500" : ""
                      }
                    >
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Self">Self</SelectItem>
                      <SelectItem value="Spouse/Partner">
                        Spouse/Partner
                      </SelectItem>
                      <SelectItem value="Child">Child</SelectItem>
                      <SelectItem value="Parent">Parent</SelectItem>
                      <SelectItem value="Sibling">Sibling</SelectItem>
                      <SelectItem value="Other Family">Other Family</SelectItem>
                      <SelectItem value="Friend">Friend</SelectItem>
                      <SelectItem value="Healthcare Provider">
                        Healthcare Provider
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.relationshipToClient && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.relationshipToClient}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) =>
                      updateFormData("postalCode", e.target.value)
                    }
                    className={errors.postalCode ? "border-red-500" : ""}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Scheduling</h2>
              <p className="text-gray-600">
                When would you like care to begin?
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="preferredDate">Preferred Start Date *</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) =>
                    updateFormData("preferredDate", e.target.value)
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className={errors.preferredDate ? "border-red-500" : ""}
                />
                {errors.preferredDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.preferredDate}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="preferredTime">Preferred Time *</Label>
                <Select
                  value={formData.preferredTime}
                  onValueChange={(value) =>
                    updateFormData("preferredTime", value)
                  }
                >
                  <SelectTrigger
                    className={errors.preferredTime ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Morning (8AM - 12PM)">
                      Morning (8AM - 12PM)
                    </SelectItem>
                    <SelectItem value="Afternoon (12PM - 5PM)">
                      Afternoon (12PM - 5PM)
                    </SelectItem>
                    <SelectItem value="Evening (5PM - 9PM)">
                      Evening (5PM - 9PM)
                    </SelectItem>
                    <SelectItem value="Overnight (9PM - 8AM)">
                      Overnight (9PM - 8AM)
                    </SelectItem>
                    <SelectItem value="Flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
                {errors.preferredTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.preferredTime}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="durationPerVisit">Duration per Visit *</Label>
                <Select
                  value={formData.durationPerVisit}
                  onValueChange={(value) =>
                    updateFormData("durationPerVisit", value)
                  }
                >
                  <SelectTrigger
                    className={errors.durationPerVisit ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2 hours">1-2 hours</SelectItem>
                    <SelectItem value="3-4 hours">3-4 hours</SelectItem>
                    <SelectItem value="5-8 hours">5-8 hours</SelectItem>
                    <SelectItem value="12 hours">12 hours</SelectItem>
                    <SelectItem value="24 hours">24 hours</SelectItem>
                  </SelectContent>
                </Select>
                {errors.durationPerVisit && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.durationPerVisit}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book Your Care Service
          </h1>
          <p className="text-gray-600">
            Complete the form below to schedule your personalized care
            consultation
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card>
          <CardContent className="p-8">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button onClick={nextStep} className="flex items-center">
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={submitForm}
                  disabled={isSubmitting}
                  className="flex items-center bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Booking
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Need help with your booking?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <a href="tel:+14165552273">Call (416) 555-2273</a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
