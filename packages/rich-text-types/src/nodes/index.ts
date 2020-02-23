import {
  BlockNodes,
  HeadingNode,
  ParagraphNode,
  OrderedListNode,
  UnorderedListNode,
  QuoteNode,
  CodeBlockNode,
  HrNode,
  ImageNode
} from './block'
import { MarkNodes } from './mark'
import { ComponentNode, ComponentType } from './component'
import { TextNode, TextType } from './text'
import { Block, Mark } from '../enum'

export * from './block'
export * from './mark'
export * from './component'
export * from './text'

export type NodeType = Block | Mark | ComponentType | TextType
export type Nodes = BlockNodes | MarkNodes | ComponentNode | TextNode
export type TopLevelNodes =
  HeadingNode
  | ParagraphNode
  | OrderedListNode
  | UnorderedListNode
  | QuoteNode
  | CodeBlockNode
  | HrNode
  | ImageNode
  | ComponentNode

export interface Node {
  readonly type: NodeType;
}
