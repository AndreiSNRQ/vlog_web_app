import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss({
  })],
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/layout": path.resolve(__dirname, "./src/Layout"),
      "@/auth": path.resolve(__dirname, "./src/pages/auth"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/constants": path.resolve(__dirname, "./src/constants"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/services": path.resolve(__dirname, "./src/services"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/context": path.resolve(__dirname, "./src/context"),
      "@/api": path.resolve(__dirname, "./src/api"),
    },
  },
})