import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

/*
  WHY PATH ALIASES?
  ─────────────────
  Without alias, imports look like this:
    import '../../../styles/Hero.css'   ← confusing, breaks if you move files
  
  With alias '@' pointing to 'src/':
    import '@/styles/Hero.css'          ← always works, from ANY depth
  
  The '@' symbol is a common convention in the React/Vue community.
  '@' = "start from src/" — like a GPS address vs "turn left, then right, then..."
  
  path.resolve(__dirname, 'src') = the ABSOLUTE path to our src/ folder
  __dirname = the folder where vite.config.js lives (project root)
  path.resolve joins them: "C:/Users/admin/Desktop/React-based webpage/src"
*/

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // Now '@/styles/Hero.css' = 'src/styles/Hero.css' — always
    },
  },
})
