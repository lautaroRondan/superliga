import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Configura las opciones de compilación
    charset: 'utf-8',
    // Otras opciones de compilación...
  },
  
})
