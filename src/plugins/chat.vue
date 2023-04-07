<template>
  <div>
    <component v-for="(field, name) in fields"
               :key="name"
               :is="getFieldComponent(field)"
               :name="name"
               :value="getValue(name)"
               :validation="field.validation"
               :items="field.items">
    </component>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    fields: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getFieldComponent(field) {
      // Determine which component to use based on the field's widget type
      switch (field.widget) {
        case 'filename':
          return 'FilenameField';
        case 'text':
          return 'TextField';
        case 'list':
          return 'ListField';
        case 'dict':
          return 'DictField';
        case 'enum':
          return 'EnumField';
        case 'checkbox':
          return 'CheckboxField';
        case 'hardcode':
          return 'HardcodeField';
        default:
          throw new Error(`Unknown widget type: ${field.widget}`);
      }
    },
    getValue(name) {
      // Get the value for a field by name
      // This could come from a Vuex store or component state
      return '';
    },
  },
});
</script>

<!-- В этом примере компонент принимает объект fields, который представляет собой структуру YAML-файла. Внутри шаблона мы используем директиву v-for для создания компонента для каждого поля. Мы используем функцию getFieldComponent, чтобы определить, какой компонент использовать для каждого поля на основе его типа виджета. Для каждого поля мы передаем имя, значение, валидацию и элементы, если это список или словарь.

В функции getFieldComponent мы используем оператор switch, чтобы определить, какой компонент использовать для каждого типа виджета. Мы можем добавлять новые виджеты и соответствующие им компоненты, когда это необходимо.

Компоненты, такие как TextField, ListField и DictField, могут быть реализованы как дочерние компоненты этого компонента, и они будут созданы рекурсивно для вложенных полей. Если поле имеет тип list или dict, мы передаем элементы этого списка или словаря в качестве свойства items для создания соответствующих компонентов.

Таким образом, приложение может генерировать интерфейс на основе структуры YAML-файла, используя рекурсивную функцию, которая создает соответствующие компоненты Vue 3 для каждого поля. -->

<!-- В функции createComponent мы передаем параметр field, который содержит информацию о конкретном поле в структуре файла YAML. Внутри функции мы проверяем тип поля и создаем соответствующий компонент Vue 3, используя директиву v-if.

Например, если поле имеет тип text, мы создаем компонент input с типом text, а если тип поля list, мы создаем компонент списка (List.vue), который будет содержать другие компоненты, созданные рекурсивно для каждого элемента списка.

В конце функции мы возвращаем созданный компонент, который будет добавлен в родительский компонент.

Вот пример функции createComponent: -->

function createComponent(field) {
  const widget = field.widget;
  const items = field.items;

  if (widget === "text") {
    return {
      template: `
        <div>
          <label>{{ label }}</label>
          <input type="text" v-model="value" />
        </div>
      `,
      props: ["label", "value"],
    };
  } else if (widget === "list") {
    return {
      template: `
        <div>
          <label>{{ label }}</label>
          <list :items="value" :create-component="createComponent" />
        </div>
      `,
      props: ["label", "value", "createComponent"],
      components: {
        List,
      },
      created() {
        this.$emit("create-component", items);
      },
    };
  } else {
    return {
      template: `
        <div>
          <label>{{ label }}</label>
          <div>Widget not implemented</div>
        </div>
      `,
      props: ["label"],
    };
  }
}

Здесь мы используем директиву v-if для проверки типа поля и создания соответствующего компонента. В примере выше мы создаем компонент для поля типа text или для поля типа list (используя компонент List.vue). Если тип поля не поддерживается, мы выводим сообщение об ошибке.

Таким образом, при вызове функции createComponent для каждого поля в структуре файла YAML мы будем получать соответствующий компонент Vue 3.



как сгенерировать интерфейс с помощью vue 3, Pinia - state manager,  на основе индексного файла:
version: 1  # change version when file is changed
module: # module is core, but we can have few more entities # type Array
  - name: raw datasets # name of module
    description: just an example for raw dataset structure # description of module
    data: # structure of module
      name: 
        widget: filename # help to set up filename, should be mandatory
        validation: 
          regexp: '^[a-zA-Z0-9\s._-]+$'
          unique: true
      description: 
        widget: text  # text input
        validation: 
          regexp: '^[a-zA-Z0-9\s._-]+$'
          unique: false 
      group:
        widget: text # text input
        validation: 
          regexp: '^[a-zA-Z0-9\s._-]+$'
          unique: false
      fields: 
        widget: list # there is an array of another widget
        items: 
          - field:
              widget: dict # there is a object of other widgets
              key: # define key name rule
                widget: text # text input
                validation:
                  regexp: '^[a-zA-Z0-9\s._-]+$'
                  unique: true
              items: # maybe best way use type not Array and set type like type in file - Object
                js_type:
                    widget: enum # dropdown/select of values
                    values:
                      - string
                      - number
                      - object
                      - array
                      - boolean
                optional:
                    widget: checkbox # simple boolean checkbox controler
                db_type: 
                    widget: enum # dropdown/select of mapping
                    mapping:
                      js_type: # name of widget to map
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
                generator: 
                  widget: dict # there is a object of other widgets
                  key: # define key name rule
                    widget: hardcode # use "generator" value if widget is hardcode
                  items: 
                    type:
                      widget: enum # dropdown/select of values
                      values:
                        - zip
                        - sample
                        - ip
                    sample:
                      widget: enum # dropdown/select of mapping
                      mapping:
                        type: 
                          sample:
                            - email
                            - name