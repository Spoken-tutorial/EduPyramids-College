import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // optional, sets dev server port
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Django backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
