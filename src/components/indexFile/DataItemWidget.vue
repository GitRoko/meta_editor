<template>
  <v-card variant="outlined" class="ma-2 mr-0 pa-2">
    <v-card-actions class="ma-0 pa-0">
      <v-card-subtitle>Widget setup</v-card-subtitle>

      <v-spacer></v-spacer>
      <div v-if="fieldsNamesList.length !== 0">
        <v-btn
          variant="plain"
          @click="$emit('removeItem')"
          size="x-small"
          density="compact"
          class="pb-7"
          :disabled="fieldsNamesList.length === 1"
          >remove</v-btn
        >
        <v-btn
          variant="plain"
          @click="$emit('addItemBefore')"
          size="x-small"
          density="compact"
          class="pb-7"
          >add before</v-btn
        >
        <v-btn
          variant="plain"
          @click="$emit('addItemAfter')"
          size="x-small"
          density="compact"
          class="pb-7"
          >add after</v-btn
        >
      </div>
    </v-card-actions>
    <v-card-item class="my-0 ml-0 pl-2 py-0">
      <v-container class="ma-0 pa-0">
        <v-row class="ma-0 pa-0">
          <v-col cols="3" class="ma-0 pa-0">
            <v-select
              :modelValue="dataItem.widget"
              @update:modelValue="$emit('changeItemType', $event)"
              :items="widgetType"
              label="Widget"
              density="compact"
              dense
              class="ma-2"
              variant="outlined"
            ></v-select>
          </v-col>
          <v-col cols="5" class="ma-0 pa-0">
            <v-text-field
              v-if="dataItem.name"
              :modelValue="fieldName"
              @update:modelValue="updateFieldName($event)"
              label="Name"
              density="compact"
              variant="outlined"
              class="ma-2"
              :error-messages="errorMessages"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-item>
    <v-card-item class="my-0 ml-0 pl-2 py-0">
      
      <component
        :is="widgetMap[dataItem.widget]"
        :modelValue="dataItem"
        :posibleFieldsForMapping="posibleFieldsForMapping"
      >
      </component>
  </v-card-item>
  </v-card>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { rules } from '@/validation/rules'
import TextWidgetCard from '@/components/indexFile/TextWidgetCard.vue'
import EnumWidgetCard from '@/components/indexFile/EnumWidgetCard.vue'
import DictWidgetCard from '@/components/indexFile/DictWidgetCard.vue'
import ListWidgetCard from '@/components/indexFile/ListWidgetCard.vue'
import CheckboxWidgetCard from '@/components/indexFile/CheckboxWidgetCard.vue'
import FilenameWidgetCard from '@/components/indexFile/FilenameWidgetCard.vue'
import HardcodeWidgetCard from '@/components/indexFile/HardcodeWidgetCard.vue'

const props = defineProps({
  modelValue: {
    type: Object
  },
  fieldsNamesList: {
    type: Array,
    default: () => []
  },
  widgetTypeForKey: {
    type: Array,
    default: () => []
  },
  posibleFieldsForMapping: {
    type: Array,
    default: () => []
  }
})
defineEmits(['removeItem', 'update:modelValue', 'addItemBefore', 'addItemAfter', 'changeItemType'])

const widgetTypeForItems = ['text', 'enum', 'dict', 'list', 'checkbox', 'filename', 'hardcode']

const widgetType = computed(() => {
  return props.widgetTypeForKey.length > 0 ? props.widgetTypeForKey : widgetTypeForItems
})

const widgetMap = {
  text: TextWidgetCard,
  enum: EnumWidgetCard,
  dict: DictWidgetCard,
  list: ListWidgetCard,
  checkbox: CheckboxWidgetCard,
  filename: FilenameWidgetCard,
  hardcode: HardcodeWidgetCard
}

const dataItem = computed(() => {
  return props.modelValue
})

const fieldName = ref(dataItem.value.name || '')

watch(
  () => props.modelValue.name,
  (newValue) => {
    fieldName.value = newValue
  }
)

const validation = {
  regexp: '^[a-zA-Z0-9_]+$',
  unique: true
}

const validationRules = [
  (newValue) => rules.regexp(newValue, validation.regexp),
  (newValue) =>
    rules.unique(newValue, props.modelValue.name, validation.unique, props.fieldsNamesList)
]

const errorMessages = computed(() => {
  const errors = []
  validationRules.forEach((rule) => {
    if (rule(fieldName.value) !== true) {
      errors.push(rule(fieldName.value))
    }
  })
  return errors
})

const updateFieldName = (newValue) => {
  fieldName.value = newValue

  if (errorMessages.value.length === 0 && newValue !== props.modelValue.name) {
    dataItem.value.name = newValue
  }
}
</script>
