# @marvr/storyblok-rich-text-vue-renderer :zap:

Vue.js plugin for rendering the rich-text content.

## Important :warning:

This plugin needs the [Composition API](https://github.com/vuejs/composition-api) to work.
Please install it before you use the plugin. :blush:

## Getting started :rocket:

### 1. Install @vue/composition-api

```bash
yarn add @vue/composition-api
# or
npm install @vue/composition-api
```

### 2. Install @marvr/storyblok-rich-text-vue-renderer

```bash
yarn add @marvr/storyblok-rich-text-vue-renderer
# or
npm install @marvr/storyblok-rich-text-vue-renderer
```

> This also installs [@marvr/storyblok-rich-text-types](../storyblok-rich-text-types) so you don't need it to install it separately.

## Usage :joystick:

1. Install the Composition API and the plugin like described above :point_up:.
2. Register `@vue/composition-api` **BEFORE** the plugin with `Vue.use()`.
3. Register the plugin with `Vue.use()` after that.
4. Use the `<rich-text-renderer />` component to render your Storyblok document.
5. **Don't know how or want to see examples? See full documentation below :point_down:**.

## Documentation :notebook_with_decorative_cover:

The full documentation can be found [here](https://storyblok-rich-text-renderer.netlify.com/).

