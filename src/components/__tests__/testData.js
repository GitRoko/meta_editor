export const testObjectData = {
  field_1: {
    key: 'value'
  },
  field_2: {
    key: 'value'
  }
};

export const testArrayData = [
  { name: 'field_1', key: 'value' },
  { name: 'field_2', key: 'value' }
];

export const defaultField = {
  name: 'defaultName',
  js_type: 'string',
  optional: true,
  db_type: 'varchar',
  description: 'some defaultField',
  generator: {
    type: 'zip'
  }
};

export const defaultGeneratorList = ['ip', 'zip', 'sample'];

export const defaultGenerator = {
  ip: { type: 'ip' },
  zip: { type: 'zip' },
  sample: { type: 'sample', sample: 'name' }
};

export const widgetTypesList = ['text', 'enum', 'dict', 'list', 'checkbox', 'filename', 'hardcode'];

export const widgetTypes = {
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
};
