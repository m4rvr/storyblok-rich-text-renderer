<template>
  <RichTextRenderer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RichTextRenderer from './components/RichTextRenderer.vue'

export default defineComponent({
  name: 'App',
  components: {
    RichTextRenderer,
  },
})
</script>
