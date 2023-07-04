<template>
  <div>

    <v-card density="compact" class="ma-0 pa-0">
      <v-card-subtitle class="ma-0 pa-0">Key</v-card-subtitle>
      <v-card-item class="ma-0 pa-0">
       
        <DataItemWidget
          :modelValue="itemData.key"
          :widgetTypeForKey="['text', 'hardcode']"
          @changeItemType="itemData.key = newWidgetType($event)"
          />
      </v-card-item>
    </v-card>
    <v-card density="compact" class="ma-0 pa-0">
      <v-card-subtitle class="ma-0 pa-0">Items</v-card-subtitle>
      <v-card-item v-for="(dataItem, i) in itemData.items" :key="i" class="ma-0 pa-0">
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
// const updateKey = (newKey) => {
//   console.log('updateKey', newKey)
//   // itemData.value.key = newKey
// }
</script>
