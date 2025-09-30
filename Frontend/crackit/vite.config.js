import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    port: 4173, // optional, local testing port
    host: true, // 0.0.0.0 pe listen kare
    allowedHosts: [
      'crackit-frontend2.onrender.com' // Render frontend domain
    ]
  }
})
