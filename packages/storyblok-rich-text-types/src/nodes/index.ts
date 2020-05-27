import { Block, Mark } from '../enum';
import {
  HeadingNode,
  ParagraphNode,
  OrderedListNode,
  UnorderedListNode,
  QuoteNode,
  CodeBlockNode,
  HrNode,
  ImageNode,
} from './block';
import { ComponentNode, ComponentType } from './component';
import { TextType } from './text';

export * from './block';
export * from './mark';
export * from './component';
export * from './text';

export interface NodeAttributes {}

export interface Node {
  readonly type: Block | Mark | ComponentType | TextType;
  attrs?: NodeAttributes;
}

export type TopLevelNode =
  | HeadingNode
  | ParagraphNode
  | OrderedListNode
  | UnorderedListNode
  | QuoteNode
  | CodeBlockNode
  | HrNode
  | ImageNode
  | ComponentNode;
