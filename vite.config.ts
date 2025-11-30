import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import checker from 'vite-plugin-checker'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }), tailwindcss(), tsconfigPaths({ projects: [process.cwd() + '/tsconfig.app.json'] }), checker({
    typescript:true
  })],
})