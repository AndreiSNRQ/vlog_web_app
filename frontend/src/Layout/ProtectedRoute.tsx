import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import AppSidebar from "@/components/app-sidebar"
import LoginModal from "@/components/app/login_modal"

export function ProtectedRoute() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") {
      return false
    }

    return window.localStorage.getItem("vlog-auth") === "true"
  })

  const handleClose = () => {
    navigate("/", { replace: true })
  }

  const handleLogin = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("vlog-auth", "true")
    }

    setIsAuthenticated(true)
  }

  if (!isAuthenticated) {
    return (
      <AppSidebar>
        <LoginModal isOpen onClose={handleClose} onLogin={handleLogin} />
      </AppSidebar>
    )
  }

  return (
    <AppSidebar>
      <Outlet />
    </AppSidebar>
  )
}