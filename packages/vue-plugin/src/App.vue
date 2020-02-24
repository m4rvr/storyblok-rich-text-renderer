<template>
  <div id="app">
    <rich-text-renderer v-if="doc" :document="doc" />
    <pre>{{ doc }}</pre>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import StoryblokClient from 'storyblok-js-client'

export default Vue.extend({
  data () {
    return {
      doc: undefined
    }
  },
  async created () {
    try {
      const Storyblok = new StoryblokClient({
        accessToken: process.env.VUE_APP_ACCESS_TOKEN
      })

      const { data } = await Storyblok.get('cdn/stories/rich-text')
      this.doc = data.story.content.text
    } catch (error) {
      console.error(error)
    }
  }
})
</script>
