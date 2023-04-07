<template>
  <div>
    <v-select
      :modelValue="modelValue"
      @update:modelValue="($event) => $emit('update:modelValue', $event)"
      :items="itemsFromType"
      :label="keyItem"
      :rules="validationRules"
      variant="underlined"
    ></v-select>
  </div>
</template>
<script>
import { computed, watch } from "vue";
import { rules } from "@/validation/rules";
// ToDo: заставить обновляться modelValue при изменении itemsFromType или заставить срабатывать валидацию

export default {
  props: {
    renderData: {
      type: Object,
    },
    modelValue: {
      type: String,
    },
    keyItem: {
      type: String,
    },
    fieldType: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
  setup: (props, { emit }) => {

    const itemsFromType = computed(() => {
      if (props.renderData.mapping !== undefined) {
        return props.renderData.mapping.js_type[props.fieldType];
      } else {
        return props.renderData.values;

      }
    });

    watch(() => props.fieldType, () => {
        // console.log(modelValue);
        const isValidEnum = rules.isValidEnum(props.modelValue, itemsFromType.value);
        if (isValidEnum !== true) {
          emit('update:modelValue', itemsFromType.value[0])
        }
    });
    
    const validationRules = [(v) => rules.requied(v), (v) => rules.isValidEnum(v, itemsFromType.value)];

    return {
      itemsFromType,
      validationRules,
    };
  },
};
</script>

<style scoped>
.v-text-field :deep(input) {
  /* font-size: 1em; */
  font-weight: bold;
  /* text-transform: uppercase; */
}
</style>
