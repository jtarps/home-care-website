import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-white">
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
            <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
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
    </footer>
  );
}
