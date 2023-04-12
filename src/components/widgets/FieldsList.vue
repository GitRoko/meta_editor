<template>
  <div>
    <!-- <pre>{{ modelValue }}</pre> -->
    <!-- <pre>{{ renderData }}</pre> -->
    <br />
    <div>
      <template v-for="(item, i) in fieldsList" :key="i">
        <v-card class="my-2 pa-2">
          <!-- <pre>
          {{ item }}
        </pre> -->
          <component
            :is="widgetMap[renderData.items[0].field.widget]"
            :renderData="renderData.items[0].field"
            :fieldsKeys="fieldsKeys"
            :fieldKey="item.fieldName"
            :fieldItems="item.fieldItems"
            :typeDict="'field'"
            :index="i"
            @onChangeFieldItems="onChangeFieldItems($event)"
            @onChangeFieldName="onChangeFieldKey($event)"
            @addFieldBefore="addFieldBefore(i)"
            @addFieldAfter="addFieldAfter(i)"
            @deleteField="deleteField(i)"
          ></component>
        </v-card>
      </template>
    </div>
  </div>
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
    return item.fieldName
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
  // fieldsList.value = props.modelValue
  fieldsList.value = [...props.modelValue]
})

const deleteField = (index) => {
  // write validation for last field
  fieldsList.value.splice(index, 1)

  console.log('deleteField', index)
  emits('update:modelValue', fieldsList.value)
}

const addFieldBefore = (index) => {
  fieldsList.value.splice(index, 0, getDefaultField())

  console.log('addFieldBefore', index)
  emits('update:modelValue', fieldsList.value)
}

const addFieldAfter = (index) => {
  fieldsList.value.splice(index + 1, 0, getDefaultField())

  console.log('addFieldAfter', index)
  emits('update:modelValue', fieldsList.value)
}

const onChangeFieldKey = (updateData) => {
  const { index, newKey } = updateData

  fieldsList.value[index].fieldName = newKey

  console.log('onChangeFieldKey', updateData)
  emits('update:modelValue', fieldsList.value)
}

const onChangeFieldItems = (update) => {
  console.log('onChangeFieldItems', update)
  const { index, fieldItemsKey, newValue } = update
  fieldsList.value[index].fieldItems[fieldItemsKey] = newValue

  emits('update:modelValue', fieldsList.value)
}
</script>
