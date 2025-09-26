import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],    
  theme: {
    extend: {
      colors: {
        primary: '#2A3491',
        secondary: '#F9C60D',
        success: '#2e7d32',
        warning: '#ed6c02',
        error: '#d32f2f',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        }
      }
    },
  },
})


