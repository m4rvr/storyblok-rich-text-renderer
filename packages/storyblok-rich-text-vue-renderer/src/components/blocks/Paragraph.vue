<template>
  <p><slot /></p>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbParagraph',
});
</script>
