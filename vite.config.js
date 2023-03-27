import { fileURLToPath, URL } from 'node:url'
import { viteSingleFile } from 'vite-plugin-singlefile'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vuetify({
      autoImport: true,
    }),
    viteSingleFile()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }

})
