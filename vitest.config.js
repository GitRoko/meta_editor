import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'
// import vuetify from 'vite-plugin-vuetify'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ['**/__tests__/**/*.spec.js'],
      // compilerOptions: {
      //   // Подключение Vuetify в качестве глобальной зависимости
      //   isCustomElement: tag => tag.startsWith('v-')
      // },
      environment: 'jsdom',
      // exclude: [...configDefaults.exclude, 'e2e/*'],
      exclude: [
        ...configDefaults.exclude,
        '**/node_modules/**',
        '**/dist/**',
        '**/cypress/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*'
      ],
      root: fileURLToPath(new URL('./', import.meta.url)),
      deps: {
        inline: ['vuetify']
      },
      globals: true
    }
  })
)
