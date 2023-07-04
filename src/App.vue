<template>
  <v-app id="inspire">
    <v-layout>
      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Meta-data editor</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer app v-model="drawer" hide-overlay width="300">
        <FilesListMenu />
      </v-navigation-drawer>

      <v-navigation-drawer
        app
        location="right"
        hide-overlay
        style="font-size: 10px"
        permanent
        width="300"
      >
        <v-list>
          <v-list-item v-if="$route.params.fileName" title="Fields">
            <pre v-if="getCurrentFile">
              {{ getCurrentFile.fileData.fields }}
            </pre>
          </v-list-item>
          <v-list-item v-else-if="index" title="Fields">
            <pre>
              {{ index.fileData.module }}
            </pre>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="bg-grey-lighten-2">
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useMetaDirectoryStore } from '@/stores/metaDirectory'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import FilesListMenu from '@/components/FilesListMenu.vue'

const drawer = ref(null)
const { isLoad, currentFileName, getCurrentFile, index } = storeToRefs(useMetaDirectoryStore())
const router = useRouter()

watch(isLoad, () => {
  if (isLoad.value) {
    router.push(`/${currentFileName.value}`)
  }
})
</script>
