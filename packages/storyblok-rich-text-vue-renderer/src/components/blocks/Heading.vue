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
