<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col class="mt-2" cols="12">
        <v-sheet class="fill-height">
          <h2>Index</h2>
          <div>
            {{ index }}
          </div>
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

    // onBeforeMount(() => {
    //   if (index.value) {
    //     file.value = getCurrentFileData.value
    //   } else {
    //     router.push('/files')
    //   }
    // })

    // watch(
    //   () => route.params.fileName,
    //   (fileName) => {
    //     currentFileName.value = fileName
    //     if (getCurrentFileData.value) {
    //       file.value = getCurrentFileData.value
    //     } else {
    //       router.push('/files')
    //     }
    //   }
    // )
    return {
      index
    }
  }
}
</script>
