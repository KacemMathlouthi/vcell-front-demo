"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { CheckCircle, Circle, ChevronDown, ChevronUp } from "lucide-react"

interface ThinkingSequenceProps {
  currentStep: number
  outputs: string[]
}

export function ThinkingSequence({ currentStep, outputs }: ThinkingSequenceProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [expandedSteps, setExpandedSteps] = useState<number[]>([])

  useEffect(() => {
    if (currentStep > 0 && !completedSteps.includes(currentStep - 1)) {
      setCompletedSteps((prev) => [...prev, currentStep - 1])
      setExpandedSteps((prev) => [...prev, currentStep - 1])
    }
  }, [currentStep, completedSteps])

  const toggleStep = (index: number) => {
    if (expandedSteps.includes(index)) {
      setExpandedSteps(expandedSteps.filter((i) => i !== index))
    } else {
      setExpandedSteps([...expandedSteps, index])
    }
  }

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
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-zinc-900 animate-pulse"></div>
            <span className="text-sm font-semibold">Thinking...</span>
          </div>
        </div>

        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = completedSteps.includes(index)
          const isExpanded = expandedSteps.includes(index)
          const hasOutput = outputs[index] && isCompleted

          return (
            <div
              key={index}
              className={`rounded-md transition-colors border ${isActive || isExpanded ? "border-zinc-300" : "border-transparent"}`}
            >
              <div
                className={`flex items-center justify-between p-3 ${isActive ? "bg-zinc-100" : ""} ${isCompleted && hasOutput ? "cursor-pointer hover:bg-zinc-50" : ""}`}
                onClick={() => (isCompleted && hasOutput ? toggleStep(index) : null)}
              >
                <div className="flex gap-3">
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

                {isCompleted && hasOutput && (
                  <div className="text-zinc-500">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                )}
              </div>

              {isExpanded && hasOutput && (
                <div className="px-11 pb-3 text-sm text-zinc-700 border-t border-zinc-100 pt-3 bg-zinc-50 rounded-b-md animate-in fade-in duration-200">
                  <div className="font-mono bg-white p-3 rounded border border-zinc-200 text-xs">{outputs[index]}</div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
