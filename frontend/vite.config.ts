import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Аліаси для зручного імпорту
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  // Для локальної розробки проксуємо /api/* до CMS (щоб уникнути CORS)
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
