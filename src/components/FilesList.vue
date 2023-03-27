<template>
  <v-card class="mx-2 my-4" max-width="300">
    <v-list density="compact" nav>
      <v-list-subheader>INDEX FILE</v-list-subheader>
      <v-list-item class="ml-4" active-color="primary" @click="router.push({ name: 'Index' })">
        <!-- <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template> -->

        <v-list-item-title>index.yaml</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-subheader>YAML FILES</v-list-subheader>
      <v-list-item
        class="ml-4"
        v-for="(file, i) in filesList"
        :key="i"
        :value="file"
        :active="selectedItem"
        @click="router.push(`/files/${file}`)"
      >
        <!-- <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template> -->

        <v-list-item-title>{{ file }} </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { useMetaDirectoryStore } from '@/stores/metaDirectory'
import { storeToRefs } from 'pinia'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const filesList = ref(null)
const router = useRouter()
const selectedItem = ref(null)

onBeforeMount(() => {
  const { filesNamesList } = storeToRefs(useMetaDirectoryStore())
  filesList.value = filesNamesList.value
  console.log(filesList.value)
})
</script>
