import { Node } from '../'
import { Mark } from '../enum'

// Bold
export interface BoldNode extends Node {
  type: Mark.BOLD;
}

// Strong
export interface StrongNode extends Node {
  type: Mark.STRONG;
}

// Strike
export interface StrikeNode extends Node {
  type: Mark.STRIKE;
}

// Underline
export interface UnderlineNode extends Node {
  type: Mark.UNDERLINE;
}

// Italic
export interface ItalicNode extends Node {
  type: Mark.ITALIC;
}

// Code
export interface CodeNode extends Node {
  type: Mark.CODE;
}

// Link
export type LinkTarget = '_self' | '_blank' | null
export type LinkType = 'url' | 'story' | 'asset'

export interface LinkAttributes {
  href: string;
  uuid: string | null;
  target: LinkTarget;
  linktype: LinkType;
}

export interface LinkNode extends Node {
  type: Mark.LINK;
  attrs: LinkAttributes;
}

export type MarkNodes =
  BoldNode
  | StrongNode
  | StrikeNode
  | UnderlineNode
  | ItalicNode
  | CodeNode
  | LinkNode
