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
