import { CreateElement, VNode } from 'vue'
import { Nodes, MarkNodes, BlockNodes, VoidBlockNodes, BlockNodesWithContent, ComponentNode } from '@marvinrudolph/storyblok-rich-text-types'
import { RenderText } from '@/vue'
import { Options } from '@/plugin'
import {
  BlockResolvers,
  BlockResolver,
  VoidBlockResolver,
  MarkResolvers,
  MarkResolver,
  ComponentResolvers,
  ComponentResolver,
  defaultBlockResolvers,
  defaultMarkResolvers,
  defaultComponentResolver
} from '@/plugin/resolver'
import { isTextNode, isBlockNode, isVoidBlockNode, isComponentNode } from '@/plugin/utils'

export interface Resolvers {
  blockResolvers: BlockResolvers;
  markResolvers: MarkResolvers;
  componentResolvers: ComponentResolvers;
}

export const useRenderer = function (h: CreateElement, renderText: RenderText, options: Options) {
  const resolvers: Resolvers = {
    blockResolvers: {
      ...defaultBlockResolvers,
      ...options.resolvers?.blocks
    },
    markResolvers: {
      ...defaultMarkResolvers,
      ...options.resolvers?.marks
    },
    componentResolvers: {
      _default: defaultComponentResolver,
      ...options.resolvers?.components
    }
  }

  function addKeyToNode (node: VNode, key: number) {
    if (node.key === null) {
      node.key = key
    }

    return node
  }

  function renderMark <T extends MarkNodes> (text: VNode, mark: T) {
    const { markResolvers } = resolvers
    const resolver = markResolvers[mark.type] as MarkResolver<T>

    if (mark.type in markResolvers) {
      return resolver(h, text, mark)
    } else {
      return text
    }
  }

  function renderBlock <T extends BlockNodes> (block: T) {
    const { blockResolvers } = resolvers

    if (isVoidBlockNode(block)) {
      const resolver = blockResolvers[block.type] as VoidBlockResolver<VoidBlockNodes>
      return resolver(h, block)
    } else {
      const blockWithContent = block as BlockNodesWithContent
      const resolver = blockResolvers[block.type] as BlockResolver<T>
      const children = blockWithContent.content ? renderNodeList(blockWithContent.content) : []
      return resolver(h, children, block)
    }
  }

  function renderNode (node: Nodes): VNode | VNode[] {
    if (isTextNode(node)) {
      if (!node.marks) {
        return renderText(node.text)
      }

      return node.marks.reduce((value: VNode, mark: MarkNodes) => {
        return renderMark(value, mark)
      }, renderText(node.text))
    } else if (isBlockNode(node)) {
      return renderBlock(node)
    } else if (isComponentNode(node)) {
      return renderComponents(node)
    }

    return renderText('')
  }

  function renderNodeList (nodes: Nodes[]) {
    const nodeList: VNode[] = []

    nodes.forEach((node, index) => {
      const renderedNode = renderNode(node)

      if (renderedNode instanceof Array) {
        renderedNode.forEach((childNode, childIndex) => {
          nodeList.push(addKeyToNode(childNode, index + childIndex))
        })
      } else {
        nodeList.push(addKeyToNode(renderedNode, index))
      }
    })

    return nodeList
  }

  function renderComponents (node: ComponentNode) {
    const { componentResolvers } = resolvers
    const components: VNode[] = []

    node.attrs.body.forEach((body) => {
      const { component } = body
      const resolver = componentResolvers[component] || componentResolvers._default

      if (resolver instanceof Function) {
        const componentResolver = resolver as ComponentResolver
        components.push(componentResolver(h, body, node))
      } else {
        components.push(h(resolver))
      }
    })

    return components
  }

  return {
    renderNode,
    renderNodeList,
    resolvers
  }
}
