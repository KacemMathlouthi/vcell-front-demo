"use client"

import { Card } from "@/components/ui/card"
import { Sparkles, Brain, Database, FileSearch } from "lucide-react"

interface PromptTemplatesProps {
  onSelectPrompt: (prompt: string) => void
}

export function PromptTemplates({ onSelectPrompt }: PromptTemplatesProps) {
  const templates = [
    {
      icon: <Sparkles className="h-5 w-5 text-zinc-900" />,
      title: "Analyze protein structure",
      description: "Upload a PDB file and get a detailed analysis of the protein structure",
      prompt: "Can you analyze this protein structure and identify potential binding sites?",
    },
    {
      icon: <Brain className="h-5 w-5 text-zinc-900" />,
      title: "Compare gene expressions",
      description: "Compare gene expression data between different conditions",
      prompt:
        "I have gene expression data from two different conditions. Can you help me identify differentially expressed genes?",
    },
    {
      icon: <Database className="h-5 w-5 text-zinc-900" />,
      title: "Query biomodel database",
      description: "Search for biomodels related to your research",
      prompt: "Find biomodels related to calcium signaling in cardiac cells",
    },
    {
      icon: <FileSearch className="h-5 w-5 text-zinc-900" />,
      title: "Summarize research paper",
      description: "Get a concise summary of a research paper",
      prompt: "Can you summarize this research paper on CRISPR-Cas9 gene editing techniques?",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl">
      {templates.map((template, index) => (
        <Card
          key={index}
          className="p-5 cursor-pointer hover:bg-zinc-50 transition-colors border-2 border-zinc-200"
          onClick={() => onSelectPrompt(template.prompt)}
        >
          <div className="flex gap-4">
            <div className="mt-0.5">{template.icon}</div>
            <div>
              <h3 className="font-semibold text-zinc-900">{template.title}</h3>
              <p className="text-sm text-zinc-600 mt-2">{template.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
