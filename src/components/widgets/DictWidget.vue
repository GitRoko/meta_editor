<template>
  <v-card-item class="px-2 pt-2 ma-0">
    <template v-slot:prepend>
      <component
        :is="widgetMap[renderData.key.widget]"
        :renderData="renderData.key"
        :keyItem="'key'"
        :modelValue="dictType === 'generator' ? dictType : dict.name"
        @update:modelValue="($event) => changeDictItems({ itemsKey: 'name', newValue: $event })"
        :fieldsKeys="fieldsKeys"
        class="field-width"
      ></component>
    </template>
    <template v-if="dictType !== 'generator'" v-slot:append>
      <FieldMenu
        @addFieldBefore="$emit('addFieldBefore')"
        @addFieldAfter="$emit('addFieldAfter')"
        @deleteField="$emit('deleteField')"
      />
      <v-btn
        class="mx-2 pa-0"
        size="x-small"
        :icon="show ? '$chevUp' : '$chevDown'"
        @click="show = !show"
      ></v-btn>
    </template>
  </v-card-item>

  <v-container>
    <v-row dense>
      <template v-for="(value, key, i) in dict" :key="i">
        <v-col v-if="renderDataItem[key] !== undefined && dict[key] !== undefined" cols="4">
          <component
            v-if="key !== 'generator'"
            :is="widgetMap[renderDataItem[key].widget]"
            :renderData="renderDataItem[key]"
            :keyItem="key"
            :fieldType="dict.js_type"
            :modelValue="dict[key]"
            :mappingData="getMappingType(key)"
            @update:modelValue="($event) => changeDictItems({ itemsKey: key, newValue: $event })"
            ></component>
        </v-col>
        <v-col cols="12" v-if="key === 'generator'">
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              
              <component
                :is="widgetMap[renderDataItem[key].widget]"
                :renderData="renderDataItem[key]"
                :modelValue="dict.generator"
                @update:modelValue="changeDictItems({ itemsKey: key, newValue: $event })"
                @changeDictItems="changeDictItems"
              ></component>
             
            </div>
          </v-expand-transition>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script setup>
import DictWidget from '@/components/widgets/DictWidget.vue'
import { computed, ref } from 'vue'
import TextInput from '@/components/widgets/TextInput.vue'
import EnumSelect from '@/components/widgets/EnumSelect.vue'
import WidgetCheckbox from '@/components/widgets/WidgetCheckbox.vue'
import HardcodeWidget from '@/components/widgets/HardcodeWidget.vue'
import FieldMenu from '@/components/FieldMenu.vue'
import { getDefaultGenerator } from '@/plugins/utils.js'

const props = defineProps({
  renderData: {
    type: Object
  },
  modelValue: {
    type: Object
  },
  fieldsKeys: {
    type: Array,
    default: () => []
  },

})

const emit = defineEmits([
  'addFieldBefore',
  'addFieldAfter',
  'deleteField',
  'changeDictItems',
  // 'changeDictGenerator',
  'update:modelValue'
])

const widgetMap = {
  dict: DictWidget,
  text: TextInput,
  enum: EnumSelect,
  checkbox: WidgetCheckbox,
  hardcode: HardcodeWidget
}

const show = ref(false)
// repeat reactive logic like parent !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const dict = computed(() => props.modelValue)
const dictType = computed(() => props.renderData.name)
const renderDataItem = computed(() => {
  const newItem = {}
  props.renderData.items.forEach((item) => {
    newItem[item.name] = item
  })
  return newItem
})
// watch(() => props.modelValue,
// (newVal) => {
//   dict.value = {...newVal}
// })

// const dictGenerator = computed(() => {
//   if (dict.value.items.generator) {
//     return {
//       key: 'generator',
//       items: { ...props.modelValue.items.generator }
//     }
//   }
//   return null
// })

// const changeDictKey = (newKey) => {
//   dict.value.name = newKey
// }

const changeDictItems = (updateData) => {
  const { itemsKey, newValue } = updateData
  console.log('changeDictItems', itemsKey, newValue);
  if (dictType.value === 'generator') {
    // generator change
    if (itemsKey === 'type') {
      const newData = { itemsKey: 'generator', newValue: getDefaultGenerator(newValue) }
      // to parent
      emit('changeDictItems', newData)
    } else {
      // local
      dict.value[itemsKey] = newValue
      const newData = { itemsKey: 'generator', newValue: dict.value }
      // to parent
      emit('changeDictItems', newData)
    }
  }
  if(dictType.value === 'field') {
    // field change
    dict.value[itemsKey] = newValue
  }
}

const getMappingType = (key) => {
  if (renderDataItem.value[key].mapping) {
    const mappingKey = Object.keys(renderDataItem.value[key].mapping)[0]
    const mappingValue = dict.value[mappingKey]

    return { key: mappingKey, value: mappingValue }
  }
  return null
}

</script>

<style scoped>
.field-width {
  width: 200px;
}
</style>
