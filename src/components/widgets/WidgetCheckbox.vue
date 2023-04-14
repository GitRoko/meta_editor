<template>
  <div>
    <v-checkbox
      :modelValue="modelValue"
      @update:modelValue="($event) => $emit('update:modelValue', $event)"
      :label="keyItem"
    ></v-checkbox>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean
  },
  keyItem: {
    type: String
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped></style>
