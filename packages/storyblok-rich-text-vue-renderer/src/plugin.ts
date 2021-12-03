import { Plugin, InjectionKey, inject } from 'vue';
import { createRenderer } from './renderer';
import RichTextRenderer from './components/RichTextRenderer';
import { Resolvers, ComponentResolvers, defaultResolvers } from './resolvers';

const key: InjectionKey<ReturnType<typeof createRenderer>> =
  Symbol('Rich Text Renderer');

export type ResolversOption = Resolvers & {
  components?: ComponentResolvers;
};

export type MergedResolvers = Required<ResolversOption>;

export interface PluginOptions {
  resolvers: {components?: ComponentResolvers;}
}

export const plugin = (options?: PluginOptions): Plugin => ({
  install(app) {
    const resolves: MergedResolvers = options?.resolvers ? { ...defaultResolvers, ...options.resolvers } as MergedResolvers: { ...defaultResolvers, components: {} }
    const renderer = createRenderer(
      resolves
    );
    app.provide(key, renderer);
  },
});

export function useRenderer(): ReturnType<typeof createRenderer> {
  const renderer = inject(key);
  if (!renderer) throw new Error('Rich Text Renderer not provided.');
  return renderer;
}

export function defineResolvers(
  resolvers: Partial<ResolversOption>,
): MergedResolvers {
  const { components = {}, ...rest } = resolvers;
  return { ...defaultResolvers, components, ...rest };
}

export { RichTextRenderer };
export * from './resolvers';
export * from './renderer';
