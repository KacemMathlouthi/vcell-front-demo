"use client"

import { type ChangeEvent, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paperclip, Send } from "lucide-react"

interface ChatInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onFileUpload: (files: File[]) => void
  disabled?: boolean
}

export function ChatInput({ value, onChange, onFileUpload, disabled }: ChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      onFileUpload(filesArray)
    }
  }

  return (
    <div className="flex items-center gap-2 w-full max-w-3xl mx-auto">
      <Button type="button" variant="outline" size="icon" onClick={handleFileClick} disabled={disabled}>
        <Paperclip size={16} />
      </Button>

      <Input
        value={value}
        onChange={onChange}
        placeholder="Type your message..."
        className="flex-1"
        disabled={disabled}
      />

      <Button type="submit" size="icon" disabled={disabled || !value.trim()}>
        <Send size={16} />
      </Button>

      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} multiple />
    </div>
  )
}
