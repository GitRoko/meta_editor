<template>
  <v-chip variant="plain" size="smal">{{ modelValue }}</v-chip>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String
  }
})
</script>
