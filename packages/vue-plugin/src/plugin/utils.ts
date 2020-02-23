import { Nodes, TextNode, TextType, Block, BlockNodes, VoidBlockNodes, ComponentNode, ComponentType } from '@marvinrudolph/storyblok-rich-text-types'

function createEnumChecker<T extends string, TEnumValue extends string> (enumVariable: { [key in T]: TEnumValue }) {
  const enumValues = Object.values(enumVariable)
  return (value: string): value is TEnumValue => enumValues.includes(value)
}

const isBlock = createEnumChecker(Block)

export function isTextNode (node: Nodes): node is TextNode {
  return node.type === TextType
}

export function isBlockNode (node: Nodes): node is BlockNodes {
  return isBlock(node.type)
}

export function isVoidBlockNode (node: BlockNodes): node is VoidBlockNodes {
  return [Block.BR, Block.HR, Block.IMAGE].includes(node.type)
}

export function isComponentNode (node: Nodes): node is ComponentNode {
  return node.type === ComponentType
}
