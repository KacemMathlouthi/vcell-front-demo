import { Plus, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

// Sample data for recent chats
const recentChats = [
  "Public models by user ion",
  "The model with ID 201844485",
  "VCell models related to calcium",
  "Educational models created after 2020",
]

export function AppSidebar() {
  return (
    <Sidebar className="border-zinc-200">
      <SidebarHeader className="border-b border-zinc-200">
        <div className="p-1">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 border-2 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900 font-medium"
          >
            <Plus size={18} />
            <span>New Chat</span>
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-500 font-medium">Recent Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentChats.map((chat, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a href="#" className="text-zinc-800 hover:text-zinc-900 font-medium">
                      {chat}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-zinc-200">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white font-medium">
              KM
            </div>
            <div>
              <div className="text-sm font-medium text-zinc-900">Kacem Mathlouthi</div>
              <div className="text-xs text-zinc-500">kacem@example.com</div>
            </div>
          </div>

          <SidebarSeparator className="my-3" />

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center gap-2 text-zinc-800">
                  <Settings size={18} />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center gap-2 text-zinc-800">
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
