# Usage

If you have registered the plugin, the global component for the renderer is available by default.<br>
All nodes are predefined and have a default rendering definition (except your custom components).

::: tip Customize rendering
If you want to customize how a specific node gets rendered, have a look into the [Config Reference](/vue-plugin/config/).
:::

::: warning
The object you'll need to pass to the renderer **isn't** the top-level data you fetch from the Storyblok API.
Maybe it's in a sub sub sub object like `data.data.story.content.myDocument`. 

**The object you'll need to pass to the renderer *must be* a renderable node e.g. a document with property `type: doc` or any other node of your document.**<br>
:::

::: tip Renderer Component
See the [Renderer Component](/vue-plugin/config#renderer-component) config reference for more information about the available props.
:::

**The template is always the same for all use-cases below:** :point_down:

``` vue
<template>
  <div>
    <rich-text-renderer v-if="doc" :document="doc" />
  </div>
</template>
```

## With global component

With the default behavior you just have to pass your rich-text document object from Storyblok as a prop to the renderer component.
You have disabled the global behavior? Check [below](#without-global-component). :arrow_down:

**MyComponent.vue**:

``` vue
<script>
export default {
  data () {
    return {
      doc: { 
        // Your rich-text document from Storyblok
      }
    }
  }
}
</script>
```

## Without global component

::: warning Side note
Set the option `global: false` otherwise you'll end up registering the component twice.
:::

**MyComponent.vue**:

``` vue
<script>
import RichTextRenderer from '@marvinrudolph/vue-storyblok-rich-text-renderer'

export default {
  components: {
    RichTextRenderer
  },
  data () {
    return {
      doc: { 
        // Your rich-text document from Storyblok
      }
    }
  }
}
</script>
```

## With Composition API

::: tip
The plugin uses the [Composition API Plugin](https://github.com/vuejs/composition-api) for the renderer component and also for developing.
I would highly recommend to use it too because the renderer is written as a composable function e.g. `useRenderer`.

**But it also works without and you can use whatever you want. It's just a friendly recommendation and style opinion.** :blush::sparkles:
:::

**MyComponent.vue**:

``` vue
<script>
import { createElement } from '@vue/composition-api'

export default createElement({
  setup () {
    const doc = ref({
      // Your rich-text document from Storyblok
    })

    return {
      doc
    }
  }
})
</script>
```

::: tip Need an example?
Check out the Composition API [example](/vue-plugin/examples#composition-api). :construction:
:::

## With Nuxt.js :green_heart:

::: tip
You can use and implement this plugin like every other Vue.js plugin in Nuxt.js.<br>
Read more about [Nuxt.js plugin](https://nuxtjs.org/guide/plugins).
:::

1. Create a file named `rich-text-renderer.js` in the `plugins/` directory and register the plugin like [above](#with-global-component) :arrow_up: with `Vue.use()`.
2. Add it to the `plugins` property in your `nuxt.config.js`.

**If you use TypeScript don't forget to change `.js` to `.ts`.**

``` js
// nuxt.config.js
{
  // [...] other config
  plugins: [
    '~/plugins/rich-text-renderer.js'
  ]
}
```

**Congrats!** :tada: You have successfully implemented the plugin! :blush:
