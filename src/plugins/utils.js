export const objectToArray = (obj) => {
  const fields = obj;
  const newFields =  Object.keys(fields).map((key) => { 
    return {[key]: fields[key]}
  });

  return newFields;
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