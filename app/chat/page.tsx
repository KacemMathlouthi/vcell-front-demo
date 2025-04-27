"use client"

import type React from "react"

import { useState } from "react"
import { FileUp, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { PromptTemplates } from "@/components/chat/prompt-templates"
import { ThinkingSequence } from "@/components/chat/thinking-sequence"
import { AssistantMessage } from "@/components/chat/assistant-message"
import { ModelSelector } from "@/components/chat/model-selector"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/chat/app-sidebar"
import { Label } from "@/components/ui/label"

export default function ChatPage() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [thinkingStep, setThinkingStep] = useState(0)
  const [showResponse, setShowResponse] = useState(false)
  const [thinkingTime, setThinkingTime] = useState(0)
  const [thinkingCollapsed, setThinkingCollapsed] = useState(false)
  const [thinkingOutputs, setThinkingOutputs] = useState<string[]>([])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: input }])
    setInput("")

    // Start thinking sequence
    setIsThinking(true)
    setThinkingStep(0)
    setShowResponse(false)
    setThinkingCollapsed(false)
    setThinkingOutputs([])

    // Start timer
    const startTime = Date.now()

    // Simulate thinking steps
    const steps = [
      "Extract Intent",
      "Extract Query Parameters",
      "Query the API",
      "Explain the API Response",
      "Check the Knowledge Base",
    ]

    const outputs = [
      "Intent: User is requesting analysis of protein structure data with focus on binding sites.",
      "Parameters: { dataType: 'protein', analysisType: 'binding', format: 'PDB' }",
      "API Response: Found 3 potential binding sites with confidence scores [0.92, 0.87, 0.76]",
      "The highest confidence binding site is located at residues 156-172 with hydrophobic pocket characteristics",
      "Findings consistent with Smith et al. (2023) and Garcia et al. (2023) research on similar structures",
    ]

    let currentStep = 0

    const thinkingInterval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        currentStep++
        setThinkingStep(currentStep)
        setThinkingOutputs((prev) => [...prev, outputs[currentStep - 1]])
      } else {
        clearInterval(thinkingInterval)
        const endTime = Date.now()
        const thinkingSeconds = Math.round((endTime - startTime) / 1000)
        setThinkingTime(thinkingSeconds)
        setThinkingCollapsed(true)
        setIsThinking(false)
        setShowResponse(true)

        // Add assistant response
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Based on your query, I've analyzed the biomodel data and found some interesting patterns. The protein structure shows significant conformational changes when bound to the ligand.\n\nHere are two visualizations of the model:\n\n[IMAGE1]\n\n[IMAGE2]\n\n## References\n1. Smith et al. (2023). *Structural analysis of protein-ligand interactions*. Journal of Molecular Biology, 45(2), 112-128.\n2. Johnson & Lee (2022). *Computational approaches to protein modeling*. Nature Methods, 18(3), 76-89.\n3. Garcia et al. (2023). *Recent advances in biomodel visualization*. Bioinformatics, 39(4), 201-215.",
          },
        ])
      }
    }, 1000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileName = file.name.toLowerCase()
      if (fileName.endsWith(".vcml") || fileName.endsWith(".sbml")) {
        setInput(`Analyzing file: ${file.name}`)
      } else {
        alert("Please upload only .vcml or .sbml files")
      }
    }
  }  

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-white flex flex-col h-screen"> {/* Make SidebarInset a flex column and full height */}
        <header className="h-16 border-b border-zinc-200 flex items-center px-6 justify-between bg-white">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-zinc-800" />
            <h1 className="text-lg font-semibold tracking-tight">Chat Assistant</h1>
          </div>
          <ModelSelector />
        </header>

        {/* Chat history area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 max-w-4xl mx-auto w-full">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold mb-8 text-zinc-900 tracking-tight">How can I help you today?</h2>
              <PromptTemplates onSelectPrompt={(prompt) => setInput(prompt)} />
            </div>
          ) : (
            <div className="space-y-8 pb-24"> {/* Remove max-w-4xl mx-auto here, it's on parent */}
              {messages.map((message, index) => (
                <div key={index} className={`${message.role === "user" ? "flex justify-end" : ""}`}>
                  <Card
                    className={`max-w-3xl ${message.role === "user" ? "bg-zinc-900 text-white" : "bg-white border-2 border-zinc-200"}`}
                  >
                    <div className="p-5">
                      {message.role === "assistant" ? (
                        <AssistantMessage content={message.content} />
                      ) : (
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      )}
                    </div>
                  </Card>
                </div>
              ))}

              {isThinking && <ThinkingSequence currentStep={thinkingStep} outputs={thinkingOutputs} />}
              {thinkingCollapsed && thinkingTime > 0 && (
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => setThinkingCollapsed(false)}
                >
                  <div className="px-4 py-2 bg-zinc-100 rounded-full text-sm font-medium text-zinc-700 hover:bg-zinc-200 transition-colors">
                    Thought for {thinkingTime} seconds
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Fixed input area */}
        <div className="border-t border-zinc-200 bg-white w-full sticky bottom-0 left-0 z-10">
          <div className="max-w-4xl mx-auto p-6">
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Textarea
                    placeholder="Type your message here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="resize-none border-2 border-zinc-200 focus-visible:ring-zinc-900 text-zinc-900 placeholder:text-zinc-400 min-h-[30] max-h-[50px]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <input
                      type="file"
                      id="file-upload"
                      className="sr-only"
                      accept=".vcml,.sbml"
                      onChange={handleFileUpload}
                    />
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-flex h-12 w-12 items-center justify-center rounded-md border-2 border-zinc-200 bg-white hover:bg-zinc-100 transition-colors"
                    >
                      <FileUp size={20} className="text-zinc-900" />
                      <span className="sr-only">Upload VCML or SBML file</span>
                    </Label>
                  </div>
                  <Button
                    size="icon"
                    className="h-12 w-12 rounded-md bg-zinc-900 hover:bg-zinc-800"
                    onClick={handleSend}
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
              <div className="text-xs text-zinc-500 text-center">Supported file types: .vcml, .sbml</div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
