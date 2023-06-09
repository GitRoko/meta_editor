import 'vuetify/styles'

// import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { mdiAccount, mdiMinus, mdiFileCodeOutline, mdiHome, mdiFileRefreshOutline, mdiDotsVertical, mdiChevronUp, mdiChevronDown } from '@mdi/js'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      account: mdiAccount,
      minus: mdiMinus,
      file: mdiFileCodeOutline,
      home: mdiHome,
      refresh: mdiFileRefreshOutline,
      verticalDots: mdiDotsVertical,
      chevUp: mdiChevronUp,
      chevDown: mdiChevronDown,
    },
    sets: {
      mdi,
    },
  },
})