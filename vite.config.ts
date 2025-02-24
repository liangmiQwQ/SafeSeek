import copy from 'rollup-plugin-copy'
import { defineConfig } from 'vite'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  build: {
    terserOptions: {
      compress: { drop_console: true }, // 移除console.log
    },

    rollupOptions: {
      plugins: [
        copy({
          targets: [
            {
              src: 'manifest.json',
              dest: './dist',
            },
            {
              src: './src/plugin/background.js',
              dest: './dist',
            },
            {
              src: './src/plugin/content.js',
              dest: './dist',
            },
            {
              src: 'icons/*.png',
              dest: 'dist/icons',
            },
          ],
          hook: 'writeBundle',
        }),
      ],
    },
  },
})
