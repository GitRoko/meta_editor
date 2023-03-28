<template>
  <v-card width="100%" class="ma-2">
    <v-card-item v-for="(value, key) in renderData">
      <p>
        id: {{ id }}
      </p>
      <p>
        modelValue: {{ modelValue }}
      </p>
      <p>
        renderData: {{ renderData }}
      </p>
      <!-- <component
        :is="aliasComponentName[renderData[key].widget]"
        :renderData="value"
        v-model="modelValue[key]"
        @update:modelValue="($event) => $emit('update:modelValue', $event)"
        :keyItem="key"
        :list="list || []"
        :fieldType="modelValue.json_type"
      ></component> -->
    </v-card-item>
  </v-card>
</template>

<script>
// import FieldName from "@/components/FieldName.vue";
// import JsonType from "@/components/JsonType.vue";
import TextInput from "@/components/widgets/TextInput.vue";
import EnumSelect from "@/components/widgets/EnumSelect.vue";
import WidgetCheckbox from "@/components/widgets/WidgetCheckbox.vue";

export default {
  props: {
    renderData: {
      type: Object,
    },
    id: {
      type: String,
    },
    componentData: {
      type: Object,
    },
    modelValue: {
      type: Object,
    },
  },
  components: { TextInput, EnumSelect, WidgetCheckbox },
  emits: ["update:modelValue"],
  setup: () => {
    // let store = useCurrentFileStore();
    const aliasComponentName = {
      text: "TextInput",
      enum: "EnumSelect",
      checkbox: "WidgetCheckbox",
    };
    const list = [];
    return {
      aliasComponentName,
      list,
    };
  },
};
</script>

<style scoped></style>
