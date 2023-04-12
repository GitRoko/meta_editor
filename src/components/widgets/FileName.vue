<template>
  <v-text-field
    :modelValue="fileName"
    @update:modelValue="updateFileName($event)"
    variant="underlined"
    :label="keyItem"
    :error-messages="errorMessages"
  ></v-text-field>
</template>

<script>
import { rules } from '@/validation/rules'
import { ref, watch, computed } from 'vue'

export default {
  props: {
    renderData: {
      type: Object
    },
    keyItem: {
      type: String
    },
    intialFileName: {
      type: String,
      required: true
    },
    filesNamesList: {
      type: Array
    }
  },
  emits: ['update:fileName'],
  setup(props, { emit }) {
    const fileName = ref(props.intialFileName)

    const errorMessages = computed(() => {
      const errors = []
      validationRules.forEach((rule) => {
        if (rule(fileName.value) !== true) {
          errors.push(rule(fileName.value))
        }
      })
      return errors
    }) 

    watch(
      () => props.intialFileName,
      (newValue) => {
        fileName.value = newValue
      }
    )
    
    const updateFileName = (newValue) => {
      fileName.value = newValue

      if (errorMessages.value.length === 0 && newValue !== props.intialFileName) {
        emit('update:fileName', { oldName: props.intialFileName, newName: newValue })
      }
    }

    const validationRules = [
      (newValue) => rules.regexp(newValue, props.renderData.validation.regexp),
      (newValue) =>
        rules.unique(
          newValue,
          props.intialFileName,
          props.renderData.validation.unique,
          props.filesNamesList
        )
    ]

    return {
      fileName,
      validationRules,
      errorMessages,
      updateFileName,
    }
  }
}
</script>

<style scoped>
.v-text-field {
  /* font-size: 1.2em; */
  font-weight: bold;
  /* width: 300px; */
}
</style>
