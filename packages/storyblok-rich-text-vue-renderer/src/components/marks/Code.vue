<template>
  <code><slot /></code>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbCode',
});
</script>
