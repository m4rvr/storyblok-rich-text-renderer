# Configuration Reference

## Plugin Options

### resolvers
- Type: `object`
- Default: `{}` :point_down:

::: tip Default Resolvers
Resolvers will be merged with the default configuration.
If you don't configure something it will completely fall back to the default ones which can be found [here](/vue-plugin/resolvers). :muscle:
:::

### global
- Type: `boolean`
- Default: `true`

Whether the `<rich-text-renderer />` component should be available globally or not.<br>

::: warning
You'll need to import it in *every* component where you need it if you set this option to `false`.
:::

## Renderer Component

You can use the renderer component either as `<rich-text-renderer />` or `<RichTextRenderer />`.<br>
I would recommend to use the former because only kebab-case names are valid directly in the DOM. :v:
Read more about that [here](https://vuejs.org/v2/guide/components-registration.html#Name-Casing).

### document
- Type: `object` | `array`
- Default: `undefined`
- Required: `true`

Rich-text node from Storyblok which should be rendered. You can pass either a complete document, single node or an array with nodes.

### options
- Type: `object`
- Default: `{}`
- Required: `false`

You can override your options like resolvers for a single instance of the renderer. Same syntax & behavior like [Plugin Options](#plugin-options).
