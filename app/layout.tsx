import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import Navigation from "@/components/navigation";
import FloatingBookingCard from "@/components/floating-booking-card";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haven at Home | Compassionate Home Care Services in Toronto",
  description:
    "Haven at Home provides compassionate, personalized home care services in Toronto, including nursing, personal support, and rehabilitation at home. Contact us today!",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navigation />
          <main>{children}</main>
          <FloatingBookingCard />
          <Toaster />
          <SonnerToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
