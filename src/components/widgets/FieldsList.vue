<template>
  <v-card v-for="(item, i) in fieldsList" :key="i" class="my-2 pa-2">
    <component
      :is="widgetMap[renderData.items[0].field.widget]"
      :renderData="renderData.items[0].field"
      :fieldsKeys="fieldsKeys"
      :modelValue="item"
      @addFieldBefore="addFieldBefore(i)"
      @addFieldAfter="addFieldAfter(i)"
      @deleteField="deleteField(i)"
    ></component>
  </v-card>
</template>

<script setup>
import { watch, onBeforeMount, computed, ref, onUpdated } from 'vue'
import { getDefaultField } from '@/plugins/utils.js'
import DictWidget from '@/components/widgets/DictWidget.vue'

const props = defineProps({
  renderData: {
    type: Object
  },
  modelValue: {
    type: Array
  },
  keyItem: {
    type: String
  }
})

const emits = defineEmits([
  'addFieldBefore',
  'addFieldAfter',
  'deleteField',
  'onChangeFieldKey',
  'onChangeFieldItems',
  'update:modelValue'
])

onUpdated(() => {
  console.log('onUpdated fieldsList', fieldsList.value)
})

const widgetMap = {
  dict: DictWidget
}

const fieldsKeys = computed(() => {
  return fieldsList.value.map((item) => {
    return item.key
  })
})

const fieldsList = ref([])

watch(
  () => props.modelValue,
  (newVal) => {
    fieldsList.value = [...newVal]
  }
)

onBeforeMount(() => {
  fieldsList.value = [...props.modelValue]
})

const deleteField = (index) => {
  fieldsList.value.splice(index, 1)
  emits('update:modelValue', fieldsList.value)
}

const addFieldBefore = (index) => {
  fieldsList.value.splice(index, 0, getDefaultField())
  emits('update:modelValue', fieldsList.value)
}

const addFieldAfter = (index) => {
  fieldsList.value.splice(index + 1, 0, getDefaultField())
  emits('update:modelValue', fieldsList.value)
}
</script>
