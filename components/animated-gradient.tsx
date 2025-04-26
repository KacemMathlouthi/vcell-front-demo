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

    // More subtle sunlight colors for the gradient
    const colors = [
      { r: 255, g: 250, b: 245 }, // Very soft warm white
      { r: 255, g: 248, b: 240 }, // Extremely subtle pale gold
      { r: 255, g: 245, b: 235 }, // Very light ivory
      { r: 255, g: 252, b: 245 }, // Almost white with hint of warmth
      { r: 255, g: 253, b: 250 }, // Nearly pure white
    ]

    // More gradient points for complexity
    const points = Array.from({ length: 5 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() * 0.2 - 0.1) * 0.5, // Slower movement
      vy: (Math.random() * 0.2 - 0.1) * 0.5,
      size: Math.random() * width * 0.6 + width * 0.3, // Variable sizes
    }))

    // Add time-based oscillation
    let time = 0
    const timeStep = 0.002 // Slower movement

    const animate = () => {
      time += timeStep

      // Create a very subtle fade effect
      ctx.fillStyle = "rgba(255, 255, 255, 0.03)" // Slower fade for subtlety
      ctx.fillRect(0, 0, width, height)

      // Move points with time-based oscillation
      points.forEach((point, i) => {
        // Add sinusoidal movement for more organic flow, but more subtle
        point.x += point.vx + Math.sin(time * 0.3 + i) * 0.1
        point.y += point.vy + Math.cos(time * 0.2 + i * 0.4) * 0.1

        // Bounce off edges with slight randomization
        if (point.x < 0 || point.x > width) {
          point.vx *= -1
          point.vx += Math.random() * 0.05 - 0.025
        }
        if (point.y < 0 || point.y > height) {
          point.vy *= -1
          point.vy += Math.random() * 0.05 - 0.025
        }

        // Keep velocity in check
        point.vx = Math.max(Math.min(point.vx, 0.3), -0.3)
        point.vy = Math.max(Math.min(point.vy, 0.3), -0.3)
      })

      // Create multiple overlapping gradients for complexity
      points.forEach((point, i) => {
        if (i < points.length - 1) {
          const nextPoint = points[(i + 1) % points.length]
          const gradient = ctx.createRadialGradient(point.x, point.y, 0, nextPoint.x, nextPoint.y, point.size)

          // Use colors with oscillating opacity for breathing effect
          colors.forEach((color, j) => {
            const stop = j / (colors.length - 1)
            const opacity = 0.03 + Math.sin(time * 0.3 + j * 0.2) * 0.01 // Much lower opacity
            gradient.addColorStop(stop, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`)
          })

          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, width, height)
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-30" style={{ filter: "blur(150px)" }} />
  )
}
