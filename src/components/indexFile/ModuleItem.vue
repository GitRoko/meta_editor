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
        <div v-for="(item, i) in localMIParsedToArray" :key="i">
          <div v-if="item.key !== 'data'" class="d-flex flex-row pa-2">
            <v-text-field
              :modelValue="item.value"
              @update:modelValue="$emit('updateModuleItemValue', { key: item.key, value: $event })"
              :label="item.key"
              density="compact"
              variant="outlined"
              class="w-100 ma-2"
            ></v-text-field>
          </div>
          <ModuleItemDataList 
            v-if="item.key === 'data'" 
            :modelValue="item.value" 
            @update:modelValue="$emit('updateModuleItemValue', { key: item.key, value: $event })"
          />
        </div>
      </v-card-item>
    </v-card>
  </v-window-item>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { defineEmits, defineProps } from 'vue'
import ModuleItemDataList from '@/components/indexFile/ModuleItemDataList.vue'
const emit = defineEmits(['removeModuleItem', 'update:modelValue', 'updateModuleItemValue'])
const props = defineProps({
  moduleItem: {
    type: Object
  },
  length: {
    type: Number
  }
})
const localMI = computed(() => props.moduleItem)
const localMIParsedToArray = computed(() => {
  const result = transformDictToArray(localMI.value)
  return result
})
const localItem = ref({})

onBeforeMount(() => {
  localItem.value = { ...localItem.value, ...props.moduleItem }
})

const transformDictToArray = (dict) => {
  const result = Object.keys(dict).map((key) => {
    return {
      key: key,
      value: dict[key]
    }
  })
  return result
}

const transformArrayToDict = (array) => {
  const result = {}
  array.forEach((item) => {
    result[item.key] = item.value
  })
  return result
}
</script>
