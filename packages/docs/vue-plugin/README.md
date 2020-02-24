# Vue.js Plugin

This plugin gives you a simple & fast way to render rich text content from Storyblok in Vue.js.<br>
Currently Storyblok provides the [Rich Text Resolver](https://www.storyblok.com/docs/richtext-field#vue-js) for that but needs the [Vue.js Runtime Compiler](https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only) for the [Inline Components](https://www.storyblok.com/docs/richtext-field#javascript-sdk) which results in a bigger bundle size. 

To avoid this I wrote this plugin which doesn't require the Runtime Compiler because everything will be rendered via [Render Functions/JSX/TSX](https://vuejs.org/v2/guide/render-function.html). :star2:

## Installation :cd:

Add it to your dependencies with a package manager :package::

``` bash
npm install @marvinrudolph/vue-storyblok-rich-text-renderer
# OR
yarn add @marvinrudolph/vue-storyblok-rich-text-renderer
```

## Configuration :wrench:

This registers a global renderer component which can then be used in any kind of component.

::: tip Disable global component
If you want to disable the global component and want to import where you need it just set the option `global: false`.
:::

``` js
import Vue from 'vue'
import RichTextRenderer from 'vue-storyblok-rich-text-renderer'

// Simple
Vue.use(RichTextRenderer)

// With options
Vue.use(RichTextRenderer, {
  // Options
})
```

::: tip Available Options
Check out the [Config Reference](/vue-plugin/config/) for available options.
:::
