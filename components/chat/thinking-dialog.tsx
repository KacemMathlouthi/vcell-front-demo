"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check, Loader2 } from "lucide-react"

const THINKING_STEPS = [
  { id: "intent", label: "Extracting intent" },
  { id: "params", label: "Extracting query parameters" },
  { id: "api", label: "Querying the API" },
  { id: "explain", label: "Explaining the API response" },
  { id: "knowledge", label: "Checking knowledge base" },
  { id: "response", label: "Generating response" },
]

export function ThinkingDialog() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  useEffect(() => {
    // Simulate the thinking process with delays
    const interval = setInterval(() => {
      if (currentStep < THINKING_STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1)
        setCompletedSteps((prev) => [...prev, THINKING_STEPS[currentStep].id])
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [currentStep])

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Thinking...</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {THINKING_STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center gap-3">
              {completedSteps.includes(step.id) ? (
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              ) : index === currentStep ? (
                <div className="h-6 w-6 flex items-center justify-center">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </div>
              ) : (
                <div className="h-6 w-6 rounded-full border border-muted flex items-center justify-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"></span>
                </div>
              )}
              <span className={index <= currentStep ? "text-foreground" : "text-muted-foreground"}>{step.label}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
