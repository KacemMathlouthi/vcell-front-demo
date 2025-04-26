"use client";

import { useState, useRef, useEffect } from "react";
import { Sidebar } from "@/components/chat/sidebar";
import { ChatInterface } from "@/components/chat/chat-interface";
import { PromptTemplates } from "@/components/chat/prompt-templates";
import { ThinkingDialog } from "@/components/chat/thinking-dialog";
import { ModelSelector } from "@/components/chat/model-selector";
import { ChatInput } from "@/components/chat/chat-input";
import { nanoid } from "@/lib/utils";

// Mock message type
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    setActiveChatId(newChatId);
    setMessages([]);
  };

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleTemplateClick = (template: string) => {
    setInput(template);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Mock responses based on input
  const getMockResponse = (userInput: string): string => {
    // Check if input contains specific keywords to generate different responses
    if (userInput.toLowerCase().includes("protein") || userInput.toLowerCase().includes("folding")) {
      return "biomodel-Based on your query about protein folding, I've analyzed the structure data. The folding pattern shows significant alpha-helix formations in the N-terminal region. The energy landscape suggests a stable conformation with multiple local minima.";
    } else if (userInput.toLowerCase().includes("dna") || userInput.toLowerCase().includes("gene")) {
      return "I've analyzed the genetic sequence you're asking about. The gene expression patterns indicate regulatory elements in the promoter region. This is consistent with recent findings in epigenetic research.";
    } else if (userInput.toLowerCase().includes("neural") || userInput.toLowerCase().includes("brain")) {
      return "Neural networks are computational models inspired by the human brain. They consist of interconnected nodes (neurons) that process and transmit information. Modern deep learning architectures use multiple layers of these neurons to learn complex patterns in data.";
    } else {
      return "Thank you for your question. Based on my analysis, this appears to be related to biological sciences. The current research suggests multiple approaches to this problem, with recent publications highlighting innovative methodologies.";
    }
  };

  const simulateThinking = async () => {
    setIsThinking(true);
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    setIsThinking(false);
    
    // Add assistant response
    const response = getMockResponse(input);
    setMessages(prev => [
      ...prev, 
      { id: nanoid(), role: "assistant", content: response }
    ]);
    
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [
      ...prev, 
      { id: nanoid(), role: "user", content: input }
    ]);
    
    // Clear input
    setInput("");
    
    // Simulate thinking and response
    simulateThinking();
  };

  useEffect(() => {
    if (chatContainerRef.current && messages.length > 0) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        onNewChat={handleNewChat} 
        activeChatId={activeChatId} 
        setActiveChatId={setActiveChatId}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-end p-4">
          <ModelSelector 
            selectedModel={selectedModel} 
            setSelectedModel={setSelectedModel} 
          />
        </div>
        
        <div className="flex-1 overflow-auto" ref={chatContainerRef}>
          {activeChatId ? (
            <ChatInterface 
              messages={messages} 
              uploadedFiles={uploadedFiles}
            />
          ) : (
            <PromptTemplates onTemplateClick={handleTemplateClick} />
          )}
        </div>
        
        <div className="p-4 border-t">
          {activeChatId && (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <ChatInput 
                value={input} 
                onChange={handleInputChange} 
                onFileUpload={handleFileUpload}
                disabled={isThinking || isLoading}
              />
            </form>
          )}
        </div>
      </main>
      
      {isThinking && <ThinkingDialog />}
    </div>
  );
}
