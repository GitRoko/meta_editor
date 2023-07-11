<template>
  <div>
    <v-select
      :modelValue="enumValue"
      @update:modelValue="($event) => updateEnumValue($event)"
      :items="itemsFromType"
      :label="keyItem"
      variant="underlined"
      :error-messages="errorMessages"
    ></v-select>
  </div>
  
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { rules } from '@/validation/rules'

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
  mappingData: {
    type: Object
  }
})

const emit = defineEmits(['update:modelValue'])

const itemsFromType = computed(() => {
  if (props.renderData.mapping !== undefined) {
    return props.renderData.mapping[props.mappingData.key][props.mappingData.value]
  } else {
    return props.renderData.values
  }
})

const enumValue = ref(props.modelValue)

watch(
  () => props.mappingData,
  () => {
    const isValidEnum = rules.isValidEnum(props.modelValue, itemsFromType.value)
    if (isValidEnum !== true) {
      emit('update:modelValue', itemsFromType.value[0])
    }
  },
  { deep: true }
)

watch(
  () => props.modelValue,
  (newValue) => {
    enumValue.value = newValue
  }
)

const updateEnumValue = (newValue) => {
  enumValue.value = newValue
  if (errorMessages.value.length === 0) {
    emit('update:modelValue', newValue)
  }
}

const errorMessages = computed(() => {
  const errors = []
  validationRules.forEach((rule) => {
    if (rule(enumValue.value) !== true) {
      errors.push(rule(enumValue.value))
    }
  })
  return errors
})

const validationRules = [(v) => rules.isValidEnum(v, itemsFromType.value)]

</script>

<style scoped>
</style>
