import { Plus, User2 } from "lucide-react"
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
} from "@/components/ui/sidebar"

// Sample data for recent chats
const recentChats = [
  "Protein Structure Analysis",
  "Gene Expression Data",
  "Molecular Dynamics Simulation",
  "Phylogenetic Tree Analysis",
]

export function AppSidebar() {
  return (
    <Sidebar className="border-zinc-200">
      <SidebarHeader className="border-b border-zinc-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-2 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900"
              >
                <Plus size={18} />
                <span className="font-medium">New Chat</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-500 font-medium">User Profile</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white font-medium">
                JD
              </div>
              <div>
                <div className="text-sm font-medium text-zinc-900">John Doe</div>
                <div className="text-xs text-zinc-500">john.doe@example.com</div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-500 font-medium">Recent Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentChats.map((chat, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a href="#" className="text-zinc-800 hover:text-zinc-900">
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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#" className="flex items-center gap-2 text-zinc-800">
                <User2 size={18} />
                <span>Account Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
