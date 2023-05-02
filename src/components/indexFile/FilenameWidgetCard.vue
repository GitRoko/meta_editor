<template>
  <v-card subtitle="Validation"  density="compact">
    <v-card-item class="my-0 py-0">
      <v-text-field
      class="mt-2 w-50"
        v-model="itemData.validation.regexp"
        label="regexp"
        variant="outlined"
        density="compact"
      ></v-text-field>
     <v-checkbox
     v-model="itemData.validation.unique"
      label="is unique"
      density="compact"
    ></v-checkbox>
    </v-card-item>
  </v-card>
  <!-- <pre>
         {{ modelValue }}
      </pre> -->
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  modelValue: {
    type: Object
  }
})
const itemData = computed(() => {
  return props.modelValue
})
</script>