<template v-if="currentFileName">
  <v-container class="fill-height" width="1024">
    <v-row dense class="fill-height">
      <v-col cols="12" class="pr-6 d-flex flex-row-reverse"> version: {{ getCurrentFileData.fileData.version }} </v-col>
      <v-col class="mt-2" cols="12">
        <div v-if="renderData['name']" class="px-2">
          <component
            :is="FileName"
            :renderData="renderData['name']"
            :filesNamesList="filesNamesList"
            :keyItem="'name'"
            :intialFileName="getCurrentFileData.fileName"
            @update:fileName="store.updateFileName"
          ></component>
        </div>
        <div v-for="(value, key, i) in renderData" :key="i">
          <div v-if="key !== 'name' && key !== 'fields'" class="my-2 px-2">
            <component
              :is="widgetMap[value.widget]"
              :renderData="value"
              :keyItem="key"
              v-model="getCurrentFileData.fileData[key]"
            ></component>
          </div>
          <div v-if="key === 'fields'" class="">
            <component
              :is="widgetMap[value.widget]"
              :renderData="value"
              :keyItem="key"
              v-model="getCurrentFileData.fileData[key]"
            ></component>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { watch, ref } from 'vue'
import { useMetaDirectoryStore } from '@/stores/metaDirectory'
import { storeToRefs } from 'pinia'
import FileName from '@/components/widgets/FileName.vue'
import TextInput from '@/components/widgets/TextInput.vue'
import FieldsList from '@/components/widgets/FieldsList.vue'

const route = useRoute()
const router = useRouter()
const store = useMetaDirectoryStore()
const { currentFileName, getCurrentFileData, isLoad, index, filesNamesList } = storeToRefs(
  useMetaDirectoryStore()
)
const renderData = ref(index.value.fileData.module[0].data)

const widgetMap = {
  text: TextInput,
  filename: FileName,
  list: FieldsList
}

watch(
  () => route.params.fileName,
  (fileName) => {
    if (filesNamesList.value.includes(fileName)) {
      currentFileName.value = fileName
    } else {
      router.push({name: "PageNotFound"})
    }
  }
)

watch(
  () => currentFileName.value,
  (fileName) => {
    if (fileName !== route.params.fileName) {
      router.push(`/files/${fileName}`)
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
</script>
<style scoped>
@media only screen and (min-width: 960px) {
  .v-container {
    max-width: 960px;
  }
}
</style>
