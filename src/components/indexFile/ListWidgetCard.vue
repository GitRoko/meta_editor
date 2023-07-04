<template>
  <v-card density="compact" class="ma-0 pa-0">
    <v-card-subtitle class="ma-0 pa-0">Items</v-card-subtitle>
    <v-card-item v-for="(dataItem, i) in itemData.items" :key="i" class="ma-0 pa-0">
      <!-- <DataItemWidget
    :modelValue="dataItem"
      @update:modelValue="itemData.items[i] = $event"
      @removeItem="removeItem(i)"
      @addItemAfter="addItemAfter(i)"
      @addItemBefore="addItemBefore(i)"
      @changeItemType="changeItemType($event, i)"
    /> -->
      <DataItemWidget
        :modelValue="dataItem"
        :fieldsNamesList="fieldsNamesList"
        :posibleFieldsForMapping="posibleFieldsForMapping"
        @update:modelValue="itemData.items[i] = $event"
        @removeItem="removeItem(i)"
        @addItemAfter="addItemAfter(i)"
        @addItemBefore="addItemBefore(i)"
        @changeItemType="changeItemType($event, i)"
      />
    </v-card-item>
  </v-card>
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
const itemData = computed(() => {
  return props.modelValue
})

const fieldsNamesList = computed(() => {
  return itemData.value.items.map((item) => item.name) || []
})

const posibleFieldsForMapping = computed(() => {
  return itemData.value.items.filter((item) => {
    if (item.widget === 'enum' && item.values !== undefined) {
      return item
    }
  })
})

const removeItem = (index) => {
  itemData.value.items.splice(index, 1)
  // const newDataList = transformArrayToDict(itemData.value.items)
  // console.log('newDataList', newDataList)
  // emit('update:modelValue', newDataList)
}
const addItemBefore = (index) => {
  itemData.value.items.splice(index, 0, newWidgetType('text'))
  // const newDataList = transformArrayToDict(itemData.value.items)
  // console.log('newDataList', newDataList)
  // emit('update:modelValue', newDataList)
}

const addItemAfter = (index) => {
  itemData.value.items.splice(index + 1, 0, newWidgetType('text'))
}
const changeItemType = (type, index) => {
  console.log('changeItemType', type, index)
  itemData.value.items.splice(index, 1, newWidgetType(type))
}

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
</script>
