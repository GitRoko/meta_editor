import 'vuetify/styles'

// import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { mdiAccount, mdiMinus, mdiFileCodeOutline, mdiHome, mdiFileRefreshOutline, mdiDotsVertical, mdiChevronUp, mdiChevronDown, mdiPlus, mdiChevronLeft, mdiChevronRight } from '@mdi/js'
// import colors from 'vuetify/lib/util/colors'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      account: mdiAccount,
      minus: mdiMinus,
      plus: mdiPlus,
      file: mdiFileCodeOutline,
      home: mdiHome,
      refresh: mdiFileRefreshOutline,
      verticalDots: mdiDotsVertical,
      chevLeft: mdiChevronLeft,
      chevRight: mdiChevronRight,
      chevUp: mdiChevronUp,
      chevDown: mdiChevronDown,
    },
    sets: {
      mdi,
    },
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#607D8B',
          secondary: '#78909C',
        }
      },
    },
  },
})