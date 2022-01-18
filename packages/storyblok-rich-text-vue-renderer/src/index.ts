import type { InjectionKey, Plugin } from 'vue'
import { inject } from 'vue'
import { createRenderer } from './renderer'
import type { RendererOptions } from './renderer'
import RichTextRenderer from './components/RichTextRenderer'
import type { ComponentResolvers, Resolvers } from './resolvers'
import { defaultResolvers } from './resolvers'

const key: InjectionKey<ReturnType<typeof createRenderer>> =
  Symbol('Rich Text Renderer')

export type ResolversOption = Resolvers & {
  components?: ComponentResolvers
}

export type MergedResolvers = Required<ResolversOption>

export type PluginOptions = Partial<RendererOptions>

export const plugin = (options?: PluginOptions): Plugin => ({
  install(app) {
    const renderer = createRenderer({
      ...options,
      resolvers: options?.resolvers || { ...defaultResolvers, components: {} },
    })

    app.provide(key, renderer)
  },
})

export function useRenderer(): ReturnType<typeof createRenderer> {
  const renderer = inject(key)
  if (!renderer) throw new Error('Rich Text Renderer not provided.')
  return renderer
}

export function defineResolvers(
  resolvers: Partial<ResolversOption>,
): MergedResolvers {
  const { components = {}, ...rest } = resolvers
  return { ...defaultResolvers, components, ...rest }
}

export { RichTextRenderer }
export * from './resolvers'
export * from './renderer'
