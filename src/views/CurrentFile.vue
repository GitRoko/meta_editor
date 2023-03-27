<template>
  <v-container class="fill-height">
        <v-row class="fill-height">
          <v-col class="mt-2" cols="12">

            <v-sheet class="fill-height d-flex align-center justify-center">
              <h2>currentFile</h2>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
</template>

<script setup>
// import { useMetaDirectoryStore } from "@/stores/metaDirectory";
// import { storeToRefs } from "pinia";
// import { watch } from "vue";
// import { useRouter } from "vue-router";
// const router = useRouter();
// const { isLoad } = storeToRefs(useMetaDirectoryStore());

// watch(isLoad, (newValue, oldValue) => {
//   if (newValue === true) {
//     console.log("isLoad.value", isLoad.value);
//     router.push({ name: "CurrentFile" });
//   } else {
//     console.log("isLoad.value", isLoad.value);
//     router.push({ name: "Home" });
//   }
// });
</script>
