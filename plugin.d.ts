import Vue from 'vue';
import { Options } from '@marvr/storyblok-rich-text-vue-renderer';

declare module 'vue/types/vue' {
  interface Vue {
    $richTextRenderer: {
      options: Options;
    };
  }
}
