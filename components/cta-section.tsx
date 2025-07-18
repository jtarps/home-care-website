import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Phone } from "lucide-react";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  phoneNumber?: string;
  showSubtitle?: boolean;
}

export default function CTASection({
  title = "Ready to Get Started?",
  subtitle = "Contact us today for a free consultation and let us create a personalized care plan for you or your loved one.",
  primaryButtonText = "Request Your Care Plan",
  secondaryButtonText = "Call (416) 555-2273",
  phoneNumber = "(416) 555-2273",
  showSubtitle = false,
}: CTASectionProps) {
  return (
    <section className="relative py-24 bg-gradient-to-b from-brand-background to-brand-primary">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        {/* Centered CTA Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-2xl border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-text mb-6">
                {title}
              </h2>
              {showSubtitle && (
                <p className="text-xl text-brand-textSecondary mb-10 max-w-3xl mx-auto">
                  {subtitle}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href="/book" className="inline-block">
                  <div className="bg-brand-primary text-white hover:bg-brand-primary/90 font-bold py-5 px-12 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-200 cursor-pointer flex items-center justify-center text-lg md:text-xl gap-2">
                    {primaryButtonText}
                    <span className="inline-block animate-bounce ml-2">
                      <ArrowRight className="h-6 w-6" />
                    </span>
                  </div>
                </Link>
                <a
                  href={`tel:+1${phoneNumber.replace(/\D/g, "")}`}
                  className="inline-block"
                >
                  <div className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white bg-transparent font-bold py-5 px-12 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-200 cursor-pointer flex items-center justify-center text-lg md:text-xl">
                    <Phone className="h-6 w-6 mr-2" />
                    {secondaryButtonText}
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
