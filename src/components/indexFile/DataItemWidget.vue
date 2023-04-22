<template>
  <v-card variant="outlined" class="ma-2 pa-2">
    <v-card-subtitle>Data item</v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn variant="plain" @click="$emit('removeItem')" size="x-small" density="compact"
        >remove</v-btn
      >
      <v-btn variant="plain" @click="$emit('addItemBefore')" size="x-small" density="compact"
        >add before</v-btn
      >
      <v-btn variant="plain" @click="$emit('addItemAfter')" size="x-small" density="compact"
        >add after</v-btn
      >
    </v-card-actions>
    <v-card-item>
      {{ modelValue.key }} : <pre>{{ modelValue.value  }}  </pre> 
    </v-card-item>
  </v-card>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Object
  }
})
defineEmits(['removeItem', 'update:modelValue', 'addItemBefore', 'addItemAfter'])
// const widgetType = ['text', 'enum', 'dict', 'list', 'checkbox', 'filename']
</script>
