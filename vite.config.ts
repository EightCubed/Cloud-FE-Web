import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',  // Set the base path
  server: {
    host: '0.0.0.0',
    port: 5173
  }
});
