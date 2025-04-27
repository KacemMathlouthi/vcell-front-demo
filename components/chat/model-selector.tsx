"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModelSelector() {
  const models = [
    { id: "gpt-4o", name: "GPT-4o", description: "Most capable model for complex tasks" },
    { id: "gpt-4-turbo", name: "GPT-4 Turbo", description: "Fast and powerful for most tasks" },
    { id: "claude-3-opus", name: "Claude 3 Opus", description: "Advanced reasoning and comprehension" },
    { id: "gemini-pro", name: "Gemini Pro", description: "Google's multimodal AI model" },
    { id: "llama-3", name: "Llama 3", description: "Open source model with strong capabilities" },
  ]

  const [selectedModel, setSelectedModel] = useState(models[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 border-2 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900">
          <span className="text-sm font-medium">{selectedModel.name}</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px] border-2 border-zinc-200">
        {models.map((model) => (
          <DropdownMenuItem
            key={model.id}
            className="flex items-start gap-3 py-3 px-4 cursor-pointer"
            onClick={() => setSelectedModel(model)}
          >
            <div className="mt-0.5">
              {selectedModel.id === model.id ? <Check size={16} className="text-zinc-900" /> : <div className="w-4" />}
            </div>
            <div>
              <div className="font-medium text-zinc-900">{model.name}</div>
              <div className="text-xs text-zinc-600 mt-1">{model.description}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
