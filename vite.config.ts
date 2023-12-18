import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
  plugins: [react(), svgr(), eslint({ fix: false, include: ['src/**/*.tsx'] })],
  server: {
    port: 3000,
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: 'dist',
  },
  publicDir: 'assets',
  optimizeDeps: {
    exclude: ['react-particles-js']
  }
  ,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@configs': path.resolve(__dirname, './src/configs'),
      '@constants': path.resolve(__dirname, './src/utils/constants'),
      '@core': path.resolve(__dirname, './src/core'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@agent': path.resolve(__dirname, './src/agent'),
      '@models': path.resolve(__dirname, './src/models'),
      '@redux': path.resolve(__dirname, './src/redux'),
    }
  }
});
