import {
  type BlockNodes,
  type ComponentNode,
  type Node,
  NodeTypes,
  type TextNode,
  blockNodeTypes,
} from './nodes'

export function isBlockNode(node: Node): node is BlockNodes {
  return blockNodeTypes.includes(node.type)
}

export function isTextNode(node: Node): node is TextNode {
  return node.type === NodeTypes.TEXT
}

export function isComponentNode(node: Node): node is ComponentNode {
  return node.type === NodeTypes.COMPONENT
}
