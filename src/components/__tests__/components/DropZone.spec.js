import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import DropZone from '@/components/DropZone.vue'
import { createTestingPinia } from '@pinia/testing'
// import any store you want to interact with in tests
// import { useMetaDirectoryStore } from '@/stores/metaDirectory'

import { createVuetify } from 'vuetify'

function renderWithVuetify (component, options) {
    const vuetify = createVuetify()
    return mount(component, {
        ...options,
        global: {
            plugins: [vuetify, createTestingPinia()],
        },
    })
}


describe('DropZone.vue tests', () => {
  it('normal imports as expected', async () => {
    const cmp = await import('@/components/DropZone.vue')
    expect(cmp).toBeDefined()
  })
  it('DropZone component is rendered', () => {
    const wrapper = renderWithVuetify(DropZone)
    // const store = useMetaDirectoryStore() // uses the testing pinia!
    expect(wrapper.text()).toContain('Drag and drop a folder here')
  })
})
