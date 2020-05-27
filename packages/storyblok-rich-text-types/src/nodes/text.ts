import { Node, MarkNode } from '../';

export const TextType = 'text';
export type TextType = typeof TextType;

export interface TextNode extends Node {
  type: TextType;
  text: string;
  marks?: MarkNode[];
}
