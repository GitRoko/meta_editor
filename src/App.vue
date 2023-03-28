<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Meta-data editor</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" hide-overlay>
      
      <FilesListMenu />

    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-2">
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>

import { ref } from "vue";
import { useMetaDirectoryStore } from "@/stores/metaDirectory"; 
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { useRouter } from "vue-router";
import FilesListMenu from "@/components/FilesListMenu.vue";

const drawer = ref(null);
const { isLoad, currentFileName } = storeToRefs(useMetaDirectoryStore());
const router = useRouter();

watch(isLoad, () => {
  if (isLoad.value) {
    router.push(`/files/${currentFileName.value}`);
  } 
});
</script>
