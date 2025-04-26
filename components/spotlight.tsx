"use client"

import { useEffect, useRef } from "react"

export default function Spotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const spotlight = spotlightRef.current
    if (!spotlight) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e

      // Update the spotlight position with a slight delay for smoothness
      requestAnimationFrame(() => {
        if (spotlight) {
          spotlight.style.background = `radial-gradient(
            800px circle at ${clientX}px ${clientY}px,
            rgba(255, 251, 211, 0.6),
            transparent 40%
          )`
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={spotlightRef}
      className="pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity duration-500 ease-in-out"
      style={{ opacity: 1 }}
    />
  )
}
