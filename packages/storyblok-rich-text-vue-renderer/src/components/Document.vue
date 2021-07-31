<template>
  <div>
    <h1>Document {{ foo }}</h1>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    foo: String,
  },
  setup(props) {
    console.log(props.foo);
  },
});
</script>
