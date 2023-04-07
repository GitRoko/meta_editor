// write template with dots menu
<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn size="x-small" icon="$verticalDots" v-bind="props"></v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-btn @click="$emit('addFieldBefore')" variant="text"> add Before </v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn @click="$emit('addFieldAfter')" variant="text"> add After </v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn @click="$emit('deleteField')" variant="text"> delete </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>

</script>
