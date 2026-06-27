import { Outlet } from "react-router-dom"
import AppSidebar from "@/components/app-sidebar"

export function GuestRoute() {
  return <AppSidebar><Outlet /></AppSidebar>
}