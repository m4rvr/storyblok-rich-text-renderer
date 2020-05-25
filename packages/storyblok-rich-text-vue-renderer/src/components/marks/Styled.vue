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
