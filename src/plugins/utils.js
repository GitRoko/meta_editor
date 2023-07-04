export const objectToArray = (obj) => {
  return Object.entries(obj).map(([key, items]) => {
    return {name: key, ...items};
    // return {key, items};
  });
}

export const arrayToObject = (arr) => {
  const newFields = {};
  arr.forEach((field) => {
    const key = field.name;
    newFields[key] = { ...field }
    delete newFields[key].name
  });

  return newFields;
}

export const getDefaultGenerator = (type) => {
  // need make import values of generator type from index !!!
  switch (type) {
    case 'ip':
      return {type: 'ip'};
    case 'zip':
      return {type: 'zip'};
    case 'sample':
      return {type: 'sample', sample: 'name'};
  
    default:
      break;
  }
}

export const getDefaultField = () => {
  return {
      name: 'defaultName',
      js_type: 'string',
      optional: true,
      db_type: 'varchar',
      description: 'some defaultField',
      generator: {
        type: 'zip'
      }
  };
}

export const newWidgetType = (type) => {
  switch (type) {
    case 'text':
      return {
        name: 'text_field',
        widget: 'text',
        validation: {
          regexp: '.*',
          unique: false
        }
      }
    case 'enum':
      return {
        name: 'enum_field',
        widget: 'enum',
        values: ['string', 'number', 'object', 'array', 'boolean']
      }
    case 'dict':
      return {
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
      }
    case 'list':
      return {
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
      }
    case 'checkbox':
      return {
        name: 'checkbox_field',
        widget: 'checkbox'
      }
    case 'hardcode':
      return {
        widget: 'hardcode'
      }
    case 'filename':
      return {
        name: 'filename_field',
        widget: 'filename',
        validation: {
          regexp: '^[a-zA-Z0-9_]+\\.yaml$',
          unique: true
        }
      }
  }
}