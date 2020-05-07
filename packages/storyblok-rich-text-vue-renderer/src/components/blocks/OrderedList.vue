<template>
  <ol>
    <slot />
  </ol>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SbOrderedList',
});
</script>
