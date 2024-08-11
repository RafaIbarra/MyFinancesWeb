import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://181.127.188.23:8443',
        changeOrigin: true,
        secure: false, // Desactiva la verificación SSL
      },
    },
  },
});