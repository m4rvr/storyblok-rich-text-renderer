<template>
  <div id="app">
    <rich-text-renderer v-if="doc" :document="doc" />
    <pre>{{ doc }}</pre>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, onMounted } from '@vue/composition-api'
import { DocumentNode } from '@marvinrudolph/storyblok-rich-text-types'
import StoryblokClient from 'storyblok-js-client'

export default createComponent({
  setup () {
    const doc = ref<DocumentNode>()

    onMounted(async () => {
      try {
        const Storyblok = new StoryblokClient({
          accessToken: process.env.VUE_APP_ACCESS_TOKEN
        })

        const { data } = await Storyblok.get('cdn/stories/rich-text')
        doc.value = data.story.content.text
      } catch (error) {
        console.error(error)
      }
    })

    return {
      doc
    }
  }
})
</script>
