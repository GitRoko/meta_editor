<template>
  <div>
    <!-- <v-divider></v-divider> -->
    <v-card-subtitle class="ml-5">Structure of module</v-card-subtitle>
    <v-card-item v-for="(dataItem, i) in dataList" :key="i" class="ma-0 pa-0">
  
      <DataItemWidget
        :modelValue="dataItem"
        :fieldsNamesList="fieldsNamesList"
        @update:modelValue="dataList[i] = $event"
        @removeItem="removeItem(i)"
        @addItemAfter="addItemAfter(i)"
        @addItemBefore="addItemBefore(i)"
        @changeItemType="changeItemType($event, i)"
      />
    </v-card-item>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { newWidgetType } from '@/plugins/utils.js'
import DataItemWidget from '@/components/indexFile/DataItemWidget.vue'
const props = defineProps({
  modelValue: {
    type: Object
  }
})
defineEmits(['update:modelValue'])
const dataList = computed(() => {
  return props.modelValue
  // return transformDictToArray(props.modelValue)
})
const fieldsNamesList = computed(() => {
  return dataList.value.map((item) => item.name) || []
})
// const newWidgetType = (type) => {
//   switch (type) {
//     case 'text':
//       return {
//         name: 'text_field',
//         widget: 'text',
//         validation: {
//           regexp: '.*',
//           unique: false
//         }
//       }
//     case 'enum':
//       return {
//         name: 'enum_field',
//         widget: 'enum',
//         values: ['string', 'number', 'object', 'array', 'boolean']
//       }
//     case 'dict':
//       return {
//         name: 'dict_field',
//         widget: 'dict',
//         key: {
//           widget: 'text',
//           validation: {
//             regexp: '^[a-zA-Z0-9_]+$',
//             unique: true
//           }
//         },
//         items: [
//           {
//             name: 'text_field',
//             widget: 'text',
//             validation: {
//               regexp: '.*',
//               unique: false
//             }
//           }
//         ]
//       }
//     case 'list':
//       return {
//         name: 'list_field',
//         widget: 'list',
//         items: [
//           {
//             name: 'text_field',
//             widget: 'text',
//             validation: {
//               regexp: '.*',
//               unique: false
//             }
//           }
//         ]
//       }
//     case 'checkbox':
//       return {
//         name: 'checkbox_field',
//         widget: 'checkbox'
//       }
//     case 'filename':
//       return {
//         name: 'filename_field',
//         widget: 'filename',
//         validation: {
//           regexp: '^[a-zA-Z0-9_]+\\.yaml$',
//           unique: true
//         }
//       }
//   }
// }
const changeItemType = (type, index) => {
  console.log('changeItemType', type, index)
  dataList.value.splice(index, 1, newWidgetType(type))
}
const removeItem = (index) => {
  dataList.value.splice(index, 1)
  // const newDataList = transformArrayToDict(dataList.value)
  // console.log('newDataList', newDataList)
  // emit('update:modelValue', newDataList)
}
const addItemBefore = (index) => {
  dataList.value.splice(index, 0, newWidgetType( 'text'))
  // const newDataList = transformArrayToDict(dataList.value)
  // console.log('newDataList', newDataList)
  // emit('update:modelValue', newDataList)
}

const addItemAfter = (index) => {
  dataList.value.splice(index + 1, 0, newWidgetType( 'text'))

  // const newDataList = transformArrayToDict(dataList.value)
  // console.log('newDataList', newDataList)
  // emit('update:modelValue', newDataList)
}

</script>
