"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusCircle, MessageSquare, Settings } from "lucide-react"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface SidebarProps {
  onNewChat: () => void
  activeChatId: string | null
  setActiveChatId: (id: string) => void
}

// Mock chat history data
const CHAT_HISTORY = [
  { id: "1", title: "Understanding protein folding", date: "2 hours ago" },
  { id: "2", title: "CRISPR gene editing techniques", date: "Yesterday" },
  { id: "3", title: "Neural network architectures", date: "3 days ago" },
  { id: "4", title: "Quantum computing basics", date: "1 week ago" },
]

export function Sidebar({ onNewChat, activeChatId, setActiveChatId }: SidebarProps) {
  return (
    <SidebarProvider>
      <ShadcnSidebar className="w-64 border-r">
        <SidebarHeader className="p-4">
          <Button onClick={onNewChat} className="w-full flex items-center gap-2" variant="outline">
            <PlusCircle size={16} />
            New Chat
          </Button>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {CHAT_HISTORY.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton
                  onClick={() => setActiveChatId(chat.id)}
                  isActive={activeChatId === chat.id}
                  className="flex items-center gap-2 w-full"
                >
                  <MessageSquare size={16} />
                  <div className="flex flex-col">
                    <span className="text-sm truncate">{chat.title}</span>
                    <span className="text-xs text-muted-foreground">{chat.date}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">Researcher</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <Settings size={16} />
            </Button>
          </div>
        </SidebarFooter>
      </ShadcnSidebar>
    </SidebarProvider>
  )
}
