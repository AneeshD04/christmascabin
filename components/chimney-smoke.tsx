"use client"

export function ChimneySmoke() {
  return (
    <div className="relative h-32 w-16" aria-hidden="true">
      {/* Multiple smoke puffs with staggered animations */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 left-1/2 animate-smoke rounded-full bg-gray-300/30 blur-md"
          style={{
            width: `${12 + i * 4}px`,
            height: `${12 + i * 4}px`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${4 + i * 0.5}s`,
          }}
        />
      ))}
    </div>
  )
}
