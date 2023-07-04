import { describe, it, expect, expectTypeOf, beforeEach, afterEach} from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import TextInput from '@/components/widgets/TextInput.vue'
import { createVuetify } from 'vuetify'

function renderWithVuetify (component, options) {
  const vuetify = createVuetify()
  return mount(component, {
      ...options,
      global: {
          plugins: [vuetify],
      },
  })
}

let wrapper = null

beforeEach(() => {
  // render the component
  wrapper = renderWithVuetify(TextInput, {
    props: {
      keyItem: 'key',
      fieldsKeys: ['default_field', 'default_field_1'],
      modelValue: 'default_field',
      renderData: {
        widget: 'text',
        validation: {
          regexp: '^[a-zA-Z0-9_]+$',
          unique: true
        }
      }
    }
  })
})

// TEARDOWN - run after to each unit test
afterEach(() => {
  wrapper.unmount()
})

describe('TextInput.vue Test', () => {
  it('normal imports as expected', async () => {
    const cmp = await import('@/components/widgets/TextInput.vue')
    expect(cmp).toBeDefined()
  })

  it('mount component', async () => {
    expect(TextInput).toBeTruthy()
  })

  it('testing props type', async () => {
    expectTypeOf(wrapper.vm.props.keyItem).toBeString('string')
    expectTypeOf(wrapper.vm.props.renderData).toBeObject('object')
    expectTypeOf(wrapper.vm.props.modelValue).toBeString('string')
    expectTypeOf(wrapper.vm.props.fieldsKeys).toBeArray('array')
  })

  it('processes valid props data', async () => {
    // Update the props passed in to the WeatherResult component
    wrapper.setProps({
      keyItem: 'key1',
      fieldsKeys: ['default_field_2', 'default_field_1'],
      modelValue: 'default_field_1',
      renderData: {
        widget: 'text',
        validation: {
          regexp: '',
          unique: false
        }
      }
    })
  
    // Wait until the DOM updates
    await flushPromises()
  
    // check that the prop data is stored as expected within the component
    expect(wrapper.vm.props.keyItem).toEqual('key1')
    expect(wrapper.vm.props.fieldsKeys).toEqual(['default_field_2', 'default_field_1'])
    expect(wrapper.vm.props.modelValue).toEqual('default_field_1')
    expect(wrapper.vm.props.renderData).toEqual({
      widget: 'text',
      validation: {
        regexp: '',
        unique: false
      }
    })
  })
})
