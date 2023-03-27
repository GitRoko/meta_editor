/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from '@/plugins/webfontloader'
import vuetify from '@/plugins/vuetify'

export function registerPlugins (app) {
  loadFonts()
  app.use(vuetify)
}
