<template>

  <v-card-item class="px-2 py-0 ma-0">
    <template v-slot:prepend>
      <component
        :is="widgetMap[renderData.key.widget]"
        :renderData="renderData.key"
        :keyItem="'key'"
        :modelValue="dict.key"
        @update:modelValue="($event) => changeDictKey($event)"
        :fieldsKeys="fieldsKeys"
        class="field-width"
      ></component>
    </template>
    <template v-if="dict.key !== 'generator'" v-slot:append>
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
      <template v-for="(value, key, i) in dict.items" :key="i">
        <v-col v-if="renderData.items[key] !== undefined && dict.items[key] !== undefined" cols="4">
          <component
            v-if="key !== 'generator'"
            :is="widgetMap[renderData.items[key].widget]"
            :renderData="renderData.items[key]"
            :keyItem="key"
            :fieldType="dict.items.js_type"
            :modelValue="value"
            :mappingData="getMappingType(key)"
            @update:modelValue="($event) => changeDictItems({ itemsKey: key, newValue: $event })"
          ></component>
        </v-col>
        <!--  if key === 'generator' then show generator(recursive DictWidget) -->
        <v-col cols="12" v-if="key === 'generator'">
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <component
                :is="widgetMap[renderData.items[key].widget]"
                :renderData="renderData.items[key]"
                :modelValue="dictGenerator"
                @update:modelValue="changeDictItems({ itemsKey: key, newValue: $event })"
                @changeDictItems="changeDictItems"
              ></component>
              <!-- @changeDictItems="($event) => changeDictItems($event)" -->
        <!--  @update:modelValue= for local change emit -->
        <!--  @changeDictItems= emit from recursive to parent  -->
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
  }
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

const dict = computed(() => props.modelValue)

const dictGenerator = computed(() => {
  if (dict.value.items.generator) {
    return {
      key: 'generator',
      items: { ...props.modelValue.items.generator }
    }
  }
  return null
})

const changeDictKey = (newKey) => {
  dict.value.key = newKey
}

const changeDictItems = (updateData) => {
  const { itemsKey, newValue } = updateData
  if (dict.value.key === 'generator') {
    // generator change
    if (itemsKey === 'type') {
      const newData = { itemsKey: 'generator', newValue: getDefaultGenerator(newValue) }
      // to parent
      emit('changeDictItems', newData)
    } else {
      // local
      dict.value.items[itemsKey] = newValue
      const newData = { itemsKey: 'generator', newValue: dict.value.items }
      // to parent
      emit('changeDictItems', newData)
    }
  } else {
    // local
    dict.value.items[itemsKey] = newValue
  }
}

const getMappingType = (key) => {
  if (props.renderData.items[key].mapping) {
    const mappingKey = Object.keys(props.renderData.items[key].mapping)[0]
    const mappingValue = dict.value.items[mappingKey]

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
