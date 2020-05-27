<template>
  <strong><slot /></strong>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbStrong',
});
</script>
