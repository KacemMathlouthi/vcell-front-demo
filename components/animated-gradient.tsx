"use client"

import { useEffect, useRef } from "react"

export default function AnimatedGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Vibrant, dreamy pastel colors
    const colors = [
      { r: 255, g: 245, b: 252 }, // Very light pink
      { r: 240, g: 250, b: 255 }, // Very light blue
      { r: 255, g: 255, b: 240 }, // Very pale yellow
      { r: 240, g: 255, b: 250 }, // Very light mint
      { r: 255, g: 250, b: 240 }, // Very light peach
    ]

    // More points for richer gradients
    const points = Array.from({ length: 8 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() * 0.4 - 0.2) * 0.7,
      vy: (Math.random() * 0.4 - 0.2) * 0.7,
      size: Math.random() * width * 0.5 + width * 0.4,
    }))

    let time = 0
    const timeStep = 0.12

    const animate = () => {
      time += timeStep

      // Fade with a very light overlay for trailing effect
      ctx.fillStyle = "rgba(255,255,255,0.02)"
      ctx.fillRect(0, 0, width, height)

      // Animate points with organic movement
      points.forEach((point, i) => {
        point.x += point.vx + Math.sin(time * 0.25 + i) * 0.5
        point.y += point.vy + Math.cos(time * 0.18 + i * 0.7) * 0.5

        // Bounce off edges
        if (point.x < 0 || point.x > width) {
          point.vx *= -1
          point.vx += Math.random() * 0.1 - 0.05
        }
        if (point.y < 0 || point.y > height) {
          point.vy *= -1
          point.vy += Math.random() * 0.1 - 0.05
        }

        point.vx = Math.max(Math.min(point.vx, 0.5), -0.5)
        point.vy = Math.max(Math.min(point.vy, 0.5), -0.5)
      })

      // Draw overlapping gradients
      points.forEach((point, i) => {
        const nextPoint = points[(i + 1) % points.length]
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          nextPoint.x, nextPoint.y, point.size
        )

        colors.forEach((color, j) => {
          const stop = j / (colors.length - 1)
          // Higher opacity for vibrancy, animated for shimmer
          const opacity = 0.18 + Math.abs(Math.sin(time * 0.4 + j + i)) * 0.18
          gradient.addColorStop(stop, `rgba(${color.r},${color.g},${color.b},${opacity})`)
        })

        ctx.globalAlpha = 0.7
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
        ctx.globalAlpha = 1.0
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ filter: "blur(120px)", opacity: 0.55, zIndex: 0 }}
    />
  )
}