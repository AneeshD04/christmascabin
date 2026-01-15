"use client"

import { useEffect, useRef } from "react"

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create and setup audio element
    const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mariah%20Carey%20-%20All%20I%20Want%20For%20Christmas%20Is%20You%20%28Lyrics%29-Bxygju3N4Mr3eIAvs263jzaO8kjdeK.mp3")
    audio.loop = true
    audio.volume = 0.3
    audioRef.current = audio

    // Auto-play when component mounts
    const playAudio = () => {
      audio.play().catch((error) => {
        console.log("Audio autoplay prevented:", error)
        // If autoplay is blocked, play on first user interaction
        document.addEventListener(
          "click",
          () => {
            audio.play()
          },
          { once: true },
        )
      })
    }

    playAudio()

    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [])

  return null
}
