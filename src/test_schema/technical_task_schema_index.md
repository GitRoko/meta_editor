# TT

Потрібно розробити програму, яка динамічно відображає структуру yaml файлів і надає можливість читання, редагування та додавання даних у відповідності до логіки структури даних.

У папці з даними у форматі yaml є файл index.yaml, який описує структуру та логіку файлів даних.

У програмі потрібно реалізувати можливість читання/створення/редагування/збереження файлів, відображення списку файлів у папці.

Повинна бути присутня сторінка, в якій при виборі файлу будуть відображатися дані в зручному і структурованому вигляді користувачеві, з можливістю редагування/зміни/додавання в реальному часі. Відображення даних має відбуватися динамічно, спираючись на структуру та логіку, описану в index.yaml.

Потрібно реалізувати сторінку-конструктор у програмі, яка працюватиме з index.yaml. Тобто. буде відображати структуру даних у зручному та структурованому вигляді користувачеві, з можливістю редагування та створення нових структур із логікою залежності полів від інших полів.

Також потрібно валідувати дані.

Також дані можуть вкладатися одна в одну. Логіку описано нижче у розділі [Nested fields](#nested-fields)

## General field structure

---

## "type" dependent examples:

### "js_type": string - select with options:

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
    format: '%Y-%m-%d' # "type" dependent input type text
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

### "js_type": number - select with options:

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

### "js_type": array - select with options:

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
    values: [['default_array'], ['default_array']] # "type" dependent widget Values?
```

### "js_type": object - select with options:

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
    values: [{ 'default': 'object' }, { 'default': 'object' }] # "type" dependent widget Values?
```

### "js_type": boolean - select with options:

```yaml
default_field_1:
  js_type: boolean
  generator:
    type: enum # "js_type" dependent select
    values: [true, false] # "type" dependent widget Values?
```

### Nested fields

#### (js_type: object or js_type: array):

Поле може мати лише вкладені поля, якщо "js_type" є "object" або "array". Поля вкладено в додаткове поле "object" або "array", залежно від типу поля "js_type". Вкладені поля можуть бути будь-якого типу? (тількі "object"). Вкладені поля можуть мати необмежений рівень вкладеності. Якщо "js_type: array", то вкладені поля без імені поля.

#### Nested fields examples:

```yaml
default_field_1:
  js_type: object
  object:
    default_field_2:
      js_type: string
      generator:
        type: sample # "js_type" dependent select
        sample: name # "type" dependent dropdown ['name', 'cities', ...]
    default_field_3:
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
    js_type: string
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

- складається з ключа та властивостей поля. містить обов'язкове поле "js_type".
- default_field_1 - назва поля або "id" поля, має бути унікальним, може бути відсутнім, якщо поле є вкладеним полем у поле, де "js_type: array".
- Є ключем до об'єкта властивостей поля.
- Цінність завжди є об'єктом.
- Поле віджета "Dict".

## field propertys:

- "js_type"
  - основне поле, значення якого залежать від значень суміжних і вкладених полів.
  - Тип значення поля завжди є рядком. Залежність незалежна.
  - Тип поля: "enum" ['string', 'number', 'object', 'array', 'boolean'].
    — Віджет поля — "select/dropdown".
- "generator"

  - це об'єкт з набором залежних полів.
  - Завжди містить поле типу enum. Назва поля не редагується та є постійною.
  - Залежність - набір вкладених значень enum поля "type" залежить від значення "js_type".
    – Тип поля – "object". Поле віджета «Dict».
  - Rules:
    1. "js_type: string" - generator.type: `["sample", "code", "date", "foreign", "enum", "zip", "ip", "phone", "uuid" ]`
    2. "js_type: number" - generator.type: `["integer", "enum"]`
    3. "js_type: array" - generator.type: `["array", "enum"]`
    4. "js_type: object" - generator.type: `["object", "enum"]`
    5. "js_type: boolean" - generator.type: `["enum"]`

- "type"
  - основне поле поля "генератор", значення якого визначає набір сусідніх полів або їх відсутність. Тип значення поля завжди є рядком. Тип поля — «enum». Залежність - набір значень enum залежить від значення "js_type". Віджет поля є "select/dropdown".
  - rules:
    1. "type: sample" - `generator: {type: string, sample: string}`
    2. "type: code" - `generator: {type: string, upper: boolean, length: number}`
    3. "type: date" - `generator: {type: string, format: string, min_year: number, max_year: number}`
    4. "type: foreign" - `generator: {type: string, dataset: enum, field: enum}`
    5. "type: enum" - `generator: {type: string, values: array}`
    6. "type: zip" - `generator: {type: string}`
    7. "type: ip" - `generator: {type: string}`
    8. "type: phone" - `generator: {type: string}`
    9. "type: uuid" - `generator: {type: string}`
    10. "type: integer" - `generator: {type: string, unique: boolean, to_str: boolean}`
    11. "type: array" - `generator: {type: string, occurrence_min: number, occurrence_max: number}`
    12. "type: object" - `generator: {type: string}`

# Test FULL yaml schema

## visible & mapping logics

- "mapping" описуємо залежність значення поля та вказуємо значення для залежного поля(так саме як в ENUM)
- "visible" описуємо залежність відображення поля та вказуємо прі яких значеннях того поля ми відображаєм поле, якщо кілька значень, то можно обгорнути у масив одразу
- "required" - описуємо обов'язкові поля для рендеру у філді, інші поля рендеряться за логікою у "visible".

Приклад:

```yaml
- name: 'generator'
    widget: dict
    key:
      widget: hardcode
    required:
      - type
    items:
      - name: to_str
        widget: checkbox
        mapping:
          js_type:
            string: true # if js_type: string => to_str: true
            number: false # if js_type: number => to_str: false
        visible:
          type: [‘integer’, ‘some_value’, …] # if type: integer || type: some_value => field is visible
```

```yaml
version: 1
module:
  - name: raw datasets
    description: just an example for raw dataset structure
    data:
      - name: 'name'
        widget: filename
        validation:
          regexp: '^[a-zA-Z0-9_]+\.yaml$'
          unique: true
      - name: 'description'
        widget: text
        validation:
          regexp: '.*'
          unique: false
      - name: 'group'
        widget: text
        validation:
          regexp: '.*'
          unique: false
      - name: 'fields'
        widget: list
        items:
          - name: 'field'
            widget: dict
            key:
              widget: text
              validation:
                regexp: '^[a-zA-Z0-9_]+$'
                unique: true
            required:
              - 'js_type'
              - 'optional'
              - 'db_type'
              - 'description'
              - 'generator'
            items:
              - name: 'js_type'
                widget: enum
                values:
                  - string
                  - number
                  - object
                  - array
                  - boolean
              - name: 'optional'
                widget: checkbox
              - name: 'db_type'
                widget: enum
                mapping:
                  js_type:
                    string:
                      - varchar
                    number:
                      - bigint
                      - double
                    array:
                      - varchar
                    object:
                      - varchar
                    boolean:
                      - varchar
              - name: 'description'
                widget: text
                validation:
                  regexp: '.*'
                  unique: false
              - name: 'generator'
                widget: dict
                key:
                  widget: hardcode
                required:
                  - type
                items:
                  - name: 'type'
                    widget: enum
                    mapping:
                      js_type:
                        string:
                          - sample
                          - code
                          - integer
                          - enum
                          - foreign
                          - zip
                          - uuid
                          - phone
                          - ip
                        number:
                          - integer
                          - enum
                        array:
                          - array
                          - enum
                        object:
                          - object
                          - enum
                        boolean:
                          - enum
                  - name: upper
                    widget: checkbox
                    visible:
                      type:
                        - 'code'
                  - name: 'sample'
                    widget: enum
                    values:
                      - addresses
                      - cities
                      - emails
                      - firstnames
                      - lastnames
                      - names
                      - products
                      - urls
                      - words
                    visible:
                      type:
                        - 'sample'
                  - name: length
                    widget: number
                    visible:
                      type:
                        - 'code'
                  - name: unique
                    widget: checkbox
                    visible:
                      type: 'integer'
                  - name: to_str
                    widget: checkbox
                    mapping:
                      js_type:
                        string: true
                        number: false
                    visible:
                      type: 'integer'
                  - name: values
                    widget: list # or hardcodeList
                    visible:
                      type: 'enum'
                  - name: occurrence_min
                    widget: number
                    visible:
                      type: 'array'
                  - name: occurrence_max
                    widget: number
                    visible:
                      type: 'array'
                  - name: dataset
                    widget: table # or hardcodeEnum
                    visible:
                      type: 'foreign'
                  - name: field
                    widget: table # or hardcodeEnum
                    visible:
                      type: 'foreign'
```
