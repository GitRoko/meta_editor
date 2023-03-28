<template>
  <p>
    keyItem: {{ keyItem }}
  </p>
  <p>
    modelValue: {{ modelValue }}
  </p>

    <!-- <v-checkbox
      :modelValue="modelValue"
      @update:modelValue="($event) => $emit('update:modelValue', $event)"
      :label="keyItem"
    ></v-checkbox> -->
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
    },
    keyItem: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style scoped>

</style>
