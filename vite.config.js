import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages serves project sites under a subpath (e.g. /tools/),
  // so use a relative base to avoid broken asset URLs.
  base: './',
  plugins: [react()],
})

