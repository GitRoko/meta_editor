import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMetaDirectoryStore } from '@/stores/metaDirectory'  // <-- !!

describe('Data Store Test', () => {
  let store = null

  beforeEach(() => {
    // create a fresh Pinia instance and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())

    // create an instance of the data store
    store = useMetaDirectoryStore()
  })

  it('initializes with correct values', () => { 
    expect(store.getFiles).toBe(null)
    expect(store.getDirectoryHandle).toBe(null)
   })
  // it('test adding a directoryHandle', () => { 
  //   store.accessingFolder()
  //   expect(store.getDirectoryHandle).toBe(null)
  // })
  // it('test adding a duplicate city', () => { ... })
  // it('test removing all cities', () => { ... })
  
})