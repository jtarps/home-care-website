import type React from "react"
import CaregiverNav from "@/components/caregiver-nav"

export default function CaregiverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CaregiverNav />
      <div className="lg:pl-64">
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  )
}
