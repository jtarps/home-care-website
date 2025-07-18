import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, CheckCircle, Brain, Shield, Users, Clock } from "lucide-react";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function SpecialtyChronicCarePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="h-20 w-20 text-purple-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Specialty & Chronic Care
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized care for complex medical conditions including
              Alzheimer's, dementia, ALS, Parkinson's, cancer support, and
              end-of-life care.
            </p>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Specialized Care Services
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">
                      Alzheimer's & Dementia Care
                    </h3>
                    <p className="text-gray-600">
                      Memory care, behavioral support, and family education
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">ALS & Parkinson's Support</h3>
                    <p className="text-gray-600">
                      Progressive care planning and symptom management
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">
                      End-of-Life & Palliative Care
                    </h3>
                    <p className="text-gray-600">
                      Comfort care, pain management, and family support
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Cancer Support</h3>
                    <p className="text-gray-600">
                      Treatment support, recovery assistance, and emotional care
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">
                      Chronic Disease Management
                    </h3>
                    <p className="text-gray-600">
                      Diabetes, heart disease, and stroke care coordination
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Our Specialized Team</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Brain className="h-6 w-6 text-purple-500 mr-3" />
                  <span>Dementia care specialists</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-6 w-6 text-red-500 mr-3" />
                  <span>Palliative care nurses</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-blue-500 mr-3" />
                  <span>Chronic disease experts</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-green-500 mr-3" />
                  <span>Family support coordinators</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Conditions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Conditions We Specialize In
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Memory Care</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Alzheimer's disease</li>
                  <li>• Dementia care</li>
                  <li>• Memory loss support</li>
                  <li>• Behavioral management</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Neurological Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• ALS (Lou Gehrig's disease)</li>
                  <li>• Parkinson's disease</li>
                  <li>• Multiple sclerosis</li>
                  <li>• Stroke recovery</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Chronic Diseases</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Diabetes management</li>
                  <li>• Heart disease care</li>
                  <li>• COPD support</li>
                  <li>• Kidney disease</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cancer Support</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Treatment support</li>
                  <li>• Recovery assistance</li>
                  <li>• Symptom management</li>
                  <li>• Emotional support</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>End-of-Life Care</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Palliative care</li>
                  <li>• Comfort measures</li>
                  <li>• Family support</li>
                  <li>• Dignity preservation</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Mental Health Support</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Depression support</li>
                  <li>• Anxiety management</li>
                  <li>• Social isolation prevention</li>
                  <li>• Emotional wellness</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Care Approach */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Care Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand that each condition requires specialized knowledge
              and a compassionate approach tailored to individual needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Specialized Training</h3>
              <p className="text-gray-600 text-sm">
                Our caregivers receive specialized training for each condition
                we treat.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Family Involvement</h3>
              <p className="text-gray-600 text-sm">
                We work closely with families to ensure coordinated,
                comprehensive care.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">
                Round-the-clock availability for urgent needs and emergencies.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">Compassionate Care</h3>
              <p className="text-gray-600 text-sm">
                Every interaction is guided by empathy, respect, and
                understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Specialized Care When You Need It Most"
        subtitle="Our specialized care team is ready to provide the expert support you and your family deserve."
        primaryButtonText="Request Care"
        secondaryButtonText="Call (416) 555-2273"
        showSubtitle={true}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
