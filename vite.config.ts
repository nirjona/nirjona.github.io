import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base '/' — the repo is nirjona.github.io (a user site), served at the domain root
export default defineConfig({
  plugins: [react()],
  base: '/',
})
