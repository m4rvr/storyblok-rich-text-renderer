# Resolvers

::: tip `attrs` as prop
Every component gets an `attrs` prop value which contains the attributes (if there are any) from Storyblok like the `level` of your `HEADING` or the `src` of your `IMAGE`. :v:

If you use TypeScript there are also interfaces for the `attrs` prop like `HeadingAttributes` or `ImageAttributes`.
With this you know which attributes are available for your node. :thumbsup:

See the defaults and more below :point_down:.
:::

## Blocks

### DOCUMENT

Top-level node which holds all other nodes.

- Key: `Block.DOCUMENT`
- Default:

```vue
<template>
  <div><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbDocument',
});
</script>
```

### HEADING

Resolves headings from h1 to h6.

- Key: `Block.HEADING`
- Default:

```vue
<template>
  <component :is="tag">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { HeadingAttributes } from '@marvr/storyblok-rich-text-types';

export default defineComponent({
  name: 'SbHeading',
  props: {
    attrs: {
      type: Object as () => HeadingAttributes,
      required: true,
    },
  },
  setup({ attrs: { level } }) {
    const tag = ref(`h${level}`);

    return {
      tag,
    };
  },
});
</script>
```

### PARAGRAPH

Resolves paragraphs.

- Key: `Block.PARAGRAPH`
- Default:

```vue
<template>
  <p><slot /></p>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbParagraph',
});
</script>
```

### QUOTE

Resolves block quotes.

- Key: `Block.QUOTE`
- Default:

```vue
<template>
  <blockquote><slot /></blockquote>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbQuote',
});
</script>
```

### OL_LIST

Resolves ordered lists.

- Key: `Block.OL_LIST`
- Default:

```vue
<template>
  <ol>
    <slot />
  </ol>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbOrderedList',
});
</script>
```

### UL_LIST

Resolves unordered lists.

- Key: `Block.UL_LIST`
- Default:

```vue
<template>
  <ul>
    <slot />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbUnorderedList',
});
</script>
```

### LIST_ITEM

Resolves list items.

- Key: `Block.LIST_ITEM`
- Default:

```vue
<template>
  <li><slot /></li>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbListItem',
});
</script>
```

### CODE

Resolves code blocks.

- Key: `Block.CODE`
- Default:

```vue
<template>
  <pre :class="elementClass">
    <code>
      <slot />
    </code>
  </pre>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { CodeAttributes } from '@marvr/storyblok-rich-text-types';

export default defineComponent({
  name: 'SbCodeBlock',
  props: {
    attrs: {
      type: Object as () => CodeAttributes,
      required: true,
    },
  },
  setup({ attrs }) {
    const elementClass = ref(attrs.class);

    return {
      elementClass,
    };
  },
});
</script>
```

### HR

Resolves horizontal rules.

- Key: `Block.HR`
- Default:

```vue
<template>
  <hr />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbHorizontalRule',
});
</script>
```

### BR

Resolves hard breaks.

- Key: `Block.BR`
- Default:

```vue
<template>
  <br />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbBreak',
});
</script>
```

### IMAGE

Resolves images.

- Key: `Block.IMAGE`
- Default:

```vue
<template>
  <img :src="src" :alt="alt" :title="title" />
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { ImageAttributes } from '@marvr/storyblok-rich-text-types';

export default defineComponent({
  name: 'SbImage',
  props: {
    attrs: {
      type: Object as () => ImageAttributes,
      required: true,
    },
  },
  setup({ attrs }) {
    const src = ref(attrs.src);
    const alt = ref(attrs.alt);
    const title = ref(attrs.title);

    return {
      src,
      alt,
      title,
    };
  },
});
</script>
```

## Marks

### BOLD

Resolves bold marks.

- Key: `Mark.BOLD`
- Default:

```vue
<template>
  <b><slot /></b>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbBold',
});
</script>
```

### STRONG

Resolves strong marks.

- Key: `Mark.STRONG`
- Default:

```vue
<template>
  <strong><slot /></strong>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbStrong',
});
</script>
```

### STRIKE

Resolves strike marks.

- Key: `Mark.STRIKE`
- Default:

```vue
<template>
  <s><slot /></s>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbStrike',
});
</script>
```

### UNDERLINE

Resolves underline marks.

- Key: `Mark.UNDERLINE`
- Default:

```vue
<template>
  <u><slot /></u>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbUnderline',
});
</script>
```

### ITALIC

Resolves italic marks.

- Key: `Mark.ITALIC`
- Default:

```vue
<template>
  <i><slot /></i>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbItalic',
});
</script>
```

### CODE

Resolves inline code marks.

- Key: `Mark.CODE`
- Default:

```vue
<template>
  <code><slot /></code>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbCode',
});
</script>
```

### LINK

Resolves links (story, asset, external & email).

- Key: `Mark.LINK`
- Default:

```vue
<template>
  <router-link v-if="linkType === 'story'" :target="target">
    <slot />
  </router-link>
  <a v-else-if="linkType === 'email'" :href="`mailto:${href}`"><slot /></a>
  <a v-else :href="href" :target="target"><slot /></a>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { LinkAttributes } from '@marvr/storyblok-rich-text-types';

export default defineComponent({
  name: 'SbLink',
  props: {
    attrs: {
      type: Object as () => LinkAttributes,
      required: true,
    },
  },
  setup({ attrs }) {
    const linkType = ref(attrs.linktype);
    const href = ref(attrs.href);
    const target = ref(attrs.target);

    return {
      linkType,
      href,
      target,
    };
  },
});
</script>
```

### STYLED

Resolves styled [css-class](https://www.storyblok.com/cl/css-class-options-in-rich-text) marks.

- Key: `Mark.STYLED`
- Default:

```vue
<template>
  <span :class="elementClass"><slot /></span>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { StyledAttributes } from '@marvr/storyblok-rich-text-types';

export default defineComponent({
  name: 'SbStyled',
  props: {
    attrs: {
      type: Object as () => StyledAttributes,
      required: true,
    },
  },
  setup({ attrs }) {
    const elementClass = ref(attrs.class);

    return {
      elementClass,
    };
  },
});
</script>
```
