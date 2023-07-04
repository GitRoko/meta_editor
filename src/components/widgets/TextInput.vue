<template>
  <div>
    <v-text-field
      class="mt-2"
      :modelValue="text"
      @update:modelValue="($event) => updateText($event)"
      :label="keyItem"
      variant="underlined"
      density="compact"
      :error-messages="errorMessages"
    ></v-text-field>
  </div>
</template>

<script setup>
import { rules } from '@/validation/rules'
import { ref, computed, watch } from 'vue'
const props = defineProps({
  renderData: {
    type: Object
  },
  modelValue: {
    type: String
  },
  keyItem: {
    type: String
  },
  fieldsKeys: {
    type: Array
  }
})

const emit = defineEmits(['update:modelValue'])

const text = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    text.value = newValue
  }
)

const errorMessages = computed(() => {
  const errors = []
  validationRules.forEach((rule) => {
    if (rule(text.value) !== true) {
      errors.push(rule(text.value))
    }
  })
  return errors
})

const validationRules = [
  (v) => rules.regexp(v, props.renderData.validation.regexp),
  (v) => rules.requied(v),
  (v) => rules.unique(v, props.modelValue, props.renderData.validation.unique, props.fieldsKeys)
]

const updateText = (newValue) => {
  text.value = newValue
  if (errorMessages.value.length === 0) {
    emit('update:modelValue', newValue)
  }
}

</script>
<style scoped></style>
