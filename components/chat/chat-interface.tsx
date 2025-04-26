import type { Message } from "ai"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { FileCard } from "@/components/chat/file-card"

interface ChatInterfaceProps {
  messages: Message[]
  uploadedFiles: File[]
}

export function ChatInterface({ messages, uploadedFiles }: ChatInterfaceProps) {
  return (
    <div className="flex flex-col gap-6 p-6 overflow-y-auto max-w-3xl mx-auto w-full">
      {uploadedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {uploadedFiles.map((file, index) => (
            <FileCard key={index} file={file} />
          ))}
        </div>
      )}

      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-[50vh]">
          <p className="text-muted-foreground text-center">Send a message to start the conversation</p>
        </div>
      ) : (
        messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role !== "user" && (
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}

            <div className={`max-w-[80%] ${message.role === "user" ? "order-1" : "order-2"}`}>
              <Card className={`p-4 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                {message.role === "assistant" && message.content.includes("biomodel") ? (
                  <AssistantResponseWithImages content={message.content} />
                ) : (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                )}
              </Card>
            </div>

            {message.role === "user" && (
              <Avatar className="h-8 w-8 order-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))
      )}
    </div>
  )
}

// This component simulates a response with images and references
function AssistantResponseWithImages({ content }: { content: string }) {
  // In a real app, you would parse the content to extract images and references
  // For this demo, we'll simulate it
  return (
    <div className="space-y-4">
      <p className="whitespace-pre-wrap">
        Based on your query, I've analyzed the protein structure data. The folding pattern shows significant alpha-helix
        formations in the N-terminal region.
      </p>

      <div className="grid grid-cols-2 gap-4 my-4">
        <div>
          <img src="/placeholder.svg?height=200&width=300" alt="Biomodel plot 1" className="rounded-md w-full" />
          <p className="text-xs text-center mt-1">Figure 1: Protein folding simulation</p>
        </div>
        <div>
          <img src="/placeholder.svg?height=200&width=300" alt="Biomodel plot 2" className="rounded-md w-full" />
          <p className="text-xs text-center mt-1">Figure 2: Energy landscape</p>
        </div>
      </div>

      <div className="bg-background/50 p-3 rounded-md text-sm">
        <h4 className="font-medium mb-2">References:</h4>
        <ol className="list-decimal pl-5 space-y-1">
          <li>
            Smith et al. (2023). "Novel approaches to protein structure prediction." Nature Biotechnology, 41(3),
            289-301.
          </li>
          <li>
            Johnson & Lee (2022). "Deep learning applications in structural biology." Science, 375(6582), 620-626.
          </li>
          <li>
            Zhang et al. (2023). "AlphaFold3: Improved protein structure prediction using multiple sequence alignment."
            bioRxiv.
          </li>
        </ol>
      </div>
    </div>
  )
}
