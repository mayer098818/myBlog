import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages project site lives under /<repo-name>/, not /
  // Must match your repo name in the URL: https://mayer098818.github.io/myBlog/
  base: '/myBlog/',
  plugins: [react()],
  define: {
    global: 'globalThis'
  },
  resolve: {
    alias: {
      buffer: 'buffer'
    }
  }
})
