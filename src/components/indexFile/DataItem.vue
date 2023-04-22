<template>
  <div class="data-item pt-1 w-25">
    <div class="data-item__key">
      <v-text-field
        v-model="name"
        :label="'key'"
        density="compact"
        variant="outlined"
      ></v-text-field>

    </div>
    <div 
    v-for="item, i in items" :key="i"
    class="data-item__value">
      {{ item }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  keyItem: {
    type: String
  },
  dataItem: {
    type: Object
  },
})

const name = computed(() => {
  return props.keyItem
})
const items = computed(() => {
  return props.dataItem
})
</script>