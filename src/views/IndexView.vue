<template>
  <v-container v-if="indexData" class="">
    <v-row>
      <v-col cols="6" class="pl-6 d-flex flex-row" style="font-size: 12px"> Index File </v-col>
      <v-col cols="6" class="pr-6 d-flex flex-row-reverse" style="font-size: 12px">
        version: {{ indexData.version }}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-tabs
            v-model="tab"
            bg-color="primary"
            next-icon="$chevRight"
            prev-icon="$chevLeft"
            show-arrows
          >
            <v-tab v-for="(moduleItem, i) in moduleList" :key="i">
              {{ moduleItem.name }}
            </v-tab>
            <v-btn
              @click="addModule"
              size="x-small"
              icon="$plus"
              class="mt-2 ml-4"
              variant="text"
            ></v-btn>
          </v-tabs>
          <v-window v-model="tab">
            <ModuleItem
              v-for="(moduleItem, i) in moduleList"
              :key="i"
              :moduleItem="moduleItem"
              :index="i"
              :length="moduleList.length"
              @updateModuleItemValue="updateModuleItemValue($event, i)"
              @removeModuleItem="removeModule"
            />
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useMetaDirectoryStore } from '@/stores/metaDirectory'
import { storeToRefs } from 'pinia'
import ModuleItem from '@/components/indexFile/ModuleItem.vue'
defineEmits(['removeModuleItem', 'updateModuleItemValue'])
const { index } = storeToRefs(useMetaDirectoryStore())
const indexData = computed(() => {
  return index.value.fileData
})
const moduleList = computed(() => {
  return index.value.fileData.module
})

const updateModuleItemValue = (updateData, index) => {
  const { key, value } = updateData
  console.log(updateData, index)
  moduleList.value[index][key] = value
}

let tab = ref(null)
const addModule = () => {
  const newModule = {
    name: 'New Module',
    description: 'New Module Description',
    data: {}
  }
  moduleList.value.splice(moduleList.value.length, 0, newModule)
  tab.value = moduleList.value.length - 1
}

const removeModule = () => {
  moduleList.value.splice(tab.value, 1)
  tab.value = moduleList.value.length - 1
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
  const result = {}
  array.forEach((item) => {
    console.log(item)
    result[item.key] = item.value.value
  })
  return result
}

const obj = {
  version: 1,
  module: [
    {
      name: 'raw datasets',
      description: 'just an example for raw dataset structure',
      data: [
        {
          name: 'name',
          widget: 'filename',
          validation: {
            regexp: '^[a-zA-Z0-9_]+\\.yaml$',
            unique: true
          }
        },
        {
          name: 'description',
          widget: 'text',
          validation: {
            regexp: '.*',
            unique: false
          }
        },
        {
          name: 'group',
          widget: 'text',
          validation: {
            regexp: '.*',
            unique: false
          }
        },
        {
          name: 'fields',
          widget: 'list',
          items: [
            {
              name: 'field',
              widget: 'dict',
              key: {
                widget: 'text',
                validation: {
                  regexp: '^[a-zA-Z0-9_]+$',
                  unique: true
                }
              },
              items: [
                {
                  name: 'js_type',
                  widget: 'enum',
                  values: ['string', 'number', 'object', 'array', 'boolean']
                },
                {
                  name: 'optional',
                  widget: 'checkbox'
                },
                {
                  name: 'db_type',
                  widget: 'enum',
                  mapping: {
                    js_type: {
                      string: ['varchar'],
                      number: ['bigint', 'double'],
                      array: ['varchar'],
                      object: ['varchar'],
                      boolean: ['varchar']
                    }
                  }
                },
                {
                  name: 'description',
                  widget: 'text',
                  validation: {
                    regexp: '.*',
                    unique: false
                  }
                },
                {
                  name: 'generator',
                  widget: 'dict',
                  key: {
                    widget: 'hardcode'
                  },
                  items: [
                    {
                      name: 'type',
                      widget: 'enum',
                      values: ['zip', 'sample', 'ip']
                    },
                    {
                      name: 'sample',
                      widget: 'enum',
                      mapping: {
                        type: {
                          sample: ['email', 'name']
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
</script>
