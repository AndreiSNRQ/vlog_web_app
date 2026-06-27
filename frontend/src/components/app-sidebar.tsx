"use client"

import NavMain from "@/components/navmain"
import NavUser from "@/components/navuser"
import * as React from "react"
import {
  Home,
  SquarePen,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"


// This is sample data.
const data = {
  user: {
    App_Name: "Vlog Web App",
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      name: "Home",
      url: "/",
      icon: Home,
    },
    {
      name: "Post",
      url: "/post",
      icon: SquarePen,
    },
    {
      name: "Friends",
      url: "/friends",
      icon: Users,
    },
  ],
  projects: [
    {
      name: "Home",
      url: "/",
      icon: Home,
    },
    {
      name: "Post",
      url: "/post",
      icon: SquarePen,
    },
    {
      name: "Friends",
      url: "/friends",
      icon: Users,
    },
  ],
}

function SidebarTitle() {
  const appName = data.user.App_Name

  return (
    <div className="flex bg-gradient-to-r from-foreground to-white rounded-r-0 rounded-l-full text-white px-4 py-2 items-center justify-center">
      <span className="text-xl font-bold">{appName}</span>
    </div>
  )
}
// function SidebarTime() {
//   const currentTime = new Date().toLocaleString()

//   return (
//     <div className="flex bg-gradient-to-r from-foreground to-white rounded-r-0 rounded-l-full text-white px-4 py-2 items-center justify-center">
//       <span className="text-xl font-bold">{currentTime}</span>
//     </div>
//   )
// }

function AppSidebar({
  children,
  ...props
}: React.ComponentProps<typeof Sidebar> & { children?: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarContent className="mt-2">
            <NavMain projects={data.navMain} />
          {/* <NavProjects projects={data.projects} /> */}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center mt-2 gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center">
              <SidebarTitle />
            </div>
          </div>
        </header>
        <div className="flex-1 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AppSidebar