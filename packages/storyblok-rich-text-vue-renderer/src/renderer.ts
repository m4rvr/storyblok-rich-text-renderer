import { type VNode, createTextVNode, h, isVNode } from 'vue'
import {
  type BlockNodes,
  type BlockNodesWithAttributes,
  type BlockNodesWithContent,
  type BlockNodesWithContentAndAttributes,
  type BlockNodesWithoutOptions,
  type ComponentNode,
  type MarkNodes,
  type MarkNodesWithAttributes,
  type MarkNodesWithoutOptions,
  type Node,
  NodeTypes,
  type TextNode,
  isBlockNode,
  isComponentNode,
  isTextNode,
} from '@marvr/storyblok-rich-text-types'
import {
  type Component,
  type ComponentResolvers,
  type RenderedNode,
  type Resolvers,
  defaultResolvers,
} from './resolvers'

export type ResolversOption = Resolvers & {
  components?: ComponentResolvers
}

export type MergedResolvers = Required<ResolversOption>

export interface RendererOptions {
  resolvers: MergedResolvers
  omitParagraphInListItems?: boolean
}

export function createRenderer(options?: Partial<RendererOptions>) {
  const {
    resolvers = options?.resolvers || { ...defaultResolvers, components: {} },
    omitParagraphInListItems = false,
  } = options || {}

  const renderNode = (node: Node) => {
    if (isTextNode(node)) {
      if (!node.marks) return renderTextNode(node)

      return node.marks.reduce(
        (text: VNode, mark: MarkNodes) => renderMarkNode(mark, text),
        renderTextNode(node),
      )
    } else if (isBlockNode(node)) {
      return renderBlockNode(node)
    } else if (isComponentNode(node)) {
      return renderComponentNode(node)
    }

    // @TODO
    return h('span', `fallback: the node "${node.type}" is not handled`)
  }

  const renderNodeList = (nodes: Node[]) => {
    const nodeList: RenderedNode[] = []

    nodes.forEach((node) => {
      const renderedNode = renderNode(node)

      if (Array.isArray(renderedNode)) {
        renderedNode.forEach((childNode) => {
          nodeList.push(childNode)
        })
      } else {
        nodeList.push(renderedNode)
      }
    })

    return nodeList
  }

  function renderBlockNode(node: BlockNodes) {
    switch (node.type) {
      // With children only
      case NodeTypes.DOCUMENT:
      case NodeTypes.PARAGRAPH:
      case NodeTypes.QUOTE:
      case NodeTypes.UL_LIST:
      case NodeTypes.LIST_ITEM:
        return resolveBlockNodeWithContent(node)

      // With children and attributes
      case NodeTypes.HEADING:
      case NodeTypes.OL_LIST:
      case NodeTypes.CODE_BLOCK:
        return resolveBlockNodeWithContentAndAttributes(node)

      // Without options
      case NodeTypes.HR:
      case NodeTypes.BR:
        return resolveBlockNodeWithoutOptions(node)

      // With attributes only
      case NodeTypes.IMAGE:
      case NodeTypes.EMOJI:
        return resolveBlockNodeWithAttributes(node)

      default:
        // @TODO fallback
        // @ts-expect-error There exist more marks than handled in this module.
        return h('span', `fallback: block "${node.type}" is not handled`)
    }
  }

  function renderMarkNode(node: MarkNodes, text: VNode) {
    switch (node.type) {
      // With text only
      case NodeTypes.BOLD:
      case NodeTypes.STRONG:
      case NodeTypes.STRIKE:
      case NodeTypes.UNDERLINE:
      case NodeTypes.ITALIC:
      case NodeTypes.CODE:
      case NodeTypes.SUPERSCRIPT:
      case NodeTypes.SUBSCRIPT:
        return resolveMarkNode(node, text)

      // With attributes
      case NodeTypes.LINK:
      case NodeTypes.ANCHOR:
      case NodeTypes.STYLED:
      case NodeTypes.TEXT_STYLE:
      case NodeTypes.HIGHLIGHT:
        return resolveMarkNodeWithAttributes(node, text)

      default:
        // @TODO fallback
        // @ts-expect-error There exist more marks than handled in this module.
        return h('span', `fallback: the mark "${node.type}" is not handled`)
    }
  }

  function renderComponentNode(node: ComponentNode) {
    const components: RenderedNode[] = []

    node.attrs.body.forEach((body) => {
      const { component, _uid, ...fields } = body
      const resolver = resolvers.components[component]

      if (resolver) {
        components.push(
          resolver({ id: node.attrs.id, component, _uid, fields }),
        )
      } else {
        components.push(resolvers[NodeTypes.COMPONENT]())
      }
    })

    return components
  }

  function renderTextNode(node: TextNode) {
    return createTextVNode(node.text)
  }

  const renderChildren = (
    node: BlockNodesWithContent | BlockNodesWithContentAndAttributes,
  ) => (node.content && node.content.length ? renderNodeList(node.content) : [])

  function resolveBlockNodeWithContent(node: BlockNodesWithContent) {
    const resolver = resolvers[node.type]
    let children = renderChildren(node)

    if (
      omitParagraphInListItems &&
      node.type === NodeTypes.LIST_ITEM &&
      node.content.length === 1 &&
      node.content[0].content
    ) {
      children = renderNodeList(node.content[0].content)
    }

    if (isComponentResolver(resolver))
      return h(resolver, null, { default: () => children })

    return resolver({ children })
  }

  function resolveBlockNodeWithAttributes(node: BlockNodesWithAttributes) {
    const resolver = resolvers[node.type]

    if (isComponentResolver(resolver))
      // @ts-expect-error Internal type mismatch
      return h(resolver, node.attrs)

    return resolver({ attrs: node.attrs as never })
  }

  function resolveBlockNodeWithContentAndAttributes(
    node: BlockNodesWithContentAndAttributes,
  ) {
    const resolver = resolvers[node.type]
    const children = renderChildren(node)

    if (isComponentResolver(resolver))
      // @ts-expect-error Internal type mismatch
      return h(resolver, node.attrs, { default: () => children })

    return resolver({
      children,
      attrs: node.attrs as never,
    })
  }

  function resolveBlockNodeWithoutOptions(node: BlockNodesWithoutOptions) {
    const resolver = resolvers[node.type]

    if (isComponentResolver(resolver)) return h(resolver)

    return resolver()
  }

  function resolveMarkNode(node: MarkNodesWithoutOptions, text: VNode) {
    const resolver = resolvers[node.type]

    if (isComponentResolver(resolver))
      return h(resolver, { default: () => text })

    return resolver({ text })
  }

  function resolveMarkNodeWithAttributes(
    node: MarkNodesWithAttributes,
    text: VNode,
  ) {
    const resolver = resolvers[node.type]

    if (isComponentResolver(resolver))
      // @ts-expect-error Internal type mismatch
      return h(resolver, node.attrs, { default: () => text })

    return resolver({ text, attrs: node.attrs as never })
  }

  const renderDocument = (node: Node) => {
    if (Array.isArray(node)) return renderNodeList(node)
    return renderNode(node)
  }

  return { renderDocument }
}

export function isComponentResolver(
  resolver: Resolvers[keyof Resolvers],
): resolver is Component {
  return typeof resolver !== 'function' && !isVNode(resolver)
}
