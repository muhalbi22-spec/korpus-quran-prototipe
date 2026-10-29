import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  base: '/app/',
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  server: {
    host: true, // reachable from a tablet on the same Wi-Fi
    port: 5173,
    proxy: { '/api': 'http://localhost:3001' },
  },
  build: {
    outDir: '../api/public/app',
    emptyOutDir: true,
    chunkSizeWarningLimit: 2500,
  },
});
