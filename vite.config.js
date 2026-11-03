import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Multi-page: main site + dedicated WiFi shell (gets its own noindex <head>)
      input: {
        main: 'index.html',
        wifi: 'wifi.html',
      },
    },
  },
})
