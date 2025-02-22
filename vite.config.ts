import copy from 'rollup-plugin-copy'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      plugins: [
        copy({
          targets: [
            {
              src: 'manifest.json',
              dest: './dist',
            },
            { src: 'icons/*.png', dest: 'dist/icons' },
          ],
          hook: 'writeBundle',
        }),
      ],
    },
  },
})
