<template>
  <li><slot /></li>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbListItem',
});
</script>
