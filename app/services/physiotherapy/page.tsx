import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckCircle, Activity, Target, Zap } from "lucide-react"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default function PhysiotherapyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Users className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">In-Home Physiotherapy</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional physiotherapy services delivered in the comfort of your home to improve mobility, reduce
              pain, and enhance your quality of life.
            </p>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Physiotherapy Services</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Mobility Assessment</h3>
                    <p className="text-gray-600">Comprehensive evaluation of movement and functional abilities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Exercise Therapy</h3>
                    <p className="text-gray-600">Customized exercise programs to improve strength and mobility</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Pain Management</h3>
                    <p className="text-gray-600">Techniques to reduce pain and improve comfort</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Fall Prevention</h3>
                    <p className="text-gray-600">Balance training and home safety assessments</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold">Equipment Training</h3>
                    <p className="text-gray-600">Proper use of mobility aids and assistive devices</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Treatment Approach</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Target className="h-6 w-6 text-green-500 mr-3" />
                  <span>Goal-oriented treatment plans</span>
                </div>
                <div className="flex items-center">
                  <Activity className="h-6 w-6 text-blue-500 mr-3" />
                  <span>Evidence-based techniques</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-6 w-6 text-yellow-500 mr-3" />
                  <span>Progressive therapy programs</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-purple-500 mr-3" />
                  <span>Family education and support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Conditions We Treat</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Post-Surgery Recovery</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Joint replacement recovery</li>
                  <li>• Fracture rehabilitation</li>
                  <li>• Post-operative mobility</li>
                  <li>• Strength restoration</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Neurological Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Stroke rehabilitation</li>
                  <li>• Parkinson's disease support</li>
                  <li>• Balance disorders</li>
                  <li>• Mobility improvement</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Chronic Pain Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Arthritis management</li>
                  <li>• Back pain relief</li>
                  <li>• Joint pain treatment</li>
                  <li>• Movement therapy</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection 
        title="Start Your Recovery Journey"
        subtitle="Our licensed physiotherapists are ready to help you regain mobility and reduce pain."
        primaryButtonText="Book Physiotherapy"
        secondaryButtonText="Free Assessment"
        showSubtitle={true}
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}
