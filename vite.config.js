import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/tree-test-react/',
  build: {
    outDir: 'docs',
  },
})