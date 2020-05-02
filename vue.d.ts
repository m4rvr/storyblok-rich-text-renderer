import Vue from 'vue';
import { Options } from '@marvinrudolph/vue-storyblok-rich-text-renderer';

declare module 'vue/types/vue' {
  interface Vue {
    $richTextRenderer: {
      options: Options;
    };
  }
}
