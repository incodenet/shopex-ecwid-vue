import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'shopex-ecwid-vue',
  plugins: [vue(), vueJsx(), viteSingleFile()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://app.ecwid.com/api/v3/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    exclude: ['oh-vue-icons/icons']
  }
})
