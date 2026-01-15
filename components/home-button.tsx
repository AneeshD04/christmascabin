"use client"

import { useRouter } from "next/navigation"
import { Home } from "lucide-react"

export function HomeButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push("/")}
      className="pointer-events-auto fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-black/50 px-4 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-black/70 active:scale-95"
    >
      <Home className="h-4 w-4" />
      <span>Return</span>
    </button>
  )
}
