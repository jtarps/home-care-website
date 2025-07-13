import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, CreditCard, FileText, HelpCircle } from "lucide-react"

export default function CostsInsurancePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Costs & Insurance</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent pricing and flexible payment options to make quality home care accessible.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Service Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Personal Support Worker (PSW)</CardTitle>
                <CardDescription>Daily living assistance and companionship</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Companion Care</span>
                    <span className="font-semibold">$25-30/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Personal Care</span>
                    <span className="font-semibold">$35-40/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Specialized Care</span>
                    <span className="font-semibold">$45-55/hr</span>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">Minimum 4 hours per visit</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle>Nursing Care</CardTitle>
                <CardDescription>Professional medical care services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>LPN Services</span>
                    <span className="font-semibold">$55-65/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RN Services</span>
                    <span className="font-semibold">$70-85/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Specialized Nursing</span>
                    <span className="font-semibold">$85-100/hr</span>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">Minimum 2 hours per visit</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Physiotherapy</CardTitle>
                <CardDescription>Rehabilitation and mobility services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Initial Assessment</span>
                    <span className="font-semibold">$120-150</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Treatment Session</span>
                    <span className="font-semibold">$90-110/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Group Sessions</span>
                    <span className="font-semibold">$60-80/hr</span>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">1 hour sessions typical</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Insurance & Payment */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Insurance & Payment Options</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Accepted Insurance Plans</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Ontario Health Insurance Plan (OHIP)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Private Health Insurance</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Veterans Affairs Canada (VAC)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Workplace Safety Insurance Board (WSIB)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Motor Vehicle Accident Claims</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Extended Health Benefits</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Payment Methods</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-blue-500 mr-3" />
                  <span>Credit/Debit Cards</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-green-500 mr-3" />
                  <span>Direct Billing to Insurance</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-500 mr-3" />
                  <span>Electronic Fund Transfer</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-orange-500 mr-3" />
                  <span>Monthly Invoicing</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-red-500 mr-3" />
                  <span>Flexible Payment Plans</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Billing Works */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How Billing Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <CardTitle>Service Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our caregivers provide services and document care provided during each visit.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <CardTitle>Insurance Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We submit claims directly to your insurance provider or provide receipts for reimbursement.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <CardTitle>Payment & Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  You receive detailed invoices and can track payments through our client portal.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cost FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Cost-Related FAQs</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Is home care covered by OHIP?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Some nursing services may be covered by OHIP, particularly for post-acute care. PSW services are
                  typically not covered by OHIP but may be covered by private insurance or government programs for
                  eligible individuals.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Do you offer payment plans?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, we offer flexible payment plans for families who need financial assistance. Contact our billing
                  department to discuss options that work for your budget.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  What's included in the hourly rate?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our hourly rates include the caregiver's time, supervision, care coordination, and administrative
                  support. Additional supplies or equipment may be charged separately.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Can I get a cost estimate?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We provide free cost estimates based on your specific care needs. Contact us for a consultation and
                  personalized quote.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Questions About Costs or Insurance?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our billing specialists are here to help you understand your options and maximize your benefits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Cost Estimate
            </Button>
            <Button variant="outline" size="lg">
              Speak with Billing
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
