# Configuration Reference

## Plugin Options

### resolvers

- Type: `object`
- Default: `{}` See below :point_down:

::: tip Default Resolvers
Resolvers will be merged with the default configuration.
If you don't configure something it will completely fall back to the default ones which can be found [here](/vue-plugin/resolvers). :muscle:
:::

Each type of resolver is separated into it's own property in this object which looks like this:

```js
{
  resolvers: {
    blocks: {
      // All blocks
    },
    marks: {
      // All marks
    },
    components: {
      // All custom Storyblok components by technical-name
    }
  }
}
```

To use your custom component for example for a paragraph (which is a block) you simply import `Block` from the `@marvr/storyblok-rich-text-types` package and use it with `Block.PARAGRAPH` as a key in `resolvers.blocks`:

::: tip What is `Block` and what `Mark`?
To see which node is a Block and which one is a Mark you can check all available [resolvers](/vue-plugin/resolvers).

**TL;DR:** Block elements like `<p>` or `<h1>` are `Blocks`, where inline elements like `<strong>` are `Marks`.
:::

```js
import { Block } from '@marvr/storyblok-rich-text-types';
import MyCustomParagraph from './path/to/components/MyCustomParagraph.vue';

{
  resolvers: {
    blocks: {
      [Block.PARAGRAPH]: MyCustomParagraph
    }
  }
}
```

Now every `Paragraph` node from Storyblok will be rendered as your defined `MyCustomParagraph.vue`. Really cool huh? :yum:

### componentName
- Type: `string`
- Default: `RichTextRenderer`

If the name should ever collide with a already registered component in your project, you can change it with this option.

**NOTE:** This will affect the name of the global component `<rich-text-renderer />`/`<RichTextRenderer />`. You need to use your new name then. 

## Renderer Component

### document <Badge text="required" type="warning"/>
- Type: `object` | `array`
- Default: `undefined`
- Required: `true`

Rich-text document from Storyblok which should be rendered. You can pass either a complete document, a single node or an array with nodes — the renderer will take care of the rest. :sunglasses:
