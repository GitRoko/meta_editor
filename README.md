# meta_editor

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
### Test mind about Dict widget

Приклад dict widget:
```yaml
field:
  widget: dict
  key: # ключ об'єкта
    widget: text # віджет для ключа об'єкта text(editable) або hardcode(uneditable)
    validation:
      regexp: '^[a-zA-Z0-9_]+$'
      unique: true
  items: # list of items
    - js_type: 
```
Props of dict widget:
```js
props = {
  // дані елемента
  modelValue: {
    type: Object,
    required: true,
  },
  // дані батьківського елемента для умов залежності
  parent: {
    type: Object,
    required: true,
  },
  // дані для валідації ключа на унікальність
  parentKeyList: {
    type: Array,
    required: true,
  },
}
```