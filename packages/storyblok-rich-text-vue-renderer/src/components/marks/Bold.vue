<template>
  <b><slot /></b>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbBold',
});
</script>
