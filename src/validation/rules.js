const rules = {
  regexp: (value, regexp) => {
    if (regexp === undefined) {
      return true
    }
    const pattern = new RegExp(regexp)
    const result =pattern.test(value) || `Invalid, rule: ${regexp}`
    return result
  },
  unique: (newValue, oldValue, isUnique, list = []) => {
    if (!newValue) {
      return 'Value is required.';
    }
    if (isUnique) {
      const index = list.findIndex((item) => item === oldValue);
      const newList = [...list]
      newList.splice(index, 1);

      return !newList.includes(newValue) || `Value is not unique`;
    } else {
      return true;
    }
  },
  isValidEnum: (value, enumList) => {
    return enumList.includes(value) || `Invalid value`
  },
  required: (v) => {
    return !!v || 'Required field'
  }
}

export { rules }
