import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  CheckCircle,
  Stethoscope,
  Heart,
  Activity,
} from "lucide-react";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function InHomeNursingPage() {
  return (
    <div className="min-h-screen bg-brand-body">
      {/* Header */}
      <section className="bg-brand-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="h-20 w-20 text-brand-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-6">
              In-Home Nursing Care
            </h1>
            <p className="text-xl text-brand-textSecondary max-w-3xl mx-auto">
              Skilled nursing services delivered by registered and licensed
              practical nurses to support your health and medical needs at home.
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
                Nursing Services We Provide
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Medication Management</h3>
                    <p className="text-gray-600">
                      Administration, monitoring, and education about
                      medications
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Wound Care</h3>
                    <p className="text-gray-600">
                      Dressing changes, wound assessment, and healing monitoring
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Vital Signs Monitoring</h3>
                    <p className="text-gray-600">
                      Blood pressure, temperature, pulse, and oxygen monitoring
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
                      Diabetes care, heart condition monitoring, and symptom
                      management
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Health Education</h3>
                    <p className="text-gray-600">
                      Teaching about conditions, medications, and self-care
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Our Nursing Team</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Stethoscope className="h-6 w-6 text-blue-500 mr-3" />
                  <span>Registered Nurses (RN)</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-6 w-6 text-red-500 mr-3" />
                  <span>Licensed Practical Nurses (LPN)</span>
                </div>
                <div className="flex items-center">
                  <Activity className="h-6 w-6 text-green-500 mr-3" />
                  <span>Specialized certifications</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-purple-500 mr-3" />
                  <span>Fully licensed and insured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Care Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Specialized Nursing Care
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Post-Surgical Care</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Incision monitoring and care</li>
                  <li>• Pain management support</li>
                  <li>• Recovery progress tracking</li>
                  <li>• Complication prevention</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Chronic Condition Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Diabetes management</li>
                  <li>• Heart condition monitoring</li>
                  <li>• COPD care support</li>
                  <li>• Medication compliance</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Palliative Care</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Comfort care measures</li>
                  <li>• Symptom management</li>
                  <li>• Family support and education</li>
                  <li>• Coordination with physicians</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Need Professional Nursing Care?"
        subtitle="Our skilled nurses are ready to provide the medical care you need at home."
        primaryButtonText="Request Your Care Plan"
        secondaryButtonText="Call (416) 555-2273"
        showSubtitle={true}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
