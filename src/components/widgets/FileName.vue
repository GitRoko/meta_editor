<template>
  <div>
    <p>
      keyItem: {{ keyItem }}
    </p>
    <p>
      modelValue: {{ modelValue }}
    </p>
    <p>
      renderData:  {{ renderData }}
    </p>
    <!-- <v-text-field
      v-model="name"
      :label="keyItem"
      variant="underlined"
      :rules="validationRules"
    ></v-text-field> -->
  </div>
</template>

<script>
// import store
import { useCurrentFileStore } from "@/stores/currentFile";
import { storeToRefs } from "pinia";
import { rules } from "@/validation/rules";

export default {
  props: {
    renderData: {
      type: Object,
    },
    keyItem: {
      type: String,
    },
    modelValue: {
      type: String,
    },
  },
  setup: () => {
    const { name } = storeToRefs(useCurrentFileStore());
    const { getFilesListForCurrentFile } = storeToRefs(useCurrentFileStore());
    const validationRules = [
      (v) => rules.regexp(v, renderData.validation.regexp, keyItem),
      (v) =>
        rules.unique(
          v,
          renderData.validation.unique,
          getFilesListForCurrentFile
        ),
    ];
  
    return {
      validationRules,
      name,
      getFilesListForCurrentFile,
    };
  },
};
</script>

<style scoped>
.v-text-field :deep(input) {
  font-size: 1.2em;
  font-weight: bold;
}
</style>
