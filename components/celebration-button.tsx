"use client"

import { useState } from "react"
import { ConfettiCelebration, MerryChristmasPopup } from "./confetti-celebration"

export function CelebrationButton() {
  const [showCelebration, setShowCelebration] = useState(false)

  const handleClick = () => {
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 3000)
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="pointer-events-auto fixed bottom-4 right-4 z-50 rounded-lg bg-red-600/70 px-4 py-2 text-sm text-white shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-red-600/80 hover:shadow-xl active:scale-95"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        <div className="relative">
          {/* Christmas lights wrapper */}
          <div className="absolute -inset-2 animate-pulse rounded-lg">
            <span className="absolute left-0 top-0 h-2 w-2 rounded-full bg-red-400 shadow-[0_0_8px_#f87171]"></span>
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]"></span>
            <span className="absolute bottom-0 left-0 h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15]"></span>
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]"></span>
          </div>
          Press Me
        </div>
      </button>
      {showCelebration && (
        <>
          <ConfettiCelebration onComplete={() => {}} />
          <MerryChristmasPopup />
        </>
      )}
    </>
  )
}
