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
