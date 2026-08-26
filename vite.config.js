import net from 'node:net'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function canBind(port, host) {
  return new Promise((resolve) => {
    const server = net.createServer()
    server.unref()
    server.once('error', (err) => {
      if (err.code === 'EADDRNOTAVAIL' || err.code === 'EAFNOSUPPORT' || err.code === 'EINVAL') {
        resolve(true)
        return
      }
      resolve(false)
    })
    server.once('listening', () => {
      server.close(() => resolve(true))
    })
    server.listen({ port, host, exclusive: true })
  })
}

async function nextFreePort(startPort) {
  for (let port = startPort; port < startPort + 100; port += 1) {
    const ipv4Free = await canBind(port, '0.0.0.0')
    const ipv6Free = await canBind(port, '::1')
    if (ipv4Free && ipv6Free) return port
  }
  throw new Error(`No free port found from ${startPort}`)
}

// https://vite.dev/config/
export default defineConfig(async ({ command }) => {
  const port = command === 'serve' ? await nextFreePort(5173) : 5173

  return {
    base: command === 'serve' ? '/' : '/portfolio/',
    plugins: [react()],
    publicDir: 'public',
    server: {
      host: '0.0.0.0',
      port,
      strictPort: true,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      copyPublicDir: true,
    },
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
  }
})
