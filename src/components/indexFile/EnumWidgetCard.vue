<template>
  <!-- <pre>
           {{ modelValue }}
        </pre
  > -->
  <v-container class="ma-0 pa-0">
    <v-row class="ma-0 pa-0">
      <v-col cols="12" class="ma-0 pa-0">
        <v-checkbox
          v-model="withMapping"
          :label="'with mapping'"
          class="ma-2"
          dense
          :disabled="posibleFieldsForMapping.length === 0"
        ></v-checkbox>
      </v-col>
      <v-col v-if="!withMapping" cols="12" class="ma-0 pa-0">
        <v-card-subtitle>Values</v-card-subtitle>

        <EnumValuesCard :modelValue="localValues" />
      </v-col>
      <v-col v-if="withMapping" cols="4" class="">
        <v-select
          v-model="selectedEnumName"
          :items="posibleEnumNames"
          label="field for mapping"
          density="compact"
          class="ma-2"
          variant="outlined"
        ></v-select>
       
      </v-col>
      <v-col v-if="withMapping" cols="4" class="">
        
        <v-select
          v-model="selectedEnumValues"
          :items="posibleEnumValues"
          label="values for mapping"
          density="compact"
          class="ma-2"
          :desabled="posibleEnumValues.length === 0"
          variant="outlined"
        ></v-select>
       
      </v-col>
      <v-col v-if="withMapping" cols="2" class="">
        
       
        <v-btn
          variant="plain"
          @click="localMapping[selectedEnumName][selectedEnumValues] = ['']"
          size="x-small"
          density="compact"
          class="mt-5 pa-0"
          :disabled="selectedEnumValues === ''"
          >add value</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="selectedEnumName !== ''">
      <v-col v-for="(mapVal, mapKey, i) in localMapping" :key="i" cols="12" class="">
        <div v-for="(val, key, i) in mapVal" :key="i">
          <v-card class="ma-2 pa-2" variant="outlined">
            <div class="d-flex justify-space-between">
              <v-card-subtitle>{{ key }}</v-card-subtitle>
              <v-btn
                variant="plain"
                @click="delete mapVal[key]"
                size="x-small"
                density="compact"
                class="pt-1"
                >remove</v-btn
              >
            </div>

            <EnumValuesCard :modelValue="val" />
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import EnumValuesCard from '@/components/indexFile/EnumValuesCard.vue'

const props = defineProps({
  modelValue: {
    type: Object
  },
  posibleFieldsForMapping: {
    type: Array,
    default: () => []
  }
})

const localValues = ref([])
const localMapping = ref({})
const selectedEnumName = ref('')
const withMapping = ref(null)
const enumData = computed(() => props.modelValue)
const posibleEnumNames = computed(() => {
  return props.posibleFieldsForMapping.map((item) => item.name)
})
const selectedEnumValues = ref('')
const posibleEnumValues = computed(() => {
  return props.posibleFieldsForMapping.find(
    (item) => item.name === selectedEnumName.value
  // eslint-disable-next-line no-prototype-builtins
  ).values.filter((item) => !localMapping.value[selectedEnumName.value].hasOwnProperty(item)) || []
})
onBeforeMount(() => {
  if (props.modelValue.values !== undefined) {
    localValues.value = props.modelValue.values
    withMapping.value = false
  } else {
    localMapping.value = props.modelValue.mapping
    selectedEnumName.value = Object.keys(props.modelValue.mapping)[0]
    
    withMapping.value = true
  }
})

watch(
  () => withMapping.value,
  (newValue, oldValue) => {
    console.log('newValue', newValue, 'oldValue', oldValue)
    if (newValue === false && oldValue !== null) {
      enumData.value['values'] = ['string', 'object', 'number', 'boolean', 'array']
      localMapping.value = {}
      delete enumData.value['mapping']
    }
    if (newValue === true && oldValue !== null) {
      selectedEnumName.value = props.posibleFieldsForMapping[0].name
      localMapping.value = newMapping()
      enumData.value['mapping'] = localMapping.value
      delete enumData.value['values']
    }
  }
)


const newMapping = () => {
  const values = props.posibleFieldsForMapping.find(
    (item) => item.name === selectedEnumName.value
  ).values
  console.log('values', values)
  const mapping = {}
  mapping[selectedEnumName.value] = (() => {
    const result = {}

    values.forEach((item) => {
      result[item] = ['']
    })
    console.log('result', result)
    return result
  })()
  console.log('mapping', mapping)
  return mapping
}

</script>
