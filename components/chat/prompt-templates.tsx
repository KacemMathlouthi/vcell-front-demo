"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Brain, Dna, Microscope, Database } from "lucide-react"

interface PromptTemplatesProps {
  onTemplateClick: (template: string) => void
}

const TEMPLATES = [
  {
    icon: Brain,
    title: "Explain a concept",
    description: "Get a detailed explanation of a scientific concept",
    prompt: "Explain the concept of neural networks in simple terms.",
  },
  {
    icon: Dna,
    title: "Analyze genetic data",
    description: "Upload genetic data for analysis and interpretation",
    prompt: "I have a DNA sequence. Can you help me analyze it for potential mutations?",
  },
  {
    icon: Microscope,
    title: "Research assistance",
    description: "Get help with research methodology or literature review",
    prompt: "I'm researching protein folding. What are the latest breakthroughs in this field?",
  },
  {
    icon: Database,
    title: "Data visualization",
    description: "Generate visualizations from your research data",
    prompt: "I have experimental data on enzyme kinetics. Can you help me visualize and interpret it?",
  },
]

export function PromptTemplates({ onTemplateClick }: PromptTemplatesProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h2 className="text-2xl font-bold mb-2">Welcome to BioChat</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Your AI research assistant for biology, chemistry, and more. Choose a template below or start a new
        conversation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
        {TEMPLATES.map((template, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => onTemplateClick(template.prompt)}
          >
            <CardContent className="p-6 flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-md">
                <template.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{template.title}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
