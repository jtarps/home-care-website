import type React from "react"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Family Portal - Home Care Services",
  description: "Stay connected with your loved one's care team and track their care progress.",
}

export default function FamilyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className}>
      <div className="min-h-screen bg-gray-50">{children}</div>
    </div>
  )
}
