import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from '@/pages/home'
import { Post } from '@/pages/post'
import { friends as Friends } from '@/pages/friends'
import { GuestRoute } from '@/layout/GuestRoute'
import { ProtectedRoute } from '@/layout/ProtectedRoute'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Login } from '@/pages/auth/login'
import './index.css'

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<GuestRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/post" element={<Post />} />
              <Route path="/friends" element={<Friends />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </>
  )
}

export default App