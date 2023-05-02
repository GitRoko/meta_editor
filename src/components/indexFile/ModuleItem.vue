<template>
  <v-window-item>
    <v-card>
      <v-divider></v-divider>
      <v-card-item class="d-flex flex-row-reverse">
        <v-btn
          variant="plain"
          @click="$emit('removeModuleItem')"
          size="x-small"
          density="compact"
          :disabled="length === 1"
        >
          remove module
        </v-btn>
      </v-card-item>
      <v-card-item>
        <div v-for="(item, key, i) in localModuleItem" :key="i">
          
          <div v-if="key !== 'data'" class="d-flex flex-row pa-2">
            <v-text-field
              :modelValue="localModuleItem[key]"
              @update:modelValue="$emit('updateModuleItemValue', { key: key, value: $event })"
              :label="key"
              density="compact"
              variant="outlined"
              class="w-100 ma-2"
            ></v-text-field>
          </div>
          <ModuleItemDataList 
            v-if="key === 'data'" 
            v-model="localModuleItem[key]" 
            />
            <!-- @update:modelValue="$emit('updateModuleItemData', { key: key, value: $event })" -->
        </div>
      </v-card-item>
    </v-card>
  </v-window-item>
</template>

<script setup>
import { computed } from 'vue'
// import { defineEmits, defineProps } from 'vue'
import ModuleItemDataList from '@/components/indexFile/ModuleItemDataList.vue'
defineEmits(['removeModuleItem', 'update:modelValue', 'updateModuleItemValue'])
const props = defineProps({
  moduleItem: {
    type: Object
  },
  length: {
    type: Number
  }
})
const localModuleItem = computed(() => props.moduleItem)
// const localModuleItem = computed(() => {
//   const result = transformDictToArray(props.moduleItem.value)
//   return result
// })
// const localItem = ref({})

// onBeforeMount(() => {
//   localItem.value = { ...localItem.value, ...props.moduleItem }
// })

// const transformDictToArray = (dict) => {
//   const result = Object.keys(dict).map((key) => {
//     return {
//       key: key,
//       value: dict[key]
//     }
//   })
//   return result
// }

// const transformArrayToDict = (array) => {
//   const result = {}
//   array.forEach((item) => {
//     result[item.key] = item.value
//   })
//   return result
// }
</script>
