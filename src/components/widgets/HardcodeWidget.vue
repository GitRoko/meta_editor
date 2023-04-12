<template>
<!-- <pre>{{ props.modelValue }}</pre> -->
<v-chip variant="plain" size="smal" >{{ props.modelValue }}</v-chip>
</template>

<script setup>
const props = defineProps({
  
  modelValue: {
    type: String
  },
  
})
</script>