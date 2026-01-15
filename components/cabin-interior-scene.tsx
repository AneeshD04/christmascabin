"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useGLTF, PointerLockControls } from "@react-three/drei"
import * as THREE from "three"
import { useRouter } from "next/navigation"

// WASD movement controller
function MovementController({ controlsRef }: { controlsRef: React.RefObject<any> }) {
  const { camera } = useThree()
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })
  const velocity = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
          moveState.current.forward = true
          break
        case "KeyS":
          moveState.current.backward = true
          break
        case "KeyA":
          moveState.current.left = true
          break
        case "KeyD":
          moveState.current.right = true
          break
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
          moveState.current.forward = false
          break
        case "KeyS":
          moveState.current.backward = false
          break
        case "KeyA":
          moveState.current.left = false
          break
        case "KeyD":
          moveState.current.right = false
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  useFrame((_, delta) => {
    if (!controlsRef.current?.isLocked) return

    const speed = 3.0
    velocity.current.set(0, 0, 0)

    camera.getWorldDirection(direction.current)
    direction.current.y = 0
    direction.current.normalize()

    const right = new THREE.Vector3()
    right.crossVectors(camera.up, direction.current).normalize()

    if (moveState.current.forward) {
      velocity.current.add(direction.current.clone().multiplyScalar(speed * delta))
    }
    if (moveState.current.backward) {
      velocity.current.add(direction.current.clone().multiplyScalar(-speed * delta))
    }
    if (moveState.current.left) {
      velocity.current.add(right.clone().multiplyScalar(speed * delta))
    }
    if (moveState.current.right) {
      velocity.current.add(right.clone().multiplyScalar(-speed * delta))
    }

    camera.position.add(velocity.current)
  })

  return null
}

// Confetti and popup text components
function ConfettiOverlay({ show }: { show: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [confetti, setConfetti] = useState<any[]>([])

  useEffect(() => {
    if (!show) return

    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]
    const particles: any[] = []

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight - window.innerHeight,
        r: Math.random() * 6 + 4,
        d: Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
      })
    }

    setConfetti(particles)

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationFrameId: number

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        ctx.beginPath()
        ctx.lineWidth = p.r / 2
        ctx.strokeStyle = p.color
        ctx.moveTo(p.x + p.tilt + p.r, p.y)
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r)
        ctx.stroke()

        p.tiltAngle += p.tiltAngleIncremental
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2
        p.tilt = Math.sin(p.tiltAngle - i / 3) * 15

        if (p.y > canvas.height) {
          particles[i] = { ...p, x: Math.random() * canvas.width, y: -10 }
        }
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [show])

  if (!show) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ width: "100%", height: "100%" }}
    />
  )
}

function PopupText({ show, text }: { show: boolean; text: string }) {
  if (!show) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center">
      <div className="animate-bounce rounded-2xl bg-gradient-to-r from-red-600 via-green-600 to-red-600 p-8 shadow-2xl">
        <h1 className="font-bold text-6xl text-white drop-shadow-lg" style={{ fontFamily: "cursive" }}>
          {text}
        </h1>
      </div>
    </div>
  )
}

// Load and display the GLB model
function CabinModel() {
  const { scene } = useGLTF("/images/finalglbglb.glb")
  const { camera, raycaster, pointer } = useThree()
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const router = useRouter()

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            mat.side = THREE.DoubleSide
          })
        } else {
          child.material.side = THREE.DoubleSide
        }
      }
    })

    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    scene.position.sub(center)
  }, [scene])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const rect = (event.target as HTMLCanvasElement).getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera({ x, y }, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object
        const objectName = clickedObject.name.toLowerCase()

        console.log("[v0] Clicked object:", objectName)

        if (objectName.includes("present") || objectName.includes("gift") || objectName.includes("box")) {
          setShowConfetti(true)
          setShowPopup(true)

          setTimeout(() => {
            setShowConfetti(false)
            setShowPopup(false)
          }, 3000)
        }

        if (objectName.includes("window")) {
          router.push("/")
        }
      }
    }

    const canvas = document.querySelector("canvas")
    if (canvas) {
      canvas.addEventListener("click", handleClick)
      return () => canvas.removeEventListener("click", handleClick)
    }
  }, [scene, camera, raycaster, router])

  return (
    <>
      <primitive object={scene} />
      <ConfettiOverlay show={showConfetti} />
      <PopupText show={showPopup} text="Merry Christmas!" />
    </>
  )
}

// Main scene component
export function CabinInteriorScene() {
  const controlsRef = useRef<any>(null)

  return (
    <>
      <ambientLight intensity={0.8} color="#ffeedd" />
      <pointLight position={[3, 2, 0]} intensity={2.0} color="#ff9966" distance={15} />
      <pointLight position={[-3, 2, 0]} intensity={2.0} color="#ffcc99" distance={15} />
      <pointLight position={[0, 2, 3]} intensity={1.8} color="#ffe6cc" distance={12} />
      <pointLight position={[0, 2, -3]} intensity={2.2} color="#ff6633" distance={15} />
      <pointLight position={[2, 1.5, 2]} intensity={1.5} color="#ffffff" distance={10} />
      <pointLight position={[-2, 1.5, -2]} intensity={1.5} color="#ffddaa" distance={10} />
      <pointLight position={[0, 3, 0]} intensity={1.0} color="#ffffee" distance={15} />

      <CabinModel />

      <PointerLockControls ref={controlsRef} />

      <MovementController controlsRef={controlsRef} />
    </>
  )
}

useGLTF.preload("/images/finalglbglb.glb")
