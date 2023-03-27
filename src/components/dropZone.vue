<template>
  <div
    class="d-flex align-center flex-column"
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent
    @drop.prevent="drop($event), toggleActive()"
  >
    <v-card
      width="600"
      height="400"
      class="d-flex flex-column pa-4 my-border"
      :class="{ active: isActive }"
    >
      <v-card-item>
        <v-card-title class="text-center text-medium-emphasis text-uppercase"
          >Drag and drop a folder here</v-card-title
        >
      </v-card-item>

      <v-card-text class="d-flex justify-center align-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="rgb(76, 175, 80)"
          width="100"
          height="100"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      </v-card-text>
      <v-card-subtitle
        class="mb-4 text-center text-medium-emphasis text-uppercase"
        >or</v-card-subtitle
      >
      <v-btn size="x-large" color="success" @click="store.accessingFolder">
        Open meta-data directory
      </v-btn>
    </v-card>
  </div>
</template>
<script>
import { useMetaDirectoryStore } from "../stores/metaDirectory";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export default {
  setup() {
    const store = useMetaDirectoryStore();
    const { files, directoryHandle } = storeToRefs(store);
    const isActive = ref(false);
    const toggleActive = () => {
      isActive.value = !isActive.value;
    };
    const drop = (event) => {
      [...event.dataTransfer.items]
        .filter((item) => {
          return item.kind === "file";
        })
        .forEach((item) => {
          item.getAsFileSystemHandle().then((dirHandle) => {
            directoryHandle.value = dirHandle;
            store.verifyPermission(directoryHandle.value, true);
            files.value = store.readFolder(directoryHandle.value);
          });
        });
    };

    return {
      store,
      drop,
      isActive,
      toggleActive,
    };
  },
};
</script>
<style scoped>
.my-border {
  border: 2px dashed rgb(45, 44, 44);
}
.active {
  background-color: rgba(136, 215, 164, 0.5);
}
</style>
