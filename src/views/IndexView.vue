<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col class="mt-2" cols="12">
        <v-sheet class="fill-height">
          <h2>Index</h2>
          <pre style="font-size: 12px;">
            {{ index.fileData.module[0].data }}
          </pre>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { useMetaDirectoryStore } from '@/stores/metaDirectory'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    
    const { index } = storeToRefs(useMetaDirectoryStore())

    return {
      index
    }
  }
}
</script>
