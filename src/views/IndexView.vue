<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col class="mt-2" cols="12">
        <v-sheet class="fill-height d-flex align-center justify-center">
          {{ $route }}
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
// import { useRoute, useRouter } from 'vue-router'
// import { ref, watch, onBeforeMount } from 'vue'
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
    // const route = useRoute()
    // const router = useRouter()
    // const file = ref()
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
      // file,
      index
    }
  }
}
</script>
