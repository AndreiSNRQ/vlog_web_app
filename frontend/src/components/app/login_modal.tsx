import { useState } from "react"
import axios from "axios"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EyeOff, Eye } from "lucide-react"
import { toast } from "react-hot-toast"
import { login, register } from "@/api/axios"

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) {
    return null
  }

  const handleSubmit = async () => {
    setError("")

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      setIsSubmitting(true)

      if (isRegister) {
        await register({ name, email, password })
        toast.success("Account created successfully.")
      } else {
        await login({ email, password })
        toast.success("Logged in successfully.")
      }

      onLogin()
    } catch (err: unknown) {
      let message = "Unable to complete authentication right now."

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        message = err.response.data.message
        setError(message)
      } else if (axios.isAxiosError(err) && err.response?.data?.errors) {
        const messages = Object.values(err.response.data.errors).flat().join(" ")
        message = messages as string
        setError(message)
      } else {
        setError(message)
      }

      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div>
            <DialogTitle>{isRegister ? "Register" : "Login"}</DialogTitle>
            <DialogDescription>
              {isRegister ? "Create a new account to continue." : "Login to your account to continue."}
            </DialogDescription>
          </div>
        </DialogHeader>
        <FieldSet>
          <FieldGroup>
            {isRegister && (
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required />
              </Field>
            )}
            <Field>
              <FieldLabel htmlFor="email">Email address</FieldLabel>
              <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="flex items-center gap-2">
                <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" />
                <Button type="button" variant="ghost" onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </Field>
            {isRegister && (
              <Field>
                <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
                <Input id="confirm-password" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="••••••••" />
              </Field>
            )}
            {error ? <p className="text-sm text-red-500">{error}</p> : null}
          </FieldGroup>
        </FieldSet>
        <DialogFooter className="">
          <div className="flex w-full justify-between">
            <Button variant="outline" onClick={() => setIsRegister((value) => !value)}>
              {isRegister ? "Back to login" : "Register"}
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Working..." : isRegister ? "Create account" : "Login"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal