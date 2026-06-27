import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EyeOff, Eye } from "lucide-react"

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  if (!isOpen) {
    return null
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div>
            <AlertDialogTitle>{isRegister ? "Register" : "Login"}</AlertDialogTitle>
            <AlertDialogDescription>
              {isRegister ? "Create a new account to continue." : "Login to your account to continue."}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email address</FieldLabel>
              <Input id="email" type="email" placeholder="Email address" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="flex items-center gap-2">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                <Button type="button" variant="ghost" onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </Field>
            {isRegister && (
              <Field>
                <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
                <Input id="confirm-password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
              </Field>
            )}
          </FieldGroup>
        </FieldSet>
        <AlertDialogFooter className="">
          <div className="flex w-full justify-between">
            <Button variant="outline" onClick={() => setIsRegister((value) => !value)}>
              {isRegister ? "Back to login" : "Register"}
            </Button>
            <AlertDialogAction onClick={onLogin}>
              {isRegister ? "Create account" : "Login"}
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default LoginModal