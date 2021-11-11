import { PluginObject } from 'vue';
import RichTextRenderer from './components/RichTextRenderer.vue';
import { BlockResolvers, MarkResolvers, ComponentResolvers } from './resolver';

export interface ResolverOptions {
  blocks?: Partial<BlockResolvers>;
  marks?: Partial<MarkResolvers>;
  components?: Partial<ComponentResolvers>;
}

export interface Options {
  componentName?: string;
  propName?: string;
  resolvers?: ResolverOptions;
}

const plugin: PluginObject<Options> = {
  install(Vue, options: Options = {}) {
    Vue.prototype.$richTextRenderer = options;

    Vue.component(
      options.componentName || 'RichTextRenderer',
      RichTextRenderer,
    );
  },
};

export { RichTextRenderer };
export default plugin;
