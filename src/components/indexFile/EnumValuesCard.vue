<template>
  <div v-for="(item, i) in localValues" :key="i">
    <div class="d-flex w-50">
      <v-text-field v-model="localValues[i]" density="compact" variant="outlined"></v-text-field>
      <div>
        <v-btn
          variant="plain"
          @click="localValues.splice(i, 1)"
          size="x-small"
          density="compact"
          class="pt-1"
          :disabled="localValues.length === 1"
          >remove</v-btn
        >
      </div>
    </div>
  </div>
  <v-btn
    variant="plain"
    @click="localValues.splice(localValues.length, 0, '')"
    size="x-small"
    density="compact"
    class="pa-2 ma-2 w-100"
    >add value</v-btn
  >
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const localValues = ref(props.modelValue)
</script>
