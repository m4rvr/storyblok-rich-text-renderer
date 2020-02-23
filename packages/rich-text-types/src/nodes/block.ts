import { Node, TextNode } from '../'
import { Block } from '../enum'
import { TopLevelNodes } from '.'

// Document
export interface DocumentNode extends Node {
  type: Block.DOCUMENT;
  content: TopLevelNodes[];
}

// Heading
export type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6

export interface HeadingAttributes {
  level: HeadingLevels;
}

export interface HeadingNode extends Node {
  type: Block.HEADING;
  attrs: HeadingAttributes;
  content: TextNode[];
}

// Paragraph
export interface ParagraphNode extends Node {
  type: Block.PARAGRAPH;
  content: TextNode[];
}

// List Item
export interface ListItemNode extends Node {
  type: Block.LIST_ITEM;
  content: BlockNodes[];
}

// Lists
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ListAttributes {}

export interface ListNode extends Node {
  type: Block.OL_LIST | Block.UL_LIST;
  content: ListItemNode[];
  attrs?: ListAttributes;
}

// Ordered List
export interface OrderedListAttributes extends ListAttributes {
  order: number;
}

export interface OrderedListNode extends ListNode {
  type: Block.OL_LIST;
  attrs: OrderedListAttributes;
}

// Unordered List (Bullet List)
export interface UnorderedListNode extends ListNode {
  type: Block.UL_LIST;
}

// Quote
export interface QuoteNode extends Node {
  type: Block.QUOTE;
  content: ParagraphNode[];
}

// Code
export interface CodeAttributes {
  class: string;
}

export interface CodeBlockNode extends Node {
  type: Block.CODE;
  attrs: CodeAttributes;
  content: TextNode[];
}

// Horizontal Rule
export interface HrNode extends Node {
  type: Block.HR;
}

// Break
export interface BrNode extends Node {
  type: Block.BR;
}

// Image
export interface ImageAttributes {
  alt: string;
  src: string;
  title: string | null;
}

export interface ImageNode extends Node {
  type: Block.IMAGE;
  attrs: ImageAttributes;
}

export type BlockNodes =
  DocumentNode
  | HeadingNode
  | ParagraphNode
  | ListItemNode
  | OrderedListNode
  | UnorderedListNode
  | QuoteNode
  | CodeBlockNode
  | HrNode
  | BrNode
  | ImageNode

export type VoidBlockNodes = Extract<BlockNodes, HrNode | BrNode | ImageNode>
export type BlockNodesWithContent = Exclude<BlockNodes, VoidBlockNodes>
