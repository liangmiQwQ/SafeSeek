import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  /*build: {
    rollupOptions: {
      input: {
        popup: 'index.html',
        manifest: 'manifest.json' // 将 manifest 文件打包
      },
    },
  },*/
})
