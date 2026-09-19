import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Deploying on Vercel: base stays '/'.
// If you ever switch to GitHub Pages instead, change this to '/<repo-name>/'.
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png'],
      manifest: {
        name: 'C2 Proficiency Practice',
        short_name: 'C2 Practice',
        description: 'Use of English practice for the C2 Murcia teaching oposición',
        theme_color: '#16213E',
        background_color: '#F1F3F5',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        // Cache the app shell so it opens even with a flaky connection —
        // exercises are all bundled in the JS, so this effectively makes
        // the whole practice experience work offline once visited once.
        globPatterns: ['**/*.{js,css,html,png,svg}']
      }
    })
  ],
  base: '/'
});
