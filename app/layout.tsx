import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import FloatingBookingCard from "@/components/floating-booking-card"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Toronto Home Care - Professional In-Home Healthcare Services",
  description:
    "Professional, personalized home healthcare services in Toronto. Licensed caregivers providing personal support, nursing care, rehabilitation, and specialized care at home.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <FloatingBookingCard />
          <Toaster />
          <SonnerToaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
