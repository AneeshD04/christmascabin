"use client"

import { useState, useCallback } from "react"
import { Snowfall } from "./snowfall"
import { ChimneySmoke } from "./chimney-smoke"
import { PasswordModal } from "./password-modal"
import { FloatingHearts } from "./floating-hearts"

const MAIN_SCENE_URL = "/images/gemini-generated-image-m48ta6m48ta6m48t-20-281-29-20-281-29-20-281-29.jpeg"
const DOOR_CLOSEUP_URL = "/images/gemini-generated-image-fygn3zfygn3zfygn-20-281-29.jpeg"

export function HolidayScene() {
  const [isZoomed, setIsZoomed] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleDoorClick = useCallback(() => {
    setIsZoomed(true)
    // Show modal after zoom transition completes
    setTimeout(() => {
      setShowModal(true)
    }, 800)
  }, [])

  const handleCloseModal = useCallback(() => {
    setShowModal(false)
    setIsZoomed(false)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0a1628]">
      {/* Main Scene */}
      <div
        className={`absolute inset-0 transition-all duration-[800ms] ease-out ${
          isZoomed ? "scale-150 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <img
          src={MAIN_SCENE_URL || "/placeholder.svg"}
          alt="Snowy Christmas cabin scene with decorated tree and snowman"
          className="h-full w-full object-cover"
        />

        {/* Chimney Smoke - positioned relative to cabin */}
        <div className="absolute top-[22%] right-[32%]">
          <ChimneySmoke />
        </div>

        {/* Clickable Door Area */}
        <button
          onClick={handleDoorClick}
          className="absolute top-[64%] right-[30%] h-[22%] w-[5%] cursor-pointer rounded-sm transition-all duration-300 hover:shadow-[0_0_30px_10px_rgba(255,200,100,0.4)] focus:outline-none focus:ring-2 focus:ring-amber-400/50"
          aria-label="Enter the cabin"
        >
          <span className="sr-only">Click to enter the cabin</span>
        </button>
      </div>

      {/* Door Close-up (zoomed view) */}
      <div
        className={`absolute inset-0 transition-all duration-[800ms] ease-out ${
          isZoomed ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
        style={{ pointerEvents: isZoomed ? "auto" : "none" }}
      >
        <img
          src={DOOR_CLOSEUP_URL || "/placeholder.svg"}
          alt="Close-up of cabin door with wreath and holiday decorations"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Snowfall Effect - Always visible on top */}
      <Snowfall />

      {/* FloatingHearts Effect - Always visible on top */}
      <FloatingHearts />

      {/* Password Modal */}
      <PasswordModal isOpen={showModal} onClose={handleCloseModal} />
    </div>
  )
}
