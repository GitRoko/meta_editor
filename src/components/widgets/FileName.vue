<template>
  <v-text-field
    v-model="fileName"
    :rules="validationRules"
    variant="underlined"
    :label="keyItem"
    width="300px"
  ></v-text-field>
</template>

<script>
import { rules } from '@/validation/rules'
import { ref, watch } from 'vue'

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

    watch(fileName, (newValue) => {
      if (
        validationRules.every((rule) => rule(newValue) === true) &&
        newValue !== props.intialFileName
      ) {
        emit('update:fileName', { oldName: props.intialFileName, newName: newValue })
      }
    })

    watch(
      () => props.intialFileName,
      (newValue) => {
        fileName.value = newValue
      }
    )

    const validationRules = [
      (newValue) => rules.regexp(newValue, props.renderData.validation.regexp, props.keyItem),
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
      validationRules
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
