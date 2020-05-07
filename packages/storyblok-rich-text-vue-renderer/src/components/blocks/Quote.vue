<template>
  <blockquote><slot /></blockquote>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbQuote',
});
</script>
