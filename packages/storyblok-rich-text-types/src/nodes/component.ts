import { Node } from '.';

export const ComponentType = 'blok';
export type ComponentType = typeof ComponentType;

interface ComponentBodyCover {
  [key: string]: any;
}

export interface ComponentBody extends ComponentBodyCover {
  _uid: string;
  component: string;
}

export interface ComponentAttributes {
  id: string;
  body: ComponentBody[];
}

export interface ComponentNode extends Node {
  type: ComponentType;
  attrs: ComponentAttributes;
}
