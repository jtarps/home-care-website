"use client"

import { useState, useEffect } from "react"

const words = ["Personalized", "Holistic", "Compassionate", "Flexible"]

export default function TextRotator() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)

      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
        setIsAnimating(false)
      }, 200)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="inline-flex items-center">
      <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 rounded-full border border-gray-300 shadow-sm">
        <span
          className={`font-bold text-blue-600 transition-all duration-200 ${
            isAnimating ? "opacity-0 transform translate-y-2" : "opacity-100 transform translate-y-0"
          }`}
        >
          {words[currentWordIndex]}
        </span>
      </div>
    </div>
  )
}
