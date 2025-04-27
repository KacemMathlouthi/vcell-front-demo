"use client"

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

export default function ChatPage() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [thinkingStep, setThinkingStep] = useState(0)
  const [showResponse, setShowResponse] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: input }])
    setInput("")

    // Start thinking sequence
    setIsThinking(true)
    setThinkingStep(0)
    setShowResponse(false)

    // Simulate thinking steps
    const steps = [
      "Extract Intent",
      "Extract Query Parameters",
      "Query the API",
      "Explain the API Response",
      "Check the Knowledge Base",
    ]
    let currentStep = 0

    const thinkingInterval = setInterval(() => {
      if (currentStep < steps.length - 1) {
        currentStep++
        setThinkingStep(currentStep)
      } else {
        clearInterval(thinkingInterval)
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

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-white">
        <header className="h-16 border-b border-zinc-200 flex items-center px-6 justify-between bg-white">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-zinc-800" />
            <h1 className="text-lg font-semibold tracking-tight">Chat Assistant</h1>
          </div>
          <ModelSelector />
        </header>

        <div className="flex-1 overflow-auto p-6 space-y-8">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold mb-8 text-zinc-900 tracking-tight">How can I help you today?</h2>
              <PromptTemplates onSelectPrompt={(prompt) => setInput(prompt)} />
            </div>
          ) : (
            <div className="space-y-8 pb-24 max-w-4xl mx-auto">
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

              {isThinking && <ThinkingSequence currentStep={thinkingStep} />}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-zinc-200 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12 flex-shrink-0 border-2 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900"
              >
                <FileUp size={20} />
              </Button>
              <div className="flex-1 relative">
                <Textarea
                  placeholder="Type your message here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="resize-none pr-14 min-h-[100px] border-2 border-zinc-200 focus-visible:ring-zinc-900 text-zinc-900 placeholder:text-zinc-400"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                />
                <Button
                  size="icon"
                  className="absolute right-3 bottom-3 rounded-full h-10 w-10 bg-zinc-900 hover:bg-zinc-800"
                  onClick={handleSend}
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
