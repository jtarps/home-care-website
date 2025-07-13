"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Home, User, LogOut, Menu, Heart } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

interface CaregiverProfile {
  first_name: string
  last_name: string
  status: string
}

export default function CaregiverNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [profile, setProfile] = useState<CaregiverProfile | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) return

      const { data: profileData } = await supabase
        .from("caregivers")
        .select("first_name, last_name, status")
        .eq("email", user.email)
        .single()

      if (profileData) {
        setProfile(profileData)
      }
    } catch (error) {
      console.error("Error loading profile:", error)
    }
  }

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      toast.success("Signed out successfully")
      router.replace("/caregiver/login")
    } catch (error: any) {
      console.error("Sign out error:", error)
      toast.error("Failed to sign out")
    }
  }

  const navItems = [
    {
      href: "/caregiver/dashboard",
      label: "Dashboard",
      icon: Home,
      description: "Overview and today's shifts",
    },
    {
      href: "/caregiver/profile",
      label: "Profile",
      icon: User,
      description: "Personal information",
    },
  ]

  const isActive = (href: string) => pathname === href

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full h-10 w-10 flex items-center justify-center text-sm font-bold">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Caregiver Portal</h2>
            {profile && (
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-600">
                  {profile.first_name} {profile.last_name}
                </p>
                <Badge
                  variant="outline"
                  className={profile.status === "active" ? "bg-green-50 text-green-700 border-green-200" : ""}
                >
                  {profile.status}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                  ${active ? "bg-blue-100 text-blue-700 border border-blue-200" : "text-gray-700 hover:bg-gray-100"}
                `}
              >
                <Icon className="h-5 w-5" />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:bg-white lg:z-50">
        <NavContent />
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full h-8 w-8 flex items-center justify-center">
              <Heart className="h-4 w-4" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Caregiver Portal</h1>
              {profile && (
                <p className="text-sm text-gray-600">
                  {profile.first_name} {profile.last_name}
                </p>
              )}
            </div>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <NavContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  )
}
