"use client"

import { useEffect, useRef } from "react"

interface Snowflake {
  x: number
  y: number
  radius: number
  speed: number
  wind: number
  opacity: number
}

export function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const snowflakesRef = useRef<Snowflake[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createSnowflakes = () => {
      const count = Math.floor((canvas.width * canvas.height) / 8000)
      snowflakesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1.5 + 0.5,
        wind: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.6 + 0.4,
      }))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      snowflakesRef.current.forEach((flake) => {
        // Update position
        flake.y += flake.speed
        flake.x += flake.wind + Math.sin(flake.y * 0.01) * 0.3

        // Reset if off screen
        if (flake.y > canvas.height) {
          flake.y = -10
          flake.x = Math.random() * canvas.width
        }
        if (flake.x > canvas.width) flake.x = 0
        if (flake.x < 0) flake.x = canvas.width

        // Draw snowflake
        ctx.beginPath()
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createSnowflakes()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      createSnowflakes()
    })

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10" aria-hidden="true" />
}
