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

  it('should render an input element', async () => {
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
  });
  
  
  it('should emit event when text is entered', async () => {
    const input = wrapper.getComponent({ name: 'v-text-field' })
    const text = 'default_field_3';

    input.setValue(text);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted()['update:modelValue']).toHaveLength(1)
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([text])
  });

  it('should not emit event when vnew value is not unique', async () => {
    const input = wrapper.getComponent({ name: 'v-text-field' })
    let text = 'default_field_1';

    input.setValue(text);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
    expect(wrapper.find('.v-messages__message').text()).toBe('Value is not unique')
  });

  it('should not emit event when new value is invalid', async () => {
    const input = wrapper.getComponent({ name: 'v-text-field' })
    let text = 'default_field 1';

    input.setValue(text);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
    expect(wrapper.find('.v-messages__message').text()).toBe('Invalid, rule: ^[a-zA-Z0-9_]+$')
  });

  it('should not emit event when new value is false', async () => {
    const input = wrapper.getComponent({ name: 'v-text-field' })
    let text = !!'';

    input.setValue(text);

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted()).not.toHaveProperty('update:modelValue')
    expect(wrapper.find('.v-messages__message').text()).toBe('Required field')
  });

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
