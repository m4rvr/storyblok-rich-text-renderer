import { VNode } from 'vue'
import { Options } from './plugin'

export type RenderText = (text: string) => VNode

declare module 'vue/types/vue' {
  interface Vue {
    _v: RenderText;
    $richTextRenderer: {
      options: Options;
    };
  }
}
