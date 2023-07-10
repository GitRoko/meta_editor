import { describe, it, expect, beforeEach, afterEach} from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import WidgetCheckbox from '@/components/widgets/WidgetCheckbox.vue'
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
  wrapper = renderWithVuetify(WidgetCheckbox, {
    props: {
      keyItem: 'key',
      modelValue: false,
      
    }
  })
})

afterEach(() => {
  wrapper.unmount()
})

describe('WidgetCheckbox tests', () => {
  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('binds to the model', async () => {
    wrapper.setProps({ modelValue: true });

    await flushPromises()

    const checkbox = wrapper.find('input[type="checkbox"]');

    expect(checkbox.element.checked).toBe(true);

    await checkbox.setChecked(false);

    expect(wrapper.emitted('update:modelValue')[0]).toEqual([false]);
  });

  it('displays the label', async () => {
    const keyItem = 'Моя метка';

    wrapper.setProps({ keyItem });

    await flushPromises()

    const label = wrapper.find('label');

    expect(label.text()).toBe(keyItem);
  });

  it('updates the model on event', async () => {
    const checkbox = wrapper.find('input[type="checkbox"]');

    await checkbox.setChecked(true);

    expect(wrapper.emitted('update:modelValue')[0]).toEqual([true]);
  });

  it('updates the component state with external data', async () => {
    wrapper.setProps({ modelValue: false });

    await wrapper.setProps({ modelValue: false });
    await flushPromises()

    const checkbox = wrapper.find('input[type="checkbox"]');

    expect(checkbox.element.checked).toBe(false);
  });

  it('emits an event', async () => {
    const checkbox = wrapper.find('input[type="checkbox"]');

    await checkbox.setChecked(true);

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
  });

  it('checks prop types', async () => {

    wrapper.setProps({ modelValue: false, keyItem: 'My label' });

    await flushPromises()

    expect(wrapper.props().modelValue).toBe(false);
    expect(wrapper.props().keyItem).toBe('My label');
  });
});
