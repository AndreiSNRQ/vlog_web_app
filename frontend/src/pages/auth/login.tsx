import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginModal from "@/components/app/login_modal"

export function Login() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage.getItem("vlog-auth") === "true") {
      navigate("/", { replace: true })
    }
  }, [navigate])

  const handleClose = () => {
    setOpen(false)
    navigate("/", { replace: true })
  }

  const handleLogin = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("vlog-auth", "true")
    }

    setOpen(false)
    navigate("/", { replace: true })
  }

  return (
    <LoginModal isOpen={open} onClose={handleClose} onLogin={handleLogin} />
  )
}