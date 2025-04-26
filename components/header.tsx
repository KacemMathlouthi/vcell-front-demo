"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-28 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <div className="flex items-center">
          <Link href="/" className="group relative text-2xl font-bold text-black transition-all">
            VCell
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        <nav className="hidden items-center space-x-12 md:flex">
          {["References", "Database", "Documentation", "Contact Us"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative text-sm font-medium text-gray-800 transition-all hover:text-black"
            >
              {item}
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <div className="block md:hidden">
          <button className="rounded-md p-2 text-gray-800 hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
