"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Calendar, Phone, ChevronUp } from "lucide-react"

export default function FloatingBookingCard() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [careNeeded, setCareNeeded] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out">
      <Card
        className={`w-80 shadow-2xl border-2 border-blue-200 bg-white transition-all duration-300 ${
          isMinimized ? "h-16" : "h-auto"
        }`}
      >
        {isMinimized ? (
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Request Care</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(false)}
              className="h-8 w-8 p-0 hover:bg-blue-50 rounded-full"
            >
              <ChevronUp className="h-4 w-4 text-blue-600" />
            </Button>
          </div>
        ) : (
          <>
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <CardTitle className="text-lg">Request Care</CardTitle>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(true)}
                    className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full"
                  >
                    <ChevronUp className="h-4 w-4 rotate-180" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsVisible(false)}
                    className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-blue-100 mt-1">Get started with professional home care</p>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Who needs care?</label>
                <Select value={careNeeded} onValueChange={setCareNeeded}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select who needs care" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="myself">Myself</SelectItem>
                    <SelectItem value="spouse">My spouse/partner</SelectItem>
                    <SelectItem value="parent">My parent</SelectItem>
                    <SelectItem value="child">My child</SelectItem>
                    <SelectItem value="other">Someone else</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Link href="/book" className="block">
                  <div className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 border border-blue-600 cursor-pointer flex items-center justify-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Request Care
                  </div>
                </Link>

                <a href="tel:+14165552273" className="block">
                  <div className="w-full border-2 border-blue-600 bg-white text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 cursor-pointer flex items-center justify-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Call (416) 555-2273
                  </div>
                </a>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500">Free consultation • Licensed caregivers • 24/7 support</p>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  )
}
