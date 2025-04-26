"use client"

import { FileText, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface FileCardProps {
  file: File
  onRemove?: () => void
}

export function FileCard({ file, onRemove }: FileCardProps) {
  // Function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <Card className="w-full max-w-xs">
      <CardContent className="p-3 flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-md">
          <FileText className="h-5 w-5 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
        </div>

        {onRemove && (
          <Button variant="ghost" size="icon" onClick={onRemove} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
