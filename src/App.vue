<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Meta-data editor</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" hide-overlay>
      
      <!-- <IndexFile/> -->
      <FilesList/>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-2">
      <RouterView />
      <!-- <v-container class="fill-height">
        <v-row class="fill-height">
          <v-col class="mt-2" cols="12">
            <v-alert
              v-if="isLoad"
              class="mb-6"
              closable
              text="Directory is load!"
              type="success"
              variant="tonal"
              transition="slide-y-transition"
            ></v-alert>
            <v-sheet class="fill-height d-flex align-center justify-center">
              <div
                v-if="!isLoad"
                class="bg-gray-50 w-full min-h-screen flex items-center justify-center dark:bg-gray-900"
              >
                <div class="flex flex-col items-center justify-center">
                  <dropZone/>
                </div>
              </div>
              <FileScreen v-else />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container> -->
    </v-main>
  </v-app>
</template>

<script setup>

import { ref } from "vue";
import { useMetaDirectoryStore } from "@/stores/metaDirectory"; 
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { useRouter } from "vue-router";
import FilesList from "@/components/FilesList.vue";

const drawer = ref(null);
const { isLoad, currentFileName } = storeToRefs(useMetaDirectoryStore());
const router = useRouter();

watch(isLoad, () => {
  if (isLoad.value) {
    router.push(`/files/${currentFileName.value}`);
  } 
});
</script>
