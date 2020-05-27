<template>
  <div>
    <rich-text-renderer v-if="doc" :document="doc" />
    <pre v-if="doc">{{ doc }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api';
import StoryblokClient from 'storyblok-js-client';

export default defineComponent({
  setup() {
    const doc = ref(undefined);

    onMounted(async () => {
      try {
        const Storyblok = new StoryblokClient({
          accessToken: process.env.STORYBLOK_TOKEN,
        });
        const { data } = await Storyblok.get('cdn/stories/rich-text');
        doc.value = data.story.content.text;
      } catch (error) {
        console.error(error);
      }
    });

    return {
      doc,
    };
  },
});
</script>
