import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/recipe-app-2025/',  // ← ここ!! 必ずスラッシュで挟む
})
