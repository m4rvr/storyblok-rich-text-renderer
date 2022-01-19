import { type InjectionKey, type Plugin, inject } from 'vue'
import {
  type MergedResolvers,
  type RendererOptions,
  type ResolversOption,
  createRenderer,
} from './renderer'
import RichTextRenderer from './components/RichTextRenderer'
import { defaultResolvers } from './resolvers'

const key: InjectionKey<ReturnType<typeof createRenderer>> =
  Symbol('Rich Text Renderer')

export const plugin = (options?: Partial<RendererOptions>): Plugin => ({
  install(app) {
    const renderer = createRenderer(options)

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
