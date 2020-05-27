# Examples

## Render custom components

Before the renderer renders your custom component, you need to register it. Otherwise a fallback component is rendered with the text that your component can't be found.

You can register your custom Storyblok component by adding it to the resolvers in the plugin configuration.

In your main file where you register the plugin e.g. `main.js`:

```js
import Vue from 'Vue';
import VueCompositionApi from '@vue/composition-api';
import VueRichTextRenderer from '@marvr/storyblok-rich-text-vue-renderer';
import MyVueComponent from './path/to/components/MyVueComponent.vue';

Vue.use(VueCompositionApi);
Vue.use(VueRichTextRenderer, {
  resolvers: {
    components: {
      myCustomComponent: MyVueComponent
    }
  }
});
```

- The key `myCustomComponent` is the **Technical name** which you define in your Storyblok component schema.
- `MyVueComponent` is the imported Vue component
