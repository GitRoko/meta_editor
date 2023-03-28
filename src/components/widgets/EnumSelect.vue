<template>
  <div>
    <p>
      keyItem:  {{ keyItem }}
    </p>
    <p>
      modelValue:  {{ modelValue }}
    </p>
    <p>
      renderData: {{ renderData }}
    </p>
    <p>
      fieldType: {{ fieldType }}
    </p>
    <!-- <v-select
      :modelValue="modelValue"
      @update:modelValue="($event) => $emit('update:modelValue', $event)"
      :items="itemsFromType"
      :label="keyItem"
      :rules="validationRules"
      variant="underlined"
    ></v-select> -->
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
    watch(() => props.fieldType, () => {
        // console.log(modelValue);
        const isValidEnum = rules.isValidEnum(props.modelValue, itemsFromType.value);
        if (isValidEnum !== true) {
          emit('update:modelValue', itemsFromType.value[0])
        }
    });
    const itemsFromType = computed(() => {
      if (props.renderData.mapping === undefined) {
        return props.renderData.values;
      } else {
        return props.renderData.mapping.json_type[props.fieldType];
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
