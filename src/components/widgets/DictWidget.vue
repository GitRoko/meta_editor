<template>
  <v-container class="pa-1">
    <v-row v-if="typeDict === 'field'">
      <v-col class="pa-0">
        <v-card-item class="px-2 py-0 ma-0">
          <!-- <pre>
                    {{ renderData.items.generator }}
                  </pre> -->
          <template v-slot:prepend>
            <!-- <pre>{{ renderData.key.widget }}</pre> -->
            <component
              :is="widgetMap[renderData.key.widget]"
              :renderData="renderData.key"
              :keyItem="'key'"
              :modelValue="fieldName"
              @update:modelValue="
                ($event) =>
                  $emit('onChangeFieldName', {
                    newKey: $event,
                    index: index
                  })
              "
              :fieldsKeys="fieldsKeys"
              class="field-width"
            ></component>
          </template>
          <div class="d-flex pt-2 ml-2">
            <component
              v-if="renderData.items.js_type !== undefined"
              :is="widgetMap[renderData.items.js_type.widget]"
              :renderData="renderData.items.js_type"
              :keyItem="'js_type'"
              :fieldType="fieldItemsComputed.js_type"
              :modelValue="fieldItemsComputed.js_type"
              @update:modelValue="
                ($event) =>
                  $emit('onChangeFieldItems', {
                    fieldItemsKey: 'js_type',
                    newValue: $event,
                    index: index
                  })
              "
              class="field-width"
            ></component>

            <component
              v-if="renderData.items['optional'] !== undefined"
              :is="widgetMap[renderData.items['optional'].widget]"
              :renderData="renderData.items['optional']"
              :keyItem="'optional'"
              :fieldType="fieldItemsComputed.js_type"
              :modelValue="fieldItemsComputed['optional']"
              @update:modelValue="
                ($event) =>
                  $emit('onChangeFieldItems', {
                    fieldItemsKey: 'optional',
                    newValue: $event,
                    index: index
                  })
              "
              class="field-width"
            ></component>
          </div>

          <template v-slot:append>
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
      </v-col>
    </v-row>

    <v-row v-if="typeDict === 'field'">
      <v-col class="py-0">
        <v-expand-transition>
          <div v-show="show">
            <v-row>
              <v-col cols="3" v-if="renderData.items['db_type'] !== undefined">
                <component
                  :is="widgetMap[renderData.items['db_type'].widget]"
                  :renderData="renderData.items['db_type']"
                  :keyItem="'db_type'"
                  :mappingData="{ key: 'js_type', value: fieldItemsComputed.js_type }"
                  :fieldType="fieldItemsComputed.js_type"
                  :modelValue="fieldItemsComputed['db_type']"
                  @update:modelValue="
                    ($event) =>
                      $emit('onChangeFieldItems', {
                        fieldItemsKey: 'db_type',
                        newValue: $event,
                        index: index
                      })
                  "
                  class="field-width"
                ></component>
              </v-col>
              <v-col cols="3" class="ml-5" v-if="renderData.items['description'] !== undefined">
                <component
                  :is="widgetMap[renderData.items['description'].widget]"
                  :renderData="renderData.items['description']"
                  :keyItem="'description'"
                  :fieldType="fieldItemsComputed.js_type"
                  :modelValue="fieldItemsComputed['description'] || ''"
                  @update:modelValue="
                    ($event) =>
                      $emit('onChangeFieldItems', {
                        fieldItemsKey: 'description',
                        newValue: $event,
                        index: index
                      })
                  "
                  class="field-width"
                ></component>
              </v-col>
            </v-row>
            <!--Start render recursive DictWidget if have "generator" field -->
            <v-row v-if="renderData.items['generator'] && typeDict === 'field'">
              <v-col>
                <v-divider></v-divider>

                <component
                  :is="widgetMap[renderData.widget]"
                  :renderData="renderData.items.generator"
                  :fieldItems="fieldGenerator"
                  :fieldKey="'generator'"
                  :fieldsKeys="fieldGeneratorItemsKeys"
                  :typeDict="'generator'"
                  @onChangeFieldItems="$emit('onChangeFieldItems', { ...$event, index: index })"
                ></component>
              </v-col>
            </v-row>
            <!--End render recursive DictWidget -->
          </div>
        </v-expand-transition>
      </v-col>
    </v-row>
    <!-- Start render "generator" -->
    <v-card-item v-if="typeDict === 'generator'" class="px-2 py-0 ma-0">
      <v-row>
        <v-col>
          <!-- Start render "generator" key, widget: HardCode -->
          <component
            :is="widgetMap[renderData.key.widget]"
            :renderData="renderData.key"
            :keyItem="'key'"
            :modelValue="fieldName"
            @update:modelValue="
              ($event) =>
                $emit('onChangeFieldName', {
                  newKey: $event,
                  index: index
                })
            "
            :fieldsKeys="fieldsKeys"
            class="field-width"
          ></component>
          <!-- End render "generator" key, widget: HardCode -->
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" class="">
          <!-- Start render "generator" type, widget: Enum -->
          <component
            :is="widgetMap[renderData.items.type.widget]"
            :renderData="renderData.items.type"
            :keyItem="'type'"
            :modelValue="fieldItems.type"
            :fieldsKeys="fieldsKeys"
            class="field-width"
            @update:modelValue="
              onChangeGeneratorType({
                newType: $event,
                keyItem: 'type'
              })
            "
          ></component>
          <!-- End render "generator" type, widget: Enum -->
        </v-col>
        <v-col cols="3" v-if="fieldItems.type === 'sample'" class="ml-4">
          <!-- Start render "generator" if type = sample, widget: Enum -->
          <component
            :is="widgetMap[renderData.items.sample.widget]"
            :renderData="renderData.items.sample"
            :keyItem="'sample'"
            :mappingData="{ key: 'type', value: fieldItems.type }"
            :modelValue="fieldItems.sample"
            :fieldsKeys="fieldsKeys"
            class="field-width"
            @update:modelValue="
              onChangeGeneratorSample({
                newType: $event,
                keyItem: 'sample'
              })
            "
          ></component>
          <!-- End render "generator" if type = sample, widget: Enum -->
        </v-col>
      </v-row>
    </v-card-item>
    <!-- End render "generator" -->
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
  // modelValue: {
  //   type: Object
  // },
  typeDict: {
    type: String
  },
  fieldKey: {
    type: String
  },
  fieldItems: {
    type: Object
  },
  index: {
    type: Number
  },
  fieldsKeys: {
    type: Array
  }
})

const emits = defineEmits([
  'onChangeFieldName',
  'onChangeFieldItems',
  // 'update:modelValue',
  'addFieldBefore',
  'addFieldAfter',
  'deleteField',
  'onChangeGeneratorType',
  'onChangeGeneratorSample'
])

const widgetMap = {
  dict: DictWidget,
  text: TextInput,
  enum: EnumSelect,
  checkbox: WidgetCheckbox,
  hardcode: HardcodeWidget
}

const fieldName = computed(() => props.fieldKey)
const fieldItemsComputed = computed(() => props.fieldItems)
const fieldGenerator = computed(() =>
  props.typeDict === 'field' ? props.fieldItems.generator : null
)
const fieldGeneratorItemsKeys = computed(() =>
  fieldGenerator.value ? Object.keys(fieldGenerator.value) : null
)
const show = ref(false)

const onChangeGeneratorType = (updateData) => {
  console.log('onChangeGeneratorType', updateData, props.typeDict)
  if (props.fieldItems.type !== updateData.newType) {
    const newGenerator = getDefaultGenerator(updateData.newType)
    console.log('newGenerator', newGenerator)
    emits('onChangeFieldItems', {
      fieldItemsKey: 'generator',
      newValue: newGenerator,
      index: props.index
    })
  } else {
    const { newType, keyItem } = updateData
    emits('onChangeFieldItems', {
      fieldItemsKey: 'generator',
      newValue: {
        ...fieldItemsComputed.value,
        [keyItem]: newType
      },
      index: props.index
    })
  }
}

const onChangeGeneratorSample = (updateData) => {
  console.log('onChangeGeneratorSample', updateData, fieldItemsComputed.value)
  const { newType, keyItem } = updateData
  emits('onChangeFieldItems', {
    fieldItemsKey: 'generator',
    newValue: {
      ...fieldItemsComputed.value,
      [keyItem]: newType
    },
    index: props.index
  })
}
</script>

<style scoped>
.field-width {
  width: 200px;
}
</style>
