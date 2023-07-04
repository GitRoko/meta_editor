<template>
  <!-- <pre style="font-size: 12px">
    {{ data }}
  </pre> -->
  <div v-for="(dataItem, i) in dataList" :key="i">
    <v-card class="my-2">
      <v-card-item>
        <DataItem :keyItem="dataItem.key" :dataItem="dataItem.items" />
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import DataItem from '@/components/indexFile/DataItem.vue'
const props = defineProps({
  moduleData: {
    type: Object
  }
})

// const data = computed(() => {
//   return props.moduleData
// })
const dataList = computed(() => {
  const moduleListKey = Object.keys(props.moduleData)
  const result = moduleListKey.map(key => ({ "key": key, items: props.moduleData[key]}))
  return result
})

// const fieldItem = {
//   key: "name_of_fieldItem",
//   typeUI: [
//     {
//       "text": {
//         widget: "text",
//         validation: {
//           regexp: "string",
//           unique: "boolean"
//         }
//       }
//     },
//     {
//       "filename": {
//         widget: "filename",
//         validation: {
//           regexp: "string",
//           unique: "boolean"
//         }
//       }
//     },
//     {
//       "enum": {
//         widget: "enum",
//         type: ["select of values", "select of mapping"],
//         values: ["string"],
//         mapping: {
//           key: "name of widget to map",
//           value: [ "string"]
//         },
//       }
//     }
//   ]
// }

</script>
