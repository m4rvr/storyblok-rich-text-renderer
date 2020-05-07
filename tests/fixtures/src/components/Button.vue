<template>
  <div>
    {{ buttonTitle }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { ComponentBody } from '@marv/storyblok-rich-text-types';

export interface ButtonComponent extends ComponentBody {
  title: string;
}

export default defineComponent({
  name: 'SbButton',
  props: {
    body: {
      type: Object as () => ButtonComponent,
      required: true,
    },
  },
  setup({ body: { title } }) {
    const buttonTitle = ref(title);

    return {
      buttonTitle,
    };
  },
});
</script>
