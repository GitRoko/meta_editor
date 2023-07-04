import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  objectToArray,
  arrayToObject,
  getDefaultGenerator,
  getDefaultField,
  newWidgetType
} from '@/plugins/utils.js'

const testObjectData = {
  field_1: {
    key: 'value'
  },
  field_2: {
    key: 'value'
  }
}

const testArrayData = [
  { name: 'field_1', key: 'value' },
  { name: 'field_2', key: 'value' }
]

const defaultField = {
  name: 'defaultName',
  js_type: 'string',
  optional: true,
  db_type: 'varchar',
  description: 'some defaultField',
  generator: {
    type: 'zip'
  }
}

const defaultGeneratorList = ['ip', 'zip', 'sample']

const defaultGenerator = {
  ip: { type: 'ip' },
  zip: { type: 'zip' },
  sample: { type: 'sample', sample: 'name' }
}

const widgetTypesList = ['text', 'enum', 'dict', 'list', 'checkbox', 'filename', 'hardcode']

const widgetTypes = {
  text: {
    name: 'text_field',
    widget: 'text',
    validation: {
      regexp: '.*',
      unique: false
    }
  },
  enum: {
    name: 'enum_field',
    widget: 'enum',
    values: ['string', 'number', 'object', 'array', 'boolean']
  },
  dict: {
    name: 'dict_field',
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
        name: 'text_field',
        widget: 'text',
        validation: {
          regexp: '.*',
          unique: false
        }
      }
    ]
  },
  list: {
    name: 'list_field',
    widget: 'list',
    items: [
      {
        name: 'text_field',
        widget: 'text',
        validation: {
          regexp: '.*',
          unique: false
        }
      }
    ]
  },
  checkbox: {
    name: 'checkbox_field',
    widget: 'checkbox'
  },
  filename: {
    name: 'filename_field',
    widget: 'filename',
    validation: {
      regexp: '^[a-zA-Z0-9_]+\\.yaml$',
      unique: true
    }
  },
  hardcode: {
    widget: 'hardcode'
  }
}

describe('utils.js test', () => {
  it('testing type of functions', () => {
    expectTypeOf(objectToArray).toBeFunction()
    expectTypeOf(arrayToObject).toBeFunction()
    expectTypeOf(getDefaultGenerator).toBeFunction()
    expectTypeOf(getDefaultField).toBeFunction()
    expectTypeOf(newWidgetType).toBeFunction()
  })

  it('return right type value', () => {
    expectTypeOf(objectToArray(testObjectData)).toBeArray()

    expectTypeOf(arrayToObject(testArrayData)).toBeObject()

    defaultGeneratorList.forEach((type) => {
      expectTypeOf(getDefaultGenerator(type)).toBeObject()
    })

    expectTypeOf(getDefaultField()).toBeObject()

    widgetTypesList.forEach((type) => {
      expectTypeOf(newWidgetType(type)).toBeObject()
    })
  })

  it('return correct value', () => {
    expect(objectToArray(testObjectData)).toEqual(testArrayData)

    expect(arrayToObject(testArrayData)).toEqual(testObjectData)

    defaultGeneratorList.forEach((type) => {
      expect(getDefaultGenerator(type)).toEqual(defaultGenerator[type])
    })

    expect(getDefaultField()).toEqual(defaultField)

    widgetTypesList.forEach((type) => {
      expect(newWidgetType(type)).toEqual(widgetTypes[type])
    })
  })
})
