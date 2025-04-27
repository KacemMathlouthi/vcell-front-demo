"use client"

import { Button } from "@/components/ui/button"
import AnimatedGradient from "@/components/animated-gradient"
import Header from "@/components/header"
import { useRouter } from "next/navigation" 

export default function Home() {
  const router = useRouter() 

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Animated gradient background */}
      <AnimatedGradient />

      {/* Content container */}
      <div className="relative z-10">
        <Header />

        <main className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="max-w-5xl text-center">
            <div className="relative mb-6">
              <h1 className="text-5xl font-black tracking-tight text-black md:text-6xl lg:text-7xl xl:text-8xl">
                Smart VCell <br /> Model Explorer
              </h1>
              <div className="mx-auto mt-4 h-1 w-40 bg-black/20"></div>
            </div>

            <p className="mx-auto mt-8 max-w-3xl text-xl font-light leading-relaxed text-gray-800 md:text-2xl">
              Explore complex Biomodels using Natural Language commands.
            </p>

            <div className="mt-8">
              <Button className="group relative overflow-hidden rounded-full bg-black px-12 py-8 text-lg font-medium text-white border border-black/0 transition-all hover:bg-white hover:text-black hover:border-black"
                onClick={() => router.push("/chat")}
              > 
                Start Exploring!
                <span className="absolute inset-0 rounded-full border border-black/0 transition-all duration-300 group-hover:border-black/30 group-hover:animate-pulse"></span>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
