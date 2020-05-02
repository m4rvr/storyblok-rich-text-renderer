import {
  Node,
  Block,
  BlockNode,
  BlockNodeWithContent,
  TextNode,
  TextType,
  ComponentNode,
  ComponentType,
} from '@marvinrudolph/storyblok-rich-text-types';

function createEnumChecker<T extends string, TEnumValue extends string>(
  enumVariable: { [key in T]: TEnumValue },
) {
  const enumValues = Object.values(enumVariable);
  return (value: string): value is TEnumValue => enumValues.includes(value);
}

const isBlock = createEnumChecker(Block);

export function isBlockNode(node: Node): node is BlockNode {
  return isBlock(node.type);
}

export function isTextNode(node: Node): node is TextNode {
  return node.type === TextType;
}

export function isBlockNodeWithContent(
  node: BlockNode,
): node is BlockNodeWithContent {
  return 'content' in node;
}

export function isComponentNode(node: Node): node is ComponentNode {
  return node.type === ComponentType;
}
