"use client"

import { useEffect } from "react"

interface ConfettiParticle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
}

export function ConfettiCelebration({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const canvas = document.createElement("canvas")
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "9999"
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    document.body.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ffa500"]
    const particles: ConfettiParticle[] = []

    // Create confetti particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      })
    }

    let animationFrame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()

        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1
        p.rotation += p.rotationSpeed
      })

      if (particles.some((p) => p.y < canvas.height)) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        document.body.removeChild(canvas)
        onComplete()
      }
    }

    animate()

    const timeout = setTimeout(() => {
      cancelAnimationFrame(animationFrame)
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas)
      }
      onComplete()
    }, 5000)

    return () => {
      cancelAnimationFrame(animationFrame)
      clearTimeout(timeout)
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas)
      }
    }
  }, [onComplete])

  return null
}

export function MerryChristmasPopup() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative animate-[fadeInScale_0.6s_ease-out]">
        <div className="relative">
          {/* Moon background */}
          <div className="absolute -top-20 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-yellow-100 shadow-[0_0_60px_rgba(255,255,200,0.8)]"></div>

          {/* Santa and sleigh animation */}
          <div className="animate-[fly-across_3s_ease-in-out] relative">
            <img
              src="/images/image.png"
              alt="Santa on sleigh with reindeer"
              className="h-auto w-[400px] drop-shadow-2xl"
            />
          </div>

          <div className="mt-6 rounded-xl bg-white/95 px-12 py-6 shadow-2xl backdrop-blur-sm border-2 border-red-200">
            <h1
              className="text-center text-5xl font-normal text-red-600 tracking-wide animate-[shimmer_2s_ease-in-out_infinite]"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Merry Christmas Angelina <span className="text-pink-500">❤</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
