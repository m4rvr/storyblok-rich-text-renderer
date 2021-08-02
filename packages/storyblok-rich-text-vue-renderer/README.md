# @marvr/storyblok-rich-text-vue-renderer

> Vue 3 plugin for rendering the rich-text content.

## Installation

```bash
yarn add @marvr/storyblok-rich-text-vue-renderer@next
# or
npm install @marvr/storyblok-rich-text-vue-renderer@next
```

## Usage

### Register the plugin
```ts
import { createApp } from 'vue';
import App from './App.vue';
import { plugin } from '@marvr/storyblok-rich-text-vue-renderer';

const app = createApp(App);
app.use(plugin(/* options */));
app.mount('#app');
```

### Use the renderer component

```html
<script lang="ts">
import { defineComponent, shallowReactive } from 'vue';
import { RichTextRenderer } from '@marvr/storyblok-rich-text-vue-renderer';

export default defineComponent({
    components: {
        RichTextRenderer
    },
    setup() {
        const doc = shallowReactive(
            // fetched document from Storyblok API
        );

        return { doc }
    }
})
</script>
<template>
    <RichTextRenderer :document="doc">
</template>
```

### Directly use the function

```html
<script lang="ts">
import { defineComponent, shallowReactive } from 'vue';
import { useRenderer } from '@marvr/storyblok-rich-text-vue-renderer';

export default defineComponent({
    components: {
        RichTextRenderer
    },
    setup() {
        const renderer = useRenderer();
        const doc = shallowReactive(
            // fetched document from Storyblok API
        );

        const renderedDocument = renderer.renderDocument(doc);
    }
})
</script>
```