<template>
  <div>
    <v-divider></v-divider>
    <pre class="me-auto">{{ 'data:' }}</pre>

    <v-card-item v-for="(dataItem, i) in dataList" :key="i">
      <DataItemWidget
        :modelValue="dataItem"
        @update:modelValue="dataList[i] = $event"
        @removeItem="removeItem(i)"
        @addItemAfter="addItemAfter(i)"
        @addItemBefore="addItemBefore(i)"
      />

      <!-- <pre>
  dataItem: {{ dataItem }}
</pre
      > -->
    </v-card-item>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import DataItemWidget from '@/components/indexFile/DataItemWidget.vue'
const props = defineProps({
  modelValue: {
    type: Object
  }
})
const emit = defineEmits(['update:modelValue'])

const dataList = computed(() => {
  return transformDictToArray(props.modelValue)
})
const removeItem = (index) => {
  dataList.value.splice(index, 1)
  const newDataList = transformArrayToDict(dataList.value)
  console.log('newDataList', newDataList)
  emit('update:modelValue', newDataList)
}
const addItemBefore = (index) => {
  dataList.value.splice(index, 0, {
    key: 'testKey',
    value: {
      widget: 'text',
      validation: {
        regexp: '*',
        unique: false
      }
    }
  })
  const newDataList = transformArrayToDict(dataList.value)
  console.log('newDataList', newDataList)
  emit('update:modelValue', newDataList)
}

const addItemAfter = (index) => {
  dataList.value.splice(index + 1, 0, {
    key: 'testKey',
    value: {
      widget: 'text',
      validation: {
        regexp: '*',
        unique: false
      }
    }
  })
  const newDataList = transformArrayToDict(dataList.value)
  console.log('newDataList', newDataList)
  emit('update:modelValue', newDataList)
}

const transformDictToArray = (dict) => {
  const result = Object.keys(dict).map((key) => {
    return {
      key: key,
      value: dict[key]
    }
  })
  return result
}

const transformArrayToDict = (array) => {
  const killProxy = [...array]
  const result = {}
  killProxy.forEach((item) => {
    result[item.key] = { ...item.value }
  })
  return result
}
</script>
