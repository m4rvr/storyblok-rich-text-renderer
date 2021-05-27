import { Node } from '../';
import { Mark } from '../enum';

export interface MarkNode extends Node {}

// Bold
export interface BoldNode extends MarkNode {
  type: Mark.BOLD;
}

// Strong
export interface StrongNode extends MarkNode {
  type: Mark.STRONG;
}

// Strike
export interface StrikeNode extends MarkNode {
  type: Mark.STRIKE;
}

// Underline
export interface UnderlineNode extends MarkNode {
  type: Mark.UNDERLINE;
}

// Italic
export interface ItalicNode extends MarkNode {
  type: Mark.ITALIC;
}

// Code
export interface CodeNode extends MarkNode {
  type: Mark.CODE;
}

// Link
export type LinkTarget = '_self' | '_blank' | null;
export type LinkType = 'url' | 'story' | 'asset' | 'email';

export interface LinkAttributes {
  href: string;
  uuid: string | null;
  target: LinkTarget;
  linktype: LinkType;
  anchor?: string;
}

export interface LinkNode extends MarkNode {
  type: Mark.LINK;
  attrs: LinkAttributes;
}

export interface StyledAttributes {
  class: string;
}

export interface StyledNode extends MarkNode {
  type: Mark.STYLED;
  attrs: StyledAttributes;
}
