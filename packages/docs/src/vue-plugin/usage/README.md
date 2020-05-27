# Usage

If you have registered the plugin, the global component for the renderer is available by default.<br>
All nodes are predefined and have a default rendering definition (except your custom components).

::: warning
The object you'll need to pass to the renderer **isn't** the top-level data you fetch from the Storyblok API.
Maybe it's in a sub sub sub object like `data.data.story.content.myDocument`. 

**The object you'll need to pass to the renderer *must be* a renderable node e.g. a document with property `type: doc` or any other node of your document.**<br>
:::

## With JavaScript

```vue
<script>
import { ref } from '@vue/composition-api';

export default {
  setup () {
    const doc = ref({
      // Your rich-text document from Storyblok
    });
    
    return {
      doc
    }
  }
};
</script>

<template>
  <div>
    <rich-text-renderer v-if="doc" :document="doc" />
  </div>
</template>
```

## With TypeScript

```vue
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  setup () {
    const doc = ref({
      // Your rich-text document from Storyblok
    });
    
    return {
      doc
    }
  }
});
</script>

<template>
  <div>
    <rich-text-renderer v-if="doc" :document="doc" />
  </div>
</template>
```

## With Nuxt.js :green_heart:

::: tip
You can use and implement this plugin like every other Vue.js plugin in Nuxt.js.<br>
**But you need to add the @vue/composition-api as a plugin before it.**

Read more about [Nuxt.js plugins](https://nuxtjs.org/guide/plugins).
:::

1. Create a file named `composition-api.js` in the `plugins/` directory and register the plugin with `Vue.use()` like described [here](../#configuration).
2. Do the same with the renderer plugin but with in a separate file `rich-text-renderer.js`.
3. Add it to the `plugins` property in your `nuxt.config.js`/`nuxt.config.ts`.
4. **IMPORTANT:** `composition-api.js` needs to be **BEFORE** your `rich-text-renderer.js`.

``` js
// nuxt.config.js
{
  // [...] other config
  plugins: [
    '~/plugins/composition-api.js',
    '~/plugins/rich-text-renderer.js'
  ]
}
```

Your files should look like this:

**composition-api.js:**

```js
import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);
```

**rich-text-renderer.js:**

```js
import Vue from 'vue';
import VueRichTextRenderer from '@marvr/storyblok-rich-text-vue-renderer';

Vue.use(VueRichTextRenderer);
```

**Congrats!** :tada: You have successfully implemented the plugin! :tada:
