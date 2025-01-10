"use client";
import { useEffect, useRef } from "react"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Animation variables
    let time = 0
    const particles: { x: number; y: number; speed: number }[] = []

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 2
      })
    }

    // Animation function
    const animate = () => {
      time += 0.01

      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach(particle => {
        particle.y -= particle.speed
        if (particle.y < 0) {
          particle.y = canvas.height
          particle.x = Math.random() * canvas.width
        }

        const noise = Math.sin(time + particle.x * 0.01) * 2

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.beginPath()
        ctx.arc(particle.x + noise, particle.y, 1, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen animate-pulse">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-50"
      />
      <div className="text-center">
        <h1 className="font-extrabold text-6xl">Welcome To My Portfolio</h1>
        <h3 className="font-thin text-6xl">soon...</h3>
      </div>
    </div>
  );
}
