<template>
  <v-card v-for="(item, i) in fieldsList" :key="i" class="my-2 pa-2">
    <component
      :is="widgetMap[renderData.items[0].widget]"
      :renderData="renderData.items[0]"
      :fieldsKeys="fieldsKeys"
      :modelValue="item"
      @addFieldBefore="addFieldBefore(i)"
      @addFieldAfter="addFieldAfter(i)"
      @deleteField="deleteField(i)"
    ></component>
  </v-card>
</template>

<script setup>
import { watch, onBeforeMount, computed, ref } from 'vue'
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

const emit = defineEmits([
  'addFieldBefore',
  'addFieldAfter',
  'deleteField',
  'onChangeFieldKey',
  'onChangeFieldItems',
  'update:modelValue'
])



const widgetMap = {
  dict: DictWidget
}

const fieldsKeys = computed(() => {
  return fieldsList.value.map((item) => {
    return item.name
  })
})

const fieldsList = ref([])

onBeforeMount(() => {
  fieldsList.value = [...props.modelValue]
})

watch(
  () => props.modelValue,
  (newVal) => {
    fieldsList.value = [...newVal]
  }
)

const deleteField = (index) => {
  fieldsList.value.splice(index, 1)
  emit('update:modelValue', fieldsList.value)
}

const addFieldBefore = (index) => {
  fieldsList.value.splice(index, 0, getDefaultField())
  emit('update:modelValue', fieldsList.value)
}

const addFieldAfter = (index) => {
  fieldsList.value.splice(index + 1, 0, getDefaultField())
  emit('update:modelValue', fieldsList.value)
}
</script>
