import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/recipe-app-2025/',   // ★ ここが超重要！！
  plugins: [react()],
});

