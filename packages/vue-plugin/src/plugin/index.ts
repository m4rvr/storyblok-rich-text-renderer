import { PluginObject } from 'vue'
import { BlockResolvers, MarkResolvers, ComponentResolvers } from './resolver'
import RichTextRenderer from '../components/RichTextRenderer.vue'

export interface ResolverOptions {
  blocks?: Partial<BlockResolvers>;
  marks?: Partial<MarkResolvers>;
  components?: Partial<ComponentResolvers>;
}

export interface Options {
  resolvers?: ResolverOptions;
  global?: boolean;
}

const defaultOptions: Options = {
  global: true
}

const VueRichTextRenderer: PluginObject<Options> = {
  install (Vue, pluginOptions: Options = defaultOptions) {
    const options = { ...defaultOptions, ...pluginOptions }
    Vue.prototype.$richTextRenderer = { options }
    if (options.global) {
      Vue.component('RichTextRenderer', RichTextRenderer)
    }
  }
}

export { RichTextRenderer }
export default VueRichTextRenderer
