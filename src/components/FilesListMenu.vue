<template>
  <v-card class="mx-2 my-4" max-width="300">
    <v-list density="compact" nav>
      <v-list-item active-color="primary" @click="router.push({ name: 'Home' }), store.$reset()">
        <template v-slot:prepend>
          <v-icon class="pa-0 mr-2" icon="$refresh"></v-icon>
        </template>

        <v-list-item-title>RESET</v-list-item-title>
      </v-list-item>

      <v-list-subheader v-if="isLoad">INDEX FILE</v-list-subheader>

      <v-list-item v-if="isLoad" active-color="primary" @click="router.push({name:'Index'})">
        <template v-slot:prepend>
          <v-icon class="pa-0 mr-2" icon="$file"></v-icon>
        </template>

        <v-list-item-title>index.yaml</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list v-if="isLoad" density="compact" nav>
      <v-list-subheader>YAML FILES</v-list-subheader>

      <v-list-item
        v-for="(file, i) in filesNamesList"
        :key="i"
        :value="file"
        :active="selectedItem"
        @click="changeActiveFile(file)"
      >
        <template v-slot:prepend>
          <v-icon class="pa-0 mr-2" icon="$file"></v-icon>
        </template>

        <v-list-item-title>{{ file }} </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { useMetaDirectoryStore } from '@/stores/metaDirectory'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useMetaDirectoryStore()
const { filesNamesList, isLoad, currentFileName } = storeToRefs(store)
const router = useRouter()
const selectedItem = ref(null)

const changeActiveFile = (file) => {
  currentFileName.value = file
  router.push(`/${file}`)
}
</script>
