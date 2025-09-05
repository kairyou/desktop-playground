import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        // Alias shared-ui to source code for hot reload
        '@desktop/shared-ui': resolve(__dirname, '../../packages/shared-ui/src')
      }
    },
    plugins: [react()],
    server: {
      watch: {
      },
    },
    // Don't pre-bundle workspace packages in dev
    optimizeDeps: {
      exclude: ["@desktop/shared-ui"],
    },
  }
})