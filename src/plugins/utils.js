export const objectToArray = (obj) => {
  return Object.entries(obj).map(([key, items]) => {
    return {key, items};
  });
}

export const arrayToObject = (arr) => {
  const fields = arr;
  const newFields = {};
  fields.forEach((field) => {
    const key = Object.keys(field)[0];
    newFields[key] = field[key];
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
    key: 'defaultField',
    items: {
      js_type: 'string',
      optional: true,
      db_type: 'varchar',
      description: 'some defaultField',
      generator: {
        type: 'zip'
      }
    }
  };
}