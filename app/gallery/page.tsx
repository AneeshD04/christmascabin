"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { CabinInteriorScene } from "@/components/cabin-interior-scene"
import { BackgroundMusic } from "@/components/background-music"
import { HomeButton } from "@/components/home-button"
import { CelebrationButton } from "@/components/celebration-button"

export default function GalleryPage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0a0a0a]">
      <BackgroundMusic />
      {/* Canvas with camera at [0, 1.5, 0] inside the cabin */}
      <Canvas shadows camera={{ position: [0, 1.5, 0], fov: 75 }} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <CabinInteriorScene />
        </Suspense>
      </Canvas>
      {/* Instructions overlay */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-black/70 px-6 py-3 text-center text-sm text-white/90 backdrop-blur-sm">
        <p className="font-medium">Click to lock pointer • WASD to move • Mouse to look around</p>
      </div>
      <HomeButton />
      <CelebrationButton />
    </div>
  )
}
