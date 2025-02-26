import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        'src/main.jsx', // Ignore main.jsx
        'vite.config.js', // Ignore Vite config
        'eslint.config.js', // Ignore ESLint config
      ]
    },
  },
});
