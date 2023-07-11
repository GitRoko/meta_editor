import { describe, it, expect, expectTypeOf, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import EnumSelect from '@/components/widgets/EnumSelect.vue'
import { createVuetify } from 'vuetify'

function renderWithVuetify(component, options) {
  const vuetify = createVuetify()
  return mount(component, {
    ...options,
    global: {
      plugins: [vuetify]
    }
  })
}

let wrapper = null

beforeEach(() => {
  let renderData = {
    name: 'js_type',
    widget: 'enum',
    values: ['string', 'number', 'object', 'array', 'boolean']
  }
  let modelValue = 'string'
  let keyItem = 'js_type'
  let mappingData = null

  wrapper = renderWithVuetify(EnumSelect, {
    props: {
      keyItem,
      modelValue,
      renderData,
      mappingData
    }
  })
})

afterEach(() => {
  wrapper.unmount()
})

describe('EnumSelect tests', () => {
  it('forms the options array correctly', async () => {
    const options = wrapper.vm.itemsFromType

    expectTypeOf(options).toBeArray('array')
    expect(options).toHaveLength(5)
    expect(wrapper.vm.itemsFromType).toEqual(['string', 'number', 'object', 'array', 'boolean'])

    wrapper.setProps({
      keyItem: 'db_type',
      modelValue: '',
      renderData: {
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
      mappingData: { key: 'js_type', value: 'number' }
    })

    await flushPromises()

    const newOptions = wrapper.vm.itemsFromType

    expectTypeOf(newOptions).toBeArray('array')
    expect(newOptions).toHaveLength(2)
    expect(wrapper.vm.itemsFromType).toEqual(['bigint', 'double'])
  })

  it('v-select gets correct value', async () => {
    const select = wrapper.getComponent({ name: 'v-select' })

    expect(select.props('modelValue')).toBe('string')
  });


  it('updates the selected item when the modelValue changes', async () => {
    const select = wrapper.getComponent({ name: 'v-select' })

    await wrapper.setProps({
      modelValue: 'object',
    });

    expect(select.props('modelValue')).toBe('object')
  });

    it('should not emit event when new value is invalid and showing error', async () => {
    const select = wrapper.getComponent({ name: 'v-select' })
    let text = '';

    await wrapper.setProps({
      modelValue: text,
    });

    await wrapper.vm.$nextTick();

    expect(select.emitted()).not.toHaveProperty('update:modelValue')
    expect(select.find('.v-messages__message').text()).toBe('Invalid value')
  });
})
