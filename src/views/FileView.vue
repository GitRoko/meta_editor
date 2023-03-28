<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col class="mt-2" cols="12">
        <v-sheet class="fill-height">
          <h2>FileView {{ $route.params.fileName }}</h2>
          <div>
            {{ file }}
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, onBeforeMount } from 'vue'
import { useMetaDirectoryStore } from '@/stores/metaDirectory'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const file = ref()
    const { currentFileName, getCurrentFileData, isLoad } = storeToRefs(useMetaDirectoryStore())

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
    watch(
      () => isLoad.value,
      (status) => {
        if (status === false) {
          router.push('/')
        }
      }
    )
    
    return {
      file,
      isLoad,
      currentFileName,
      getCurrentFileData
    }
  }
}
</script>
