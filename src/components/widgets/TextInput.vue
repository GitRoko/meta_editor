<template>
  <div>
    <!-- <p>
      keyItem:  {{ keyItem }}
    </p> -->
    <!-- <p>
      modelValue: {{ modelValue }}
    </p>
    <p>
      renderData:   {{ renderData }}
    </p> -->
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

<script>
import { rules } from '@/validation/rules'
import { ref, computed, watch } from 'vue'

export default {
  props: {
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
  },
  emits: ['update:modelValue'],

  setup: (props, { emit }) => {
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

    const isValid = computed(() => {
      return validationRules.every((rule) => {
        console.log(text.value, rule(text.value))
        return rule(text.value) === true
      })
    })

    const validationRules = [
      (v) => rules.regexp(v, props.renderData.validation.regexp),
      (v) => rules.requied(v),
      (v) => rules.unique(v, props.modelValue, props.renderData.validation.unique, props.fieldsKeys)
    ]

    const updateText = (newValue) => {
      text.value = newValue
      if (isValid.value) {
        emit('update:modelValue', newValue)
      }
    }

    return {
      rules,
      isValid,
      text,
      updateText,
      validationRules,
      errorMessages
    }
  }
}
</script>
<style scoped></style>
