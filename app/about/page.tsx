"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Shield,
  Users,
  Star,
  Check,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const teamCards = [
    {
      id: 1,
      title: "Screened Thoroughly",
      icon: Shield,
      items: [
        "Background & reference checks",
        "In-depth interviews assessing empathy, skill, and fit",
      ],
    },
    {
      id: 2,
      title: "Trained Continuously",
      icon: Star,
      items: [
        "Ongoing clinical and soft-skills workshops",
        "Access to mental-health and peer-support resources",
      ],
    },
    {
      id: 3,
      title: "Cared For",
      icon: Heart,
      items: [
        "Above-market compensation & benefits",
        "Flexible scheduling & career growth",
        "Regular feedback loops and recognition",
      ],
    },
    {
      id: 4,
      title: "Experienced Professionals",
      icon: Award,
      items: [
        "Minimum 3 years of caregiving experience",
        "Specialized training in various care needs",
      ],
    },
    {
      id: 5,
      title: "Dedicated Support",
      icon: Users,
      items: [
        "24/7 clinical supervision and support",
        "Regular check-ins and performance reviews",
      ],
    },
    {
      id: 6,
      title: "Continuous Growth",
      icon: Star,
      items: [
        "Career advancement opportunities",
        "Professional development programs",
      ],
    },
  ];

  const totalSlides = Math.ceil(teamCards.length / 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const visibleCards = teamCards.slice(currentSlide * 3, currentSlide * 3 + 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-background to-brand-primary/10 py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.jpg"
            alt="Compassionate home care"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-background/80 to-brand-primary/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Heart className="h-20 w-20 text-brand-primary mx-auto lg:mx-0 mb-8" />
              <h1 className="text-5xl md:text-6xl font-bold text-brand-text mb-6">
                Care That Feels Like Family
              </h1>
              <p className="text-xl md:text-2xl text-brand-textSecondary max-w-4xl mx-auto lg:mx-0 leading-relaxed">
                Compassionate, 24/7 home care designed around the people you
                love most—on your terms, in your home.
              </p>
            </div>
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.jpg"
                  alt="Family receiving compassionate care at home"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-8">
                Our Mission
              </h2>
              <p className="text-lg text-brand-textSecondary leading-relaxed mb-8">
                To empower families to keep their loved ones safe, happy, and
                thriving at home—by delivering personalized, around-the-clock
                care that honors dignity and independence.
              </p>
              <div className="bg-brand-secondary/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-brand-text mb-4">
                  Our Vision
                </h3>
                <p className="text-brand-textSecondary leading-relaxed">
                  A world where aging and recovery happen where they
                  belong—surrounded by familiar walls, cherished memories, and
                  the people who care the most.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-brand-background p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-brand-text mb-6">
                  Core Values
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Heart className="h-6 w-6 text-brand-primary mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-brand-text mb-2">
                        People First
                      </h4>
                      <p className="text-brand-textSecondary">
                        Every decision—big or small—starts with the needs of our
                        clients and our caregivers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="h-6 w-6 text-brand-primary mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-brand-text mb-2">
                        Integrity & Trust
                      </h4>
                      <p className="text-brand-textSecondary">
                        We keep our promises, respect your home, and uphold the
                        highest standards of safety and privacy.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-6 w-6 text-brand-primary mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-brand-text mb-2">
                        Family-Driven Care
                      </h4>
                      <p className="text-brand-textSecondary">
                        We treat your family like our own, always listening,
                        learning, and adapting to what matters most.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Star className="h-6 w-6 text-brand-primary mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-brand-text mb-2">
                        Continuous Excellence
                      </h4>
                      <p className="text-brand-textSecondary">
                        We invest in people, processes, and technology so that
                        our care only gets better with time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative Image */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.jpg"
                  alt="Family care"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-brand-background relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <Image src="/placeholder.jpg" alt="" fill className="object-cover" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-8">
              Our Story
            </h2>
            <p className="text-lg text-brand-textSecondary leading-relaxed">
              When our founder cared for a grandparent recovering from surgery,
              they watched institutional schedules and rotating staff erode her
              independence. That experience sparked a mission: to make same-day,
              24/7 home care so seamless and compassionate that families never
              feel forced into a nursing "community" again. Thus, Haven at Home
              was born—built on the belief that home is the heart of healing.
            </p>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-6">
              Our Philosophy
            </h2>
            <p className="text-xl text-brand-textSecondary max-w-3xl mx-auto">
              We reject "one-size-fits-all" care. Instead, every care plan is
              tailored to your unique needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg border-0 overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.jpg"
                  alt="Holistic care team"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-brand-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-brand-text mb-4">
                  Holistic Teams
                </h3>
                <p className="text-brand-textSecondary">
                  Personal Support Workers, nurses, and therapists working in
                  concert to provide comprehensive care.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.jpg"
                  alt="24/7 availability"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-brand-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-brand-text mb-4">
                  Total Availability
                </h3>
                <p className="text-brand-textSecondary">
                  Nights, weekends, holidays, emergencies—no more waiting for
                  "office hours."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.jpg"
                  alt="Family partnership"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 text-brand-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-brand-text mb-4">
                  Family Partnership
                </h3>
                <p className="text-brand-textSecondary">
                  You're part of the team, with real-time updates via our
                  private portal.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-6">
              Our Promise
            </h2>
            <p className="text-xl text-brand-textSecondary max-w-3xl mx-auto">
              We make these commitments to every family we serve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="font-semibold text-brand-text mb-2">
                Same-Day Starts
              </h3>
              <p className="text-brand-textSecondary text-sm">
                Because life doesn't wait.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="font-semibold text-brand-text mb-2">
                Consistent Caregivers
              </h3>
              <p className="text-brand-textSecondary text-sm">
                You'll see familiar faces, not rotating temps.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="font-semibold text-brand-text mb-2">
                Transparent Pricing
              </h3>
              <p className="text-brand-textSecondary text-sm">
                No surprises—clear rates, clear scheduling, clear communication.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="font-semibold text-brand-text mb-2">
                Caregiver Well-Being
              </h3>
              <p className="text-brand-textSecondary text-sm">
                We treat our caregivers with respect, fair pay, and ongoing
                support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-brand-textSecondary max-w-3xl mx-auto">
              Every caregiver at Haven at Home is carefully selected and
              continuously supported.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-gray-200"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-brand-primary" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-gray-200"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 text-brand-primary" />
            </button>

            {/* Cards Container */}
            <div className="grid md:grid-cols-3 gap-8 px-8">
              {visibleCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <Card
                    key={card.id}
                    className="bg-white shadow-lg border-0 overflow-hidden"
                  >
                    <div className="relative h-48">
                      <Image
                        src="/placeholder.jpg"
                        alt={card.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-8">
                      <div className="text-center mb-6">
                        <IconComponent className="h-12 w-12 text-brand-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-brand-text">
                          {card.title}
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {card.items.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-brand-textSecondary">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? "bg-brand-primary scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-brand-textSecondary italic">
              Because when our team thrives, your family thrives.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Experience Care That Feels Like Family?"
        subtitle="Contact us today to learn how we can support your family with compassionate, personalized home care."
        primaryButtonText="Get Started Today"
        secondaryButtonText="Call (416) 555-2273"
        showSubtitle={true}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
