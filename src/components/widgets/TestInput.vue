<template>
  <div>
    <!-- <p>
      keyItem:  {{ keyItem }}
    </p> -->
    <!-- <p>
      modelValue: {{ modelValue }}
    </p>
    <p>
      renderData:   {{ renderData }}
    </p> -->
    <v-text-field
      :modelValue="modelValue"
      @update:modelValue="($event) => $emit('update:modelValue', $event)"
      variant="underlined"
    ></v-text-field>
  </div>
</template>
<script>

export default {
  props: {
    renderData: {
      type: Object,
    },
    modelValue: {
      type: String,
    },

  },
  // emits: ["update:modelValue"],
  setup: () => {
   

    return {
    };
  },
};
</script>
