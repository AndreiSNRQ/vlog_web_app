"use client"

import NavMain from "@/components/navmain"
import NavUser from "@/components/navuser"
import * as React from "react"
import {
  Home,
  SquarePen,
  Users,
} from "lucide-react"
import api from "@/api/axios"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"


const appMeta = {
  App_Name: "Vlog Web App",
}

const navMain = [
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
]

function SidebarTitle() {
  const appName = appMeta.App_Name

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
  const [user, setUser] = React.useState({
    name: "Guest",
    email: "Emal",
    avatar: "",
  })

  React.useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem("authUser")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
          return
        } catch {
          localStorage.removeItem("authUser")
        }
      }

      const token = localStorage.getItem("authToken")
      if (!token) {
        return
      }

      try {
        const response = await api.get("/user")
        const nextUser = {
          name: response.data?.name || "User",
          email: response.data?.email || "user@example.com",
          avatar: response.data?.avatar || "",
        }
        setUser(nextUser)
        localStorage.setItem("authUser", JSON.stringify(nextUser))
      } catch {
        localStorage.removeItem("authToken")
        localStorage.removeItem("authUser")
      }
    }

    loadUser()
  }, [])

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarContent className="mt-2">
            <NavMain projects={navMain} />
          {/* <NavProjects projects={data.projects} /> */}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
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