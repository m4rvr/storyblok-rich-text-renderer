import Vue, { CreateElement, VNode } from 'vue'
import { ComponentNode, ComponentBody } from '@marvinrudolph/storyblok-rich-text-types'

export interface ComponentResolver {
  (h: CreateElement, body: ComponentBody, node: ComponentNode): VNode;
}

export const defaultComponentResolver: ComponentResolver = (h, body) => <div>No rendering definition for component <strong>{body.component}</strong> found.</div>

export interface ComponentResolvers {
  _default: ComponentResolver;
  [key: string]: ComponentResolver | typeof Vue;
}
