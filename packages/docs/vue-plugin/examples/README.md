# Examples

Here are some examples how to fetch the document with the Storyblok API and use it for the renderer.

The code is simplified and reduced so it might be not the best and :100:% perfect structure for your project.
It's just a demonstration on how it *could* be used and **not** how it *should* be used in every case.
Feel free to adjust, change or replace it in your app. :blush::v:

::: warning Requirements for fetching
The examples here depend on either [storyblok-js-client](https://github.com/storyblok/storyblok-js-client) or [storyblok-nuxt](https://github.com/storyblok/storyblok-nuxt).
They are used for fetching the rich-text document from Storyblok.

**I think you'll certainly already use one of the packages in your app to fetch some other content from Storyblok.** :blush:
:::

::: warning Side note for using the component
For simplicity purposes I'm using the global component in all in the examples so I don't have to import it in each one. 
:::

::: danger Important when fetching
The content (or the *story*) I'm fetching here from Storyblok has the name `rich-text` with a property `text`.
That's why I'm fetching from `cdn/stories/rich-text` and have a property in the `content` object with the name `text`.

**Your story has probably a different name (+ path?) and schema. So change that accordingly.**
:::

## Generic fetched document

**MyComponent.vue:**

``` vue
<template>
  <div>
    <rich-text-renderer v-if="doc" :document="doc" />
  </div>
</template>

<script>
import StoryblokClient from 'storyblok-js-client'

export default {
  data () {
    return {
      doc: undefined
    }
  },
  async created () {
    const Storyblok = new StoryblokClient({
      accessToken: <YOUR_ACCESS_TOKEN>
    })

    try {
      const { data } = await Storyblok.get('cdn/stories/rich-text')
      // `text` property is the one I defined in Storyblok which holds the rich-text content
      this.doc = data.story.content.text
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
```

## Composition API

**MyComponent.vue:**

``` vue
<template>
  <div>
    <rich-text-renderer v-if="doc" :document="doc" />
  </div>
</template>

<script>
import { createComponent } from '@vue/composition-api'
import StoryblokClient from 'storyblok-js-client'

export default createComponent({
  setup () {
    // Create reactive variable
    const doc = ref(undefined)

    // Create an instance of StoryblokClient
    const Storyblok = new StoryblokClient({
      accessToken: <YOUR_ACCESS_TOKEN>
    })

    // Fetch the document from Storyblok and return it
    function async fetchDocument () {
      try {
        const { data } = await Storyblok.get('cdn/stories/rich-text')
        return data.story.content.text
      } catch (error) {
        console.error(error)
      }
    }

    // Set the received data as the value
    doc.value = await fetchDocument()

    // Return it to the template
    return {
      doc
    }
  }
})
</script>
```

## Nuxt.js :green_heart:

::: warning Nuxt.js module
This one uses the `storyblok-nuxt` module and I assume that you've already registered & configured it in your `nuxt.config.js` like described [here](https://github.com/storyblok/storyblok-nuxt#readme).
:::

**/components/MyComponent.vue:**

``` vue
<template>
  <div>
    <rich-text-renderer v-if="doc" :document="doc" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      doc: undefined
    }
  },
  asyncData ({ app }) {
    try {
      const { data } = await Storyblok.get('cdn/stories/rich-text')

      return {
        doc: data.story.content.text
      }
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
```
