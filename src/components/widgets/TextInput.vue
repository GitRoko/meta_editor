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
    <!-- <v-text-field
      :modelValue="modelValue"
      @update:modelValue="($event) => $emit('update:modelValue', $event)"
      :rules="validationRules"
      :label="keyItem"
      variant="underlined"
    ></v-text-field> -->
  </div>
</template>
<script>
import { inject } from "vue";
import { rules } from "@/validation/rules";

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
  },
  emits: ["update:modelValue"],
  setup: (props) => {
    const fieldsNamesList = inject("fieldsNamesList");
    const validationRules = [
      (v) => rules.regexp(v, props.renderData.validation.regexp, props.keyItem),
      (v) =>
        rules.unique(
          v,
          props.renderData.validation.unique,
          fieldsNamesList.value
        ),
      (v) => rules.requied(v),
    ];

    return {
      rules,
      fieldsNamesList,
      validationRules,
    };
  },
};
</script>
