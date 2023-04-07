<template>
  <div>
    <!-- <pre>{{ modelValue }}</pre> -->
    <!-- <pre>{{ renderData }}</pre> -->
    <br />
    <div>
      <v-card class="my-2 pa-2" v-for="(fieldKey, i) in fieldsKeys" :key="`${i}-${fieldKey}`">
        <!-- <v-toolbar class="pa-0 ma-0" height="32" color="rgba(0, 0, 0, 0)">
          <template v-slot:append>
            <FieldMenu
              @addFieldBefore="addFieldBefore(i)"
              @addFieldAfter="addFieldAfter(i)"
              @deleteField="deleteField(i)"
            />
          </template>
        </v-toolbar> -->
        <component
          :is="widgetMap[renderData.items[0].field.widget]"
          :renderData="renderData.items[0].field"
          :fieldKey="fieldKey"
          :fieldsKeys="fieldsKeys"
          @onChangeFieldKey="onChangeFieldKey($event)"
          :fieldItems="fieldsList[i][fieldKey]"
          :index="i"
          @onChangeFieldItems="onChangeFieldItems($event)"
          @addFieldBefore="addFieldBefore(i)"
          @addFieldAfter="addFieldAfter(i)"
          @deleteField="deleteField(i)"
        ></component>
      </v-card>
    </div>
  </div>
</template>

<!-- <script>
import DictWidget from '@/components/widgets/DictWidget.vue'
import { onBeforeMount } from 'vue'
// import FieldMenu from '@/components/FieldMenu.vue'

import { computed, ref } from 'vue'

export default {
  props: {
    renderData: {
      type: Object
    },
    modelValue: {
      type: Array
    },
    keyItem: {
      type: String
    }
  },
  components: {
    DictWidget
  },
  emits: [
    'addFieldBefore',
    'addFieldAfter',
    'deleteField',
    'onChangeFieldKey',
    'onChangeFieldItems',
    'update:modelValue'
  ],
  setup: (props) => {
    const widgetMap = {
      dict: DictWidget
    }
    const fieldsKeys = computed(() => {
      return fieldsList.value.map((item) => {
        return Object.keys(item)[0]
      })
    })

    const fieldsList = ref([])

    onBeforeMount(() => {
      fieldsList.value = [...props.modelValue]
    })
    // const fieldsKeys = computed(() => {
    //   return props.modelValue.map((item) => {
    //     return Object.keys(item)[0]
    //   })
    // })

    // const fieldsList = computed(() => props.modelValue)

    const defaultField = () => {
      return {
        defaultField: {
          js_type: 'number',
          optional: false,
          db_type: 'bigint',
          description: 'some desc'
        }
      }
    }

    const deleteField = (index) => {
      console.log('deleteField', index)
      // write validation for last field
      // const newModelValue = [...fieldsList.value]
      fieldsList.value.splice(index, 1)
      // emit('update:modelValue', newModelValue)
    }

    const addFieldBefore = (index) => {
      // write validation for unique key field or validate in text input

      console.log('addFieldBefore', index)
      fieldsList.value.splice(index, 0, defaultField())
      // emit('update:modelValue', newModelValue)
    }

    const addFieldAfter = (index) => {
      // write validation for unique key field or validate in text input

      console.log('addFieldAfter', index)
      // const newModelValue = [...fieldsList.value]
      fieldsList.value.splice(index + 1, 0, defaultField())

      // emit('update:modelValue', newModelValue)
    }

    const onChangeFieldKey = (updateData) => {
      // write validation for unique key field or validate in text input
      const { index, newKey } = updateData
      
      fieldsList.value[index] = {
        [newKey]: fieldsList.value[index][fieldsKeys.value[index]]
      }
      // delete fieldsList.value[index][fieldsKeys.value[index]]
      // console.log('changeFieldKey', index, newKey)
      // const newModelValue = [...fieldsList.value]
      // const oldKey = Object.keys(newModelValue[index])[0]
      // newModelValue[index] = {
        //   [newKey]: newModelValue[index][oldKey]
        // }
        
        
        // fieldsList.value[index] = {
          //   [newKey]: fieldsList.value[index][oldKey]
          // }
          console.log('onChangeFieldKey', updateData)
      // emit('update:modelValue', newModelValue)
    }

    const onChangeFieldItems = (update) => {
      const { index, fieldItemsKey, newValue } = update
      console.log('onChangeFieldItems', update)
      // const newModelValue = [...fieldsList.value]
      fieldsList.value[index][fieldsKeys.value[index]][fieldItemsKey] = newValue
      // emit('update:modelValue', newModelValue)
    }

    return {
      widgetMap,
      fieldsList,
      defaultField,
      deleteField,
      addFieldBefore,
      addFieldAfter,
      onChangeFieldKey,
      onChangeFieldItems,
      fieldsKeys
    }
  }
}
</script> -->

<script>
import DictWidget from '@/components/widgets/DictWidget.vue'
// import FieldMenu from '@/components/FieldMenu.vue'

import { computed } from 'vue'

export default {
  props: {
    renderData: {
      type: Object
    },
    modelValue: {
      type: Array
    },
    keyItem: {
      type: String
    }
  },
  components: {
    DictWidget
  },
  emits: [
    'addFieldBefore',
    'addFieldAfter',
    'deleteField',
    'onChangeFieldKey',
    'onChangeFieldItems',
    'update:modelValue'
  ],
  setup: (props, { emit }) => {
    const widgetMap = {
      dict: DictWidget
    }
    const fieldsKeys = computed(() => {
      return props.modelValue.map((item) => {
        return Object.keys(item)[0]
      })
    })

    const fieldsList = computed(() => props.modelValue)

    // const fieldsKeys = computed(() => {
    //   return props.modelValue.map((item) => {
    //     return Object.keys(item)[0]
    //   })
    // })

    // const fieldsList = computed(() => props.modelValue)

    const defaultField = () => {
      return {
        defaultField: {
          js_type: 'number',
          optional: false,
          db_type: 'bigint',
          description: 'some desc'
        }
      }
    }

    const deleteField = (index) => {
      console.log('deleteField', index)
      // write validation for last field

      const newModelValue = [...fieldsList.value]
      newModelValue.splice(index, 1)
      emit('update:modelValue', newModelValue)
    }

    const addFieldBefore = (index) => {
      // write validation for unique key field or validate in text input

      console.log('addFieldBefore', index)
      const newModelValue = [...fieldsList.value]
      newModelValue.splice(index, 0, defaultField())
      emit('update:modelValue', newModelValue)
    }

    const addFieldAfter = (index) => {
      // write validation for unique key field or validate in text input

      console.log('addFieldAfter', index)
      const newModelValue = [...fieldsList.value]
      newModelValue.splice(index + 1, 0, defaultField())
      emit('update:modelValue', newModelValue)
    }

    const onChangeFieldKey = (updateData) => {
      // write validation for unique key field or validate in text input
      const { index, newKey } = updateData

      // console.log('changeFieldKey', index, newKey)
      const newModelValue = [...fieldsList.value]
      const oldKey = Object.keys(newModelValue[index])[0]
      newModelValue[index] = {
        [newKey]: newModelValue[index][oldKey]
      }
      // fieldsList.value[index] = {
      //   [newKey]: fieldsList.value[index][oldKey]
      // }
      emit('update:modelValue', newModelValue)
    }

    const onChangeFieldItems = (update) => {
      const { index, fieldItemsKey, newValue } = update
      console.log('onChangeFieldItems', update)
      const newModelValue = [...fieldsList.value]
      newModelValue[index][fieldsKeys.value[index]][fieldItemsKey] = newValue
      emit('update:modelValue', newModelValue)
    }

    return {
      widgetMap,
      fieldsList,
      defaultField,
      deleteField,
      addFieldBefore,
      addFieldAfter,
      onChangeFieldKey,
      onChangeFieldItems,
      fieldsKeys
    }
  }
}
</script>

<style scoped></style>
