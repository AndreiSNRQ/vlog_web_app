import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Loader } from "lucide-react"
import { Link } from "react-router-dom"



export function NavMain({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: React.ElementType
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="underline">Menu Items</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem className="" key={item.name}>
            <SidebarMenuButton asChild>
              <Link to={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <Loader className="text-sidebar-foreground/70 animate-spin size-4 " />
            <span>Incoming</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavMain