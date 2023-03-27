<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col class="mt-2" cols="12">
        <v-sheet class="fill-height d-flex align-center justify-center">
          {{ $route.params }}
          <h2>FileView</h2>
          <div>
            {{ file }}
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref, watch, onBeforeMount } from 'vue'
import { useMetaDirectoryStore } from '@/stores/metaDirectory'
import { storeToRefs } from 'pinia'

// const route = useRoute()
// const { fileName } = route.params
// const fn = function() {
//   console.log('this.$route.params', this.$route.params);
//   return this.$route.params
// }

export default {
  setup() {
    const route = useRoute()
    const file = ref()
    const { currentFileName, getCurrentFileData } = storeToRefs(useMetaDirectoryStore())

    onBeforeMount(() => {
      currentFileName.value = route.params.fileName
      if (getCurrentFileData.value) {
        file.value = getCurrentFileData.value
      }
    })

    watch(
      () => route.params.fileName,
      (fileName) => {
        if (fileName !== undefined) {
          console.log('fileName', fileName);
          currentFileName.value = fileName
          if (getCurrentFileData.value) {
            file.value = getCurrentFileData.value
          }
        }
      }
    )
    
    return {
      file,
      currentFileName,
      getCurrentFileData
    }
  }
}
</script>
