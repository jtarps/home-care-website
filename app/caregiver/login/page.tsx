"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Copy, Check, User, Lock, Heart, Shield } from "lucide-react"
import { toast } from "sonner"

export default function CaregiverLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const testCredentials = {
    email: "test@caregiver.com",
    password: "password123",
  }

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (session) {
          console.log("Existing session found, redirecting to dashboard")
          router.replace("/caregiver/dashboard")
        }
      } catch (error) {
        console.error("Session check error:", error)
      }
    }

    checkSession()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      console.log("Attempting login with:", { email: email.trim() })

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      })

      console.log("Login response:", {
        user: data.user?.email,
        session: !!data.session,
        error: error?.message,
      })

      if (error) {
        throw error
      }

      if (data.user && data.session) {
        console.log("Login successful, redirecting to dashboard")
        toast.success("Successfully logged in!")

        // Use window.location for a hard redirect to ensure middleware runs
        window.location.href = "/caregiver/dashboard"
      } else {
        throw new Error("Login failed - no user or session returned")
      }
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "Failed to sign in. Please check your credentials.")
      toast.error("Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  const fillTestCredentials = () => {
    setEmail(testCredentials.email)
    setPassword(testCredentials.password)
    toast.success("Test credentials filled!")
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      toast.success(`${field} copied to clipboard!`)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      toast.error("Failed to copy to clipboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Caregiver Portal</h1>
          <p className="text-gray-600">Sign in to access your dashboard and manage your shifts</p>
        </div>

        {/* Test Credentials Card */}
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-600" />
              Test Account
            </CardTitle>
            <CardDescription>Use these credentials to test the caregiver portal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-2 bg-white rounded border">
                <div className="flex-1">
                  <Label className="text-xs text-gray-500">Email</Label>
                  <p className="text-sm font-mono">{testCredentials.email}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(testCredentials.email, "Email")}
                  className="h-8 w-8 p-0"
                >
                  {copiedField === "Email" ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between p-2 bg-white rounded border">
                <div className="flex-1">
                  <Label className="text-xs text-gray-500">Password</Label>
                  <p className="text-sm font-mono">{testCredentials.password}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(testCredentials.password, "Password")}
                  className="h-8 w-8 p-0"
                >
                  {copiedField === "Password" ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button onClick={fillTestCredentials} variant="outline" className="w-full bg-white">
              <User className="h-4 w-4 mr-2" />
              Fill Test Credentials
            </Button>
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="pl-10"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="pl-10 pr-10"
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="border-gray-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <h3 className="font-semibold text-gray-900">Caregiver Portal Features</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <Badge variant="outline" className="justify-center">
                  📅 Shift Management
                </Badge>
                <Badge variant="outline" className="justify-center">
                  📍 GPS Check-in/out
                </Badge>
                <Badge variant="outline" className="justify-center">
                  👤 Client Information
                </Badge>
                <Badge variant="outline" className="justify-center">
                  💰 Earnings Tracking
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2024 Home Care Services. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
