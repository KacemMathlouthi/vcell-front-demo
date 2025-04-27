"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { CheckCircle, Circle } from "lucide-react"

interface ThinkingSequenceProps {
  currentStep: number
}

export function ThinkingSequence({ currentStep }: ThinkingSequenceProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    if (currentStep > 0 && !completedSteps.includes(currentStep - 1)) {
      setCompletedSteps((prev) => [...prev, currentStep - 1])
    }
  }, [currentStep, completedSteps])

  const steps = [
    {
      title: "Extract Intent",
      description: "Analyzing your query to understand the core request",
    },
    {
      title: "Extract Query Parameters",
      description: "Identifying key parameters needed for the search",
    },
    {
      title: "Query the API",
      description: "Searching databases for relevant information",
    },
    {
      title: "Explain the API Response",
      description: "Processing and interpreting the retrieved data",
    },
    {
      title: "Check the Knowledge Base",
      description: "Verifying information against scientific literature",
    },
  ]

  return (
    <Card className="p-5 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-300 border-2 border-zinc-200">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-zinc-900 animate-pulse"></div>
          <span className="text-sm font-semibold">Thinking...</span>
        </div>

        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = completedSteps.includes(index)

          return (
            <div key={index} className={`flex gap-3 p-3 rounded-md transition-colors ${isActive ? "bg-zinc-100" : ""}`}>
              {isCompleted ? (
                <CheckCircle className="h-5 w-5 text-zinc-900 flex-shrink-0" />
              ) : isActive ? (
                <Circle className="h-5 w-5 text-zinc-900 animate-pulse flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-zinc-300 flex-shrink-0" />
              )}
              <div>
                <div className="font-medium text-zinc-900">{step.title}</div>
                {isActive && (
                  <div className="text-sm text-zinc-600 mt-1 animate-in fade-in slide-in-from-top-2 duration-300">
                    {step.description}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
