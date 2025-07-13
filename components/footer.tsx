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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">
              Toronto Home Care
            </h3>
            <p className="text-gray-300">
              Providing compassionate, professional home care services
              throughout Toronto and the GTA.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/psw"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Personal Support Worker
                </Link>
              </li>
              <li>
                <Link
                  href="/services/nursing"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Nursing Care
                </Link>
              </li>
              <li>
                <Link
                  href="/services/physiotherapy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Physiotherapy
                </Link>
              </li>
              <li>
                <Link
                  href="/costs-insurance"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Cost & Insurance
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/caregivers"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Join Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/policies"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-gray-300">(416) 555-CARE</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-blue-400" />
                <a
                  href="mailto:info@torontohomecare.ca"
                  className="text-gray-300 hover:underline"
                >
                  info@torontohomecare.ca
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-blue-400 mt-1" />
                <span className="text-gray-300">
                  123 Main Street
                  <br />
                  Toronto, ON M5V 3A8
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Toronto Home Care. All rights reserved. |
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
