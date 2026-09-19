import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deploying on Vercel: base stays '/'.
// If you ever switch to GitHub Pages instead, change this to '/<repo-name>/'.
export default defineConfig({
  plugins: [react()],
  base: '/'
});
