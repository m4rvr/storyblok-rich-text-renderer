<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  msg: {
    type: String,
    default: 'Awiwi'
  },
})

</script>
<template>
  <div class="custom-component"> 🥑 {{msg}}</div>
</template>

<style>
.custom-component {
    display: inline-flex;
    border-radius: 5px;
    padding: 2.5px 10px;
    background: #00B3B0;
    color: white;
}
</style>