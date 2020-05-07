<template>
  <a :href="href" :target="target"><slot /></a>
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
    const href = ref(attrs.href);
    const target = ref(attrs.target);

    return {
      href,
      target,
    };
  },
});
</script>
