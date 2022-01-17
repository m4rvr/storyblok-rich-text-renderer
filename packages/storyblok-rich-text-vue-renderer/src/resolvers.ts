import type { DefineComponent } from 'vue'
import { h, resolveDynamicComponent } from 'vue'
import type {
  CodeBlockAttributes,
  HeadingAttributes,
  ImageAttributes,
  LinkAttributes,
  NodeAttributes,
  OrderedListAttributes,
  StyledAttributes,
  TextNode,
} from '@marvr/storyblok-rich-text-types'
import {
  LinkTypes,
  NodeTypes,
} from '@marvr/storyblok-rich-text-types'

export type RenderedNode = ReturnType<typeof h>
export type Component = DefineComponent<{}, {}, any>

export type BlockResolverFunction = () => RenderedNode | RenderedNode[]
export type BlockResolverFunctionWithOptions<O extends Record<string, any>> =
  (options: O) => RenderedNode | RenderedNode[]

export type BlockResolver = Component | BlockResolverFunction

export type BlockResolverWithChildren =
  | Component
  | BlockResolverFunctionWithOptions<{ children: RenderedNode[] }>

export type BlockResolverWithAttributes<A extends NodeAttributes> =
  | Component
  | BlockResolverFunctionWithOptions<{ attrs: A }>

export type BlockResolverWithChildrenAndAttributes<A extends NodeAttributes> =
  | Component
  | BlockResolverFunctionWithOptions<{ children: RenderedNode[]; attrs: A }>

export type MarkResolverFunction = (options: {
  text: TextNode['text']
}) => RenderedNode

export type MarkResolverFunctionWithAttributes<A extends NodeAttributes> =
  (options: { text: TextNode['text']; attrs: A }) => RenderedNode

export type MarkResolver = Component | MarkResolverFunction
export type MarkResolverWithAttributes<A extends NodeAttributes> =
  | Component
  | MarkResolverFunctionWithAttributes<A>

export type ComponentFields = Record<string, any>

export interface ComponentOptions {
  id: string
  _uid: string
  component: string
  fields: Record<string, any>
}

export type ComponentResolverFunction = (
  options: ComponentOptions
) => RenderedNode

export type ComponentResolvers = Record<string, ComponentResolverFunction>

export const componentResolvers: ComponentResolvers = {
  button1: ({ _uid, id, component, fields }) =>
    h('div', { _uid, id, component }, fields.title),
}

export interface Resolvers {
  // Blocks
  [NodeTypes.DOCUMENT]: BlockResolverWithChildren
  [NodeTypes.HEADING]: BlockResolverWithChildrenAndAttributes<HeadingAttributes>
  [NodeTypes.PARAGRAPH]: BlockResolverWithChildren
  [NodeTypes.QUOTE]: BlockResolverWithChildren
  [NodeTypes.OL_LIST]: BlockResolverWithChildrenAndAttributes<OrderedListAttributes>
  [NodeTypes.UL_LIST]: BlockResolverWithChildren
  [NodeTypes.LIST_ITEM]: BlockResolverWithChildren
  [NodeTypes.CODE_BLOCK]: BlockResolverWithChildrenAndAttributes<CodeBlockAttributes>
  [NodeTypes.HR]: BlockResolver
  [NodeTypes.BR]: BlockResolver
  [NodeTypes.IMAGE]: BlockResolverWithAttributes<ImageAttributes>
  // Marks
  [NodeTypes.BOLD]: MarkResolver
  [NodeTypes.STRONG]: MarkResolver
  [NodeTypes.STRIKE]: MarkResolver
  [NodeTypes.UNDERLINE]: MarkResolver
  [NodeTypes.ITALIC]: MarkResolver
  [NodeTypes.CODE]: MarkResolver
  [NodeTypes.LINK]: MarkResolverWithAttributes<LinkAttributes>
  [NodeTypes.STYLED]: MarkResolverWithAttributes<StyledAttributes>
  // Fallback component
  [NodeTypes.COMPONENT]: () => RenderedNode
}

export const defaultResolvers: Resolvers = {
  // Blocks
  [NodeTypes.DOCUMENT]: ({ children }) => children,
  [NodeTypes.HEADING]: ({ children, attrs }) => h(`h${attrs.level}`, children),
  [NodeTypes.PARAGRAPH]: ({ children }) => h('p', children),
  [NodeTypes.QUOTE]: ({ children }) => h('blockquote', children),
  // @TODO respect attrs.order?
  [NodeTypes.OL_LIST]: ({ children, attrs }) => h('ol', children),
  [NodeTypes.UL_LIST]: ({ children }) => h('ul', children),
  [NodeTypes.LIST_ITEM]: ({ children }) => h('li', children),
  [NodeTypes.CODE_BLOCK]: ({ children, attrs }) => h('pre', attrs, children),
  [NodeTypes.HR]: () => h('hr'),
  [NodeTypes.BR]: () => h('br'),
  [NodeTypes.IMAGE]: ({ attrs }) => h('img', attrs),
  // Marks
  [NodeTypes.BOLD]: ({ text }) => h('b', text),
  [NodeTypes.STRONG]: ({ text }) => h('strong', text),
  [NodeTypes.STRIKE]: ({ text }) => h('s', text),
  [NodeTypes.UNDERLINE]: ({ text }) => h('u', text),
  [NodeTypes.ITALIC]: ({ text }) => h('i', text),
  [NodeTypes.CODE]: ({ text }) => h('code', text),
  [NodeTypes.LINK]: ({ text, attrs }) => {
    let href = ''

    switch (attrs.linktype) {
      case LinkTypes.ASSET:
      case LinkTypes.URL:
        href = attrs.href
        break
      case LinkTypes.EMAIL:
        href = `mailto:${attrs.href}`
        break
      case LinkTypes.STORY:
        const RouterLink = getRouterLinkComponent()
        if (!RouterLink)
          return h('a', { href, target: attrs.target }, text)

        return h(
          RouterLink,
          { to: attrs.href, target: attrs.target },
          { default: () => text },
        )
    }

    return h('a', { href: attrs.href, target: attrs.target }, text)
  },
  [NodeTypes.STYLED]: ({ text, attrs }) => h('span', attrs, text),
  // Component fallback
  [NodeTypes.COMPONENT]: () => h('div', 'component'),
}

export function getRouterLinkComponent(): false | Component {
  const component = resolveDynamicComponent('RouterLink')
  return typeof component === 'string' ? false : (component as Component)
}
