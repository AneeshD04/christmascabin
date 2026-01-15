"use client"

import type React from "react"

import { useState, useCallback, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

interface PasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

const CORRECT_PASSWORD = "7208"

export function PasswordModal({ isOpen, onClose }: PasswordModalProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
    if (!isOpen) {
      setPassword("")
      setError(false)
    }
  }, [isOpen])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (password === CORRECT_PASSWORD) {
        router.push("/gallery")
      } else {
        setError(true)
        setShake(true)
        setTimeout(() => setShake(false), 500)
        setPassword("")
      }
    },
    [password, router],
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div
        className={`relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border-2 border-red-700/50 bg-gradient-to-b from-[#1a3a2a] to-[#0f2318] p-8 shadow-2xl ${
          shake ? "animate-shake" : ""
        }`}
      >
        {/* Christmas lights decoration at top */}
        <div className="absolute top-0 left-0 right-0 flex justify-around py-1">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-full shadow-lg ${
                i % 4 === 0
                  ? "bg-red-500 shadow-red-500/50"
                  : i % 4 === 1
                    ? "bg-green-500 shadow-green-500/50"
                    : i % 4 === 2
                      ? "bg-yellow-400 shadow-yellow-400/50"
                      : "bg-blue-400 shadow-blue-400/50"
              }`}
              style={{ animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>

        {/* String connecting the lights */}
        <div className="absolute top-[6px] left-0 right-0 h-[2px] bg-green-900" />

        {/* Holly decorations in corners */}
        <div className="absolute top-8 left-3 text-2xl">🎄</div>
        <div className="absolute top-8 right-3 text-2xl">🎄</div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-10 text-white/60 transition-colors hover:text-white"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="mt-4 text-center">
          {/* Wreath icon */}
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-900/30 ring-4 ring-green-700/50">
            <span className="text-4xl">🎅</span>
          </div>

          <h2 className="mb-1 font-serif text-2xl font-bold text-amber-100">Welcome Home!</h2>
          <p className="mb-6 text-sm text-green-200/70">Enter Santa{"'"}s secret code to unlock the magic inside</p>

          <form onSubmit={handleSubmit}>
            <div className="relative">
              {/* Candy cane decorations on input */}
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 text-xl">🍬</span>
              <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-xl">🍬</span>
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(false)
                }}
                placeholder="Enter password"
                className={`w-full rounded-lg border-2 bg-white/10 px-4 py-3 text-center text-lg tracking-widest text-white placeholder-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                  error ? "border-red-500/70 bg-red-500/20" : "border-green-600/50 hover:border-green-500/70"
                }`}
                maxLength={10}
              />
            </div>

            {error && <p className="mt-2 text-sm text-red-300">Oh no! Wrong code. Try again! 🎁</p>}

            <button
              type="submit"
              className="mt-5 w-full rounded-lg bg-gradient-to-r from-red-600 to-red-700 py-3 font-semibold text-white shadow-lg transition-all hover:from-red-500 hover:to-red-600 hover:shadow-red-500/30 active:scale-[0.98]"
            >
              🔔 Open the Door 🔔
            </button>
          </form>

          {/* Bottom snowflakes decoration */}
          <div className="mt-4 flex justify-center gap-3 text-lg opacity-60">
            <span>❄️</span>
            <span>⭐</span>
            <span>❄️</span>
            <span>⭐</span>
            <span>❄️</span>
          </div>
        </div>
      </div>
    </div>
  )
}
