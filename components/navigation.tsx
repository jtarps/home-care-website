"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      {/* Top bar with animated marquee */}
      <div className="bg-[#1E3A8A] text-white py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="animate-marquee whitespace-nowrap">
              <span className="inline-block mr-8">24/7 Care Available</span>
              <span className="inline-block mr-8">
                Compassionate Caregivers
              </span>
              <span className="inline-block mr-8">Licensed & Insured</span>
              <span className="inline-block mr-8">Flexible Scheduling</span>
              <span className="inline-block mr-8">Family-Focused Care</span>
            </div>
            {/* <div className="font-semibold flex-shrink-0">
              Call Now: (416) 555-2273
            </div> */}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24 py-3">
            <div className="flex items-center">
              <Link href="/" className="text-3xl font-bold text-brand-primary">
                Haven at Home
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  href="/"
                  className="text-brand-text hover:text-brand-primary px-4 py-2 rounded-md text-base font-semibold transition-colors"
                >
                  Home
                </Link>
                {/* Services Dropdown */}
                <div className="relative inline-block">
                  <button
                    onClick={() => {
                      setServicesOpen(!servicesOpen);
                      setAboutOpen(false);
                    }}
                    className="text-brand-text hover:text-brand-primary px-4 py-2 rounded-md text-base font-semibold transition-colors flex items-center"
                  >
                    Services <ChevronDown className="ml-1 h-5 w-5" />
                  </button>
                  {servicesOpen && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border z-50">
                      <div className="py-1">
                        <Link
                          href="/services"
                          className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                          onClick={() => setServicesOpen(false)}
                        >
                          All Services
                        </Link>
                        <Link
                          href="/services/personal-support"
                          className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                          onClick={() => setServicesOpen(false)}
                        >
                          Personal Support
                        </Link>
                        <Link
                          href="/services/in-home-nursing"
                          className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                          onClick={() => setServicesOpen(false)}
                        >
                          In-Home Nursing
                        </Link>
                        <Link
                          href="/services/rehabilitation"
                          className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                          onClick={() => setServicesOpen(false)}
                        >
                          Rehabilitation
                        </Link>
                        <Link
                          href="/services/specialty-chronic-care"
                          className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                          onClick={() => setServicesOpen(false)}
                        >
                          Specialty & Chronic Care
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                {/* About Dropdown */}
                <div className="relative inline-block">
                  <button
                    onClick={() => {
                      setAboutOpen(!aboutOpen);
                      setServicesOpen(false);
                    }}
                    className="text-brand-text hover:text-brand-primary px-4 py-2 rounded-md text-base font-semibold transition-colors flex items-center"
                  >
                    Our Company <ChevronDown className="ml-1 h-5 w-5" />
                  </button>
                  {aboutOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border z-50">
                      <div className="py-1">
                        <Link
                          href="/about"
                          className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                          onClick={() => setAboutOpen(false)}
                        >
                          Our Story
                        </Link>
                        <Link
                          href="/contact"
                          className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100"
                          onClick={() => setAboutOpen(false)}
                        >
                          Contact
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <Link
                  href="/caregivers"
                  className="text-brand-text hover:text-brand-primary px-4 py-2 rounded-md text-base font-semibold transition-colors"
                >
                  Join Us
                </Link>
              </div>
            </div>

            <div className="px-3 py-2">
              <Button
                asChild
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-base py-3 px-6"
              >
                <a href="tel:+14165552273">Call (416) 555-2273</a>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <Link
                href="/"
                className="text-brand-text hover:text-brand-primary block px-3 py-2 rounded-md text-base font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-brand-text hover:text-brand-primary block px-3 py-2 rounded-md text-base font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-brand-text hover:text-brand-primary block px-3 py-2 rounded-md text-base font-semibold"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/caregivers"
                className="text-brand-text hover:text-brand-primary block px-3 py-2 rounded-md text-base font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Join Us
              </Link>
              <div className="px-3 py-2">
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-base py-3 px-6"
                >
                  <a href="tel:+14165552273">Call (416) 555-2273</a>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Overlay to close dropdowns when clicking outside */}
        {(servicesOpen || aboutOpen) && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setServicesOpen(false);
              setAboutOpen(false);
            }}
          />
        )}
      </nav>
    </>
  );
}
