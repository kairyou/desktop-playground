import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), dts({
    insertTypesEntry: true
  })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SharedUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'tdesign-react', 'tdesign-icons-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'tdesign-react': 'TDesign',
          'tdesign-icons-react': 'TDesignIcons'
        }
      }
    }
  }
})