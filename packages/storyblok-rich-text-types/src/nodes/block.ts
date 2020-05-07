import { Node, TopLevelNode, TextNode, NodeAttributes } from '.';
import { Block } from '../enum';

export interface BlockNode extends Node {}

export interface BlockNodeWithContent extends BlockNode {
  content: BlockNode[];
}

// Document
export interface DocumentNode extends BlockNodeWithContent {
  type: Block.DOCUMENT;
  content: TopLevelNode[];
}

// Heading
export type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingAttributes extends NodeAttributes {
  level: HeadingLevels;
}

export interface HeadingNode extends BlockNodeWithContent {
  type: Block.HEADING;
  attrs: HeadingAttributes;
  content: TextNode[];
}

// Paragraph
export interface ParagraphNode extends BlockNodeWithContent {
  type: Block.PARAGRAPH;
  content: TextNode[];
}

// List Item
export interface ListItemNode extends BlockNodeWithContent {
  type: Block.LIST_ITEM;
  content: ParagraphNode[];
}

// Lists
export interface ListAttributes extends NodeAttributes {}

export interface ListNode extends BlockNodeWithContent {
  type: Block.OL_LIST | Block.UL_LIST;
  attrs?: ListAttributes;
  content: ListItemNode[];
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
export interface QuoteNode extends BlockNodeWithContent {
  type: Block.QUOTE;
  content: ParagraphNode[];
}

// Code
export interface CodeAttributes extends NodeAttributes {
  class: string;
}

export interface CodeBlockNode extends BlockNodeWithContent {
  type: Block.CODE;
  attrs: CodeAttributes;
  content: TextNode[];
}

// Horizontal Rule
export interface HrNode extends BlockNode {
  type: Block.HR;
}

// Break
export interface BrNode extends BlockNode {
  type: Block.BR;
}

// Image
export interface ImageAttributes extends NodeAttributes {
  alt: string;
  src: string;
  title: string | null;
}

export interface ImageNode extends BlockNode {
  type: Block.IMAGE;
  attrs: ImageAttributes;
}

export type VoidBlockNodes = HrNode | BrNode | ImageNode;
