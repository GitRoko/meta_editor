<template>
  <v-container class="pa-1">
    <v-row>
      <v-col class="pa-0">
        <v-card-item class="px-2 py-0 ma-0">
          <template v-slot:prepend>
            <component
              :is="widgetMap[renderData.key.widget]"
              :renderData="renderData.key"
              :keyItem="'key'"
              v-model.lazy="fieldName"
              :fieldsKeys="fieldsKeys"
              class="field-width"
            ></component>
          </template>
          <div class="d-flex pt-2 ml-2">
            <component
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

    <v-row>
      <v-col class="py-0">
        <v-expand-transition>
          <div v-show="show">
            <!-- <v-divider></v-divider> -->

            <v-row>
              <v-col
                cols="3"
                v-if="
                  fieldItemsComputed['db_type'] !== undefined &&
                  renderData.items['db_type'] !== undefined
                "
              >
                <component
                  :is="widgetMap[renderData.items['db_type'].widget]"
                  :renderData="renderData.items['db_type']"
                  :keyItem="'db_type'"
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
              <v-col
                cols="3"
                class="ml-5"
                v-if="
                  fieldItemsComputed['description'] !== undefined &&
                  renderData.items['description'] !== undefined
                "
              >
                <component
                  :is="widgetMap[renderData.items['description'].widget]"
                  :renderData="renderData.items['description']"
                  :keyItem="'description'"
                  :fieldType="fieldItemsComputed.js_type"
                  :modelValue="fieldItemsComputed['description']"
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
          </div>
        </v-expand-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed, ref, watch } from 'vue'
import TextInput from '@/components/widgets/TextInput.vue'
import EnumSelect from '@/components/widgets/EnumSelect.vue'
import WidgetCheckbox from '@/components/widgets/WidgetCheckbox.vue'
import FieldMenu from '@/components/FieldMenu.vue'

export default {
  props: {
    renderData: {
      type: Object
    },
    // modelValue: {
    //   type: Object
    // },
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
  },
  components: {
    TextInput,
    EnumSelect,
    WidgetCheckbox,
    FieldMenu
  },
  emits: [
    'onChangeFieldKey',
    'onChangeFieldItems',
    // 'update:modelValue',
    'addFieldBefore',
    'addFieldAfter',
    'deleteField'
  ],
  setup: (props, { emit }) => {
    const widgetMap = {
      text: TextInput,
      enum: EnumSelect,
      checkbox: WidgetCheckbox
    }
    const fieldName = ref(props.fieldKey)
    const fieldItemsComputed = computed(() => props.fieldItems)
    const show = ref(false)
    // @update:modelValue="($event) => $emit('onChangeFieldKey', $event)"

    watch(fieldName, (newValue) => {
      emit('onChangeFieldKey', {
        newKey: newValue,
        index: props.index
      })
    })


    return {
      widgetMap,
      fieldItemsComputed,
      show,
      fieldName
    }
  }
}
</script>

<style scoped>
.field-width {
  width: 200px;
}
</style>
