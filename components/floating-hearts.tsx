"use client"

import { useEffect, useState } from "react"

interface Heart {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useEffect(() => {
    const count = 15
    const generated: Heart[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 16 + 20, // 20-36px
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 12, // 12-20s
    }))
    setHearts(generated)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="pointer-events-auto absolute cursor-pointer"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animation: `floatHeart ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
          }}
          onMouseEnter={() => setHoveredId(heart.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={hoveredId === heart.id ? "#ff4d6d" : "rgba(255, 182, 193, 0.6)"}
            className="transition-all duration-300"
            style={{
              filter: hoveredId === heart.id ? "drop-shadow(0 0 8px #ff4d6d) drop-shadow(0 0 16px #ff6b8a)" : "none",
              transform: hoveredId === heart.id ? "scale(1.3)" : "scale(1)",
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  )
}
