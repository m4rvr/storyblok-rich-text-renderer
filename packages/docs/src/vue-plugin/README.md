# Vue.js Plugin

This plugin gives you a simple & fast way to render rich text content from Storyblok in Vue.js.

## Installation :cd:

### 1. Install @vue/composition-api

``` bash
yarn add @vue/composition-api
# or
npm install @vue/composition-api
```

### 2. Install @marvr/storyblok-rich-text-vue-renderer

``` bash
yarn add @marvr/storyblok-rich-text-vue-renderer
# or
npm install @marvr/storyblok-rich-text-vue-renderer
```

## Configuration :wrench:

```js
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import VueRichTextRenderer from '@marvr/storyblok-rich-text-vue-renderer';

// Register Composition API
Vue.use(VueCompositionApi);

// Simple ...
Vue.use(VueRichTextRenderer);

// ... or with options
Vue.use(VueRichTextRenderer, {
  // Options
});
```

::: tip Availablabe Options
Check out the [Config Reference](/vue-plugin/config/) for available options.
:::

::: warning Important
The Composition API needs to be registered **BEFORE** the plugin.
:::
