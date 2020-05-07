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
