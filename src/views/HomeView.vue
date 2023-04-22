<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col class="mt-2 fill-height d-flex align-center justify-center" cols="12">
        <DropZone />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import DropZone from '@/components/DropZone.vue'
</script>
