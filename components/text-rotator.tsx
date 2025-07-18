"use client";

import { useState, useEffect } from "react";

const words = [
  "Compassionate",
  "Personalized",
  "Reliable",
  "Holistic",
  "Comforting",
];

export default function TextRotator() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center">
      <div className="relative bg-brand-pillBg px-4 py-2 rounded-full border border-transparent shadow-[0_2px_8px_0_rgba(61,74,104,0.06)]">
        <span
          className={`font-bold text-brand-pillText transition-all duration-300 ease-out ${
            isAnimating
              ? "opacity-0 transform translate-y-10"
              : "opacity-100 transform translate-y-0 scale-100"
          }`}
        >
          {words[currentWordIndex]}
        </span>
      </div>
    </div>
  );
}
