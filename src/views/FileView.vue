<template v-if="currentFileName">
  <v-container class="fill-height v-container" width="1024">
    <v-row class="fill-height">
      <v-col class="mt-2" cols="12">
        <v-card v-if="renderData['name']" class="px-2">
          <component
            :is="FileName"
            :renderData="renderData['name']"
            :filesNamesList="filesNamesList"
            :keyItem="'name'"
            :intialFileName="file.fileName"
            @update:fileName="onFileNameUpdate"
          ></component>
        </v-card>
        <div v-for="(value, key, i) in renderData" :key="`${i}-${key}`">
          <v-card v-if="key !== 'name' && key !== 'fields'" class="my-2 px-2">
            <component
              :is="widgetMap[value.widget]"
              :renderData="value"
              :keyItem="key"
              v-model="file.fileData[key]"
            ></component>
          </v-card>
          <div v-if="key === 'fields'" class="">
            <component
              :is="widgetMap[value.widget]"
              :renderData="value"
              :keyItem="key"
              v-model="file.fileData[key]"
            ></component>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch, onBeforeMount } from 'vue'
import { useMetaDirectoryStore } from '@/stores/metaDirectory'
import { storeToRefs } from 'pinia'
import FileName from '@/components/widgets/FileName.vue'
import TextInput from '@/components/widgets/TextInput.vue'
import FieldsList from '@/components/widgets/FieldsList.vue'

const route = useRoute()
const router = useRouter()
const file = ref(null)
const renderData = ref(null)
const store = useMetaDirectoryStore()
const { currentFileName, getCurrentFileData, isLoad, index, filesNamesList } = storeToRefs(store)

const widgetMap = {
  text: TextInput,
  filename: FileName,
  list: FieldsList
}

onBeforeMount(() => {
  currentFileName.value = route.params.fileName
  if (getCurrentFileData.value) {
    file.value = getCurrentFileData.value
    renderData.value = index.value.fileData.module[0].data
  }
})

watch(
  () => route.params.fileName,
  (fileName) => {
    if (fileName !== undefined) {
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

const onFileNameUpdate = (updateData) => {
  const { oldName, newName } = updateData
  // console.log('new file name:', newName, oldName)
  store.updateFileName(oldName, newName)
  router.push(`/files/${newName}`)
}
</script>
<style scoped>
@media only screen and (min-width: 960px) {
  .v-container {
    max-width: 960px;
  }
}
</style>
