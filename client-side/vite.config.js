import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Ensure build files are placed in the 'dist' directory
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
})
