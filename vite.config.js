import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Modern browsers (iOS 14+/Safari 14+) — skip legacy transpile, smaller output.
    target: 'es2020',
    cssCodeSplit: true,
    // Split heavy vendors into their own long-cached chunks so the browser can
    // parse them in parallel and reuse them across deploys.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
