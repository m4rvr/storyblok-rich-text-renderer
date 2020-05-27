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
