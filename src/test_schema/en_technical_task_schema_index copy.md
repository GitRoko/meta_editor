# General field structure

## "type" dependent examples:
### "js_type": string  -  select with options:

  ```yaml
  default_field_1:
    js_type: string 
    generator:
      type: sample # "js_type" dependent select
      sample: name # "type" dependent dropdown ['name', 'cities', ...]
  ```
  ```yaml
  default_field_1:
    js_type: string    
    generator:
      type: code # "js_type" dependent select
      upper: false # "type" dependent checkbox
      length: 16 # "type" dependent input type number
  ```
  ```yaml
  default_field_1:
    js_type: string    
    generator:
      type: date # "js_type" dependent select
      format: "%Y-%m-%d" # "type" dependent input type text
      min_year: 2018 # "type" dependent input type number
      max_year: 2022 # "type" dependent input type number
  ```
  ```yaml
  default_field_1:
    js_type: string    
    generator:
      type: foreign # "js_type" dependent select
      dataset: campaign_click_open_raw # "type" dependent enum with files list
      field: delivery_log # "dataset" dependent enum with filds of file
  ```
  ```yaml
  default_field_1:
    js_type: string    
    generator:
      type: enum # "js_type" dependent select
      values: ['Possible values', 'Possible values'] # "type" dependent widget Values?
  ```
  ```yaml
  default_field_1:
    js_type: string    
    generator:
      type: zip # "js_type" dependent select
  ```
  ```yaml
  default_field_1:
    js_type: string    
    generator:
      type: ip # "js_type" dependent select
  ```
  ```yaml
  default_field_1:
    js_type: string    
    generator:
      type: phone # "js_type" dependent select
  ```
  ```yaml
  default_field_1:
    js_type: string    
    generator:
      type: uuid # "js_type" dependent select
  ```

### "js_type": number  -  select with options:

```yaml 
default_field_1:
  js_type: number    
  generator:
    type: integer # "js_type" dependent select
    unique: false # checkbox
    to_str: false # checkbox
```
```yaml
default_field_1:
  js_type: number    
  generator:
    type: enum # "js_type" dependent select
    values: [0, 1, 2] # "type" dependent widget Values?
```

### "js_type": array  -  select with options:

```yaml
default_field_1:
  js_type: array    
  generator:
    type: array # "js_type" dependent select
    occurrence_min: 1 # "type" dependent input type number
    occurrence_max: 1 # "type" dependent input type number
```
```yaml   
default_field_1:
  js_type: array    
  generator:
    type: enum # "js_type" dependent select
    values: [["default_array"], ["default_array"]] # "type" dependent widget Values?
```

### "js_type": object  -  select with options:

```yaml 
default_field_1:
  js_type: object    
  generator:
    type: object # "js_type" dependent select
``` 
```yaml
default_field_1:
  js_type: object    
  generator:
    type: enum # "js_type" dependent select
    values: [{"default":"object"}, {"default":"object"}] # "type" dependent widget Values?
```

### "js_type": boolean  -  select with options:
  
```yaml
default_field_1:
  js_type: boolean    
  generator:
    type: enum # "js_type" dependent select
    values: [true, false] # "type" dependent widget Values?
```

### Nested fields (js_type: object or js_type: array):

A field can only have nested fields if the "js_type" is "object" or "array". The fields are nested in an additional "object" or "array" field, depending on the type of the "js_type" field. Nested fields can be of any type. Nested fields can be of unlimited nesting level. If "js_type: array" then nested fields without field name.

#### Nested fields examples:

```yaml
default_field_1:
  js_type: object
  object: 
    default_field_1:
      js_type: string 
      generator:
        type: sample # "js_type" dependent select
        sample: name # "type" dependent dropdown ['name', 'cities', ...] 
  generator:
    type: object # "js_type" dependent select
```
```yaml
default_field_1:
  js_type: array
  array: # if js_type: array, then nested field without field name
    - js_type: string 
      generator:
        type: sample # "js_type" dependent select
        sample: name # "type" dependent dropdown ['name', 'cities', ...] 
  generator:
    type: array # "js_type" dependent select
    occurrence_min: 1 # "type" dependent input type number
    occurrence_max: 1 # "type" dependent input type number
```

# separate field structure

## "field" 
  - consists of a key and field properties. includes the required field "js_type". 
  - default_field_1 - field name or "id" of the field, must be unique, may be absent if the field is a nested field in the field, where "js_type: array". 
  - Is the key to the field properties object. 
  - The value is always an object. 
  - The field widget is "Dict".

## field propertys:

- "js_type" 
  - the main field, the values of which depend on the values of adjacent and nested fields. 
  - The field value type is always a string. Dependency is independent. 
  - The field type is "enum" ['string', 'number', 'object', 'array', 'boolean']. 
  - The field widget is "select/dropdown".
- "generator" 
  - is an object with a set of dependent fields. 
  - Always contains an enum "type" field. The field name is not editable and permanent. 
  - Dependency - the set of nested enum values of the "type" field depends on the "js_type" value. 
  - The field type is "object". The field widget is "Dict". 
  - Rules: 
    1. "js_type: string" - generator.type: ```["sample", "code", "date", "foreign", "enum", "zip", "ip", "phone", "uuid" ]```
    2. "js_type: number" - generator.type: ```["integer", "enum"]```
    3. "js_type: array" - generator.type: ```["array", "enum"]``` 
    4. "js_type: object" - generator.type: ```["object", "enum"]```
    5. "js_type: boolean" - generator.type: ```["enum"]```

- "type" 
  - the main field of the "generator" field, the value of which determines the set of neighboring fields or their absence. The field value type is always a string. The field type is "enum". Dependency - the set of enum values depends on the "js_type" value. The field widget is "select/dropdown". 
  - rules: 
    1. "type: sample" - ```{type: string, sample: string}``` 
    2. "type: code" - ```{type: string, upper: boolean, length: number}```
    3. "type: date" - ```{type: string, format: string, min_year: number, max_year: number}``` 
    4. "type: foreign" - ```{type: string, dataset: enum, field: enum}``` 
    5. "type: enum" - ```{type: string, values: array}``` 
    6. "type: zip" - ```{type: string}``` 
    7. "type: ip" - ```{type: string}``` 
    8. "type: phone" - ```{type: string}``` 
    9. "type: uuid" - ```{type: string}``` 
    10. "type: integer" - ```{type: string, unique: boolean, to_str: boolean}``` 
    11. "type: array" - ```{type: string, occurrence_min: number, occurrence_max: number}``` 
    12. "type: object" - ```{type: string}```








# description with JSON-Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "js_type": {
      "type": "string",
      "enum": [
        "string",
        "array",
        "boolean",
        "object",
        "number"
      ]
    },
    "generator": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        }
      }
    }
  },
  "dependencies": {
    "js_type": {
      "oneOf": [
        {
          "properties": {
            "js_type": {
              "enum": [
                "string"
              ]
            },
            "generator": {
              "properties": {
                "type": {
                  "enum": [
                    "sample",
                    "code",
                    "date",
                    "foreign",
                    "enum",
                    "zip",
                    "ip",
                    "phone",
                    "uuid"
                  ]
                }
              },
              "required": [
                "type"
              ],
              "dependencies": {
                "type": {
                  "oneOf": [
                    {
                      "properties": {
                        "type": {
                          "enum": [
                            "sample"
                          ]
                        },
                        "sample": {
                          "type": "string",
                          "enum": [
                            "name",
                            "cities"
                          ]
                        }
                      },
                      "required": [
                        "sample"
                      ]
                    },
                    {
                      "properties": {
                        "type": {
                          "enum": [
                            "code"
                          ]
                        },
                        "upper": {
                          "type": "boolean"
                        },
                        "length": {
                          "type": "number"
                        }
                      },
                      "required": [
                        "upper",
                        "length"
                      ]
                    },
                    {
                      "properties": {
                        "type": {
                          "enum": [
                            "date"
                          ]
                        },
                        "format": {
                          "type": "string"
                        },
                        "min_year": {
                          "type": "number"
                        },
                        "max_year": {
                          "type": "number"
                        }
                      },
                      "required": [
                        "format",
                        "min_year",
                        "max_year"
                      ]
                    },
                    {
                      "properties": {
                        "type": {
                          "enum": [
                            "foreign"
                          ]
                        },
                        "dataset": {
                          "type": "string",
                          "enum": [
                            "click_open_raw"
                          ]
                        },
                        "field": {
                          "type": "string",
                          "enum": [
                            "delivery_log"
                          ]
                        }
                      },
                      "required": [
                        "dataset",
                        "field"
                      ]
                    },
                    {
                      "properties": {
                        "type": {
                          "enum": [
                            "enum"
                          ]
                        },
                        "values": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        }
                      },
                      "required": [
                        "values"
                      ]
                    },
                    {
                      "properties": {
                        "type": {
                          "enum": [
                            "zip"
                          ]
                        }
                      }
                    },
                    {
                      "properties": {
                        "type": {
                          "enum": [
                            "ip"
                          ]
                        }
                      }
                    },
                    {
                      "properties": {
                        "type": {
                          "enum": [
                            "phone"
                          ]
                        }
                      }
                    },
                    {
                      "properties": {
                        "type": {
                          "enum": [
                            "uuid"
                          ]
                        }
                      }
                    },
                    {
                      "properties": {
                        "type": {
                          "enum": [
                            "integer"
                          ]
                        },
                        "unique": {
                          "type": "boolean"
                        },
                        "to_str": {
                          "type": "boolean"
                        }
                      },
                      "required": [
                        "unique",
                        "to_str"
                      ]
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "properties": {
            "js_type": {
              "enum": [
                "number"
              ]
            },
            "generator": {
              "properties": {
                "type": {
                  "enum": [
                    "integer",
                    "enum"
                  ]
                }
              },
              "required": [
                "type"
              ],
              "dependencies": {
                "type": {
                  "oneOf": [
                    {
                      "properties": {
                        "type": {
                          "enum": [
                            "integer"
                          ]
                        },
                        "unique": {
                          "type": "boolean"
                        },
                        "to_str": {
                          "type": "boolean"
                        }
                      },
                      "required": [
                        "unique",
                        "to_str"
                      ]
                    },
                    {
                      "properties": {
                        "type": {
                          "enum": [
                            "enum"
                          ]
                        },
                        "values": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        }
                      },
                      "required": [
                        "values"
                      ]
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "properties": {
            "js_type": {
              "enum": [
                "array"
              ]
            },
            "generator": {
              "properties": {
                "type": {
                  "enum": [
                    "array",
                    "enum"
                  ]
                }
              },
              "required": [
                "type"
              ],
              "dependencies": {
                "type": {
                  "oneOf": [
                    {
                      "properties": {
                        "type": {
                          "enum": [
                            "array"
                          ]
                        },
                        "occurrence_min": {
                          "type": "integer"
                        },
                        "occurrence_max": {
                          "type": "integer"
                        }
                      },
                      "required": [
                        "occurrence_min",
                        "occurrence_max"
                      ]
                    },
                    {
                      "properties": {
                        "type": {
                          "enum": [
                            "enum"
                          ]
                        },
                        "values": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        }
                      },
                      "required": [
                        "values"
                      ]
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "properties": {
            "js_type": {
              "enum": [
                "object"
              ]
            },
            "generator": {
              "properties": {
                "type": {
                  "enum": [
                    "object",
                    "enum"
                  ]
                }
              },
              "required": [
                "type"
              ],
              "dependencies": {
                "type": {
                  "oneOf": [
                    {
                      "properties": {
                        "type": {
                          "enum": [
                            "object"
                          ]
                        }
                      },
                      "required": [
                        "type"
                      ]
                    },
                    {
                      "properties": {
                        "type": {
                          "enum": [
                            "enum"
                          ]
                        },
                        "values": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        }
                      },
                      "required": [
                        "values"
                      ]
                    }
                  ]
                }
              }
            }
          }
        },
        {
          "properties": {
            "js_type": {
              "enum": [
                "boolean"
              ]
            },
            "generator": {
              "properties": {
                "type": {
                  "enum": [
                    "enum"
                  ]
                }
              },
              "required": [
                "type"
              ],
              "dependencies": {
                "type": {
                  "oneOf": [
                    {
                      "properties": {
                        "type": {
                          "enum": [
                            "enum"
                          ]
                        },
                        "values": {
                          "type": "array",
                          "items": {
                            "type": "string"
                          }
                        }
                      },
                      "required": [
                        "values"
                      ]
                    }
                  ]
                }
              }
            }
          }
        }
      ]
    }
  }
}
```
