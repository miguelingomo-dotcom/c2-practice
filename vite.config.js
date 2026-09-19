import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Change 'base' to your repo name if deploying to https://<user>.github.io/<repo>/
// e.g. base: '/c2-practice/'  — leave as '/' if using a custom domain or Vercel.
export default defineConfig({
  plugins: [react()],
  base: '/'
});
