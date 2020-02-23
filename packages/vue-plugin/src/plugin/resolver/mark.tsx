import { CreateElement, VNode } from 'vue'
import {
  Mark,
  MarkNodes,
  BoldNode,
  StrongNode,
  StrikeNode,
  UnderlineNode,
  ItalicNode,
  CodeNode,
  LinkNode
} from '@marvinrudolph/storyblok-rich-text-types'

export interface MarkResolver<T extends MarkNodes> {
  (h: CreateElement, text: VNode, node: T): VNode;
}

export interface MarkResolvers {
  [Mark.BOLD]: MarkResolver<BoldNode>;
  [Mark.STRONG]: MarkResolver<StrongNode>;
  [Mark.STRIKE]: MarkResolver<StrikeNode>;
  [Mark.UNDERLINE]: MarkResolver<UnderlineNode>;
  [Mark.ITALIC]: MarkResolver<ItalicNode>;
  [Mark.CODE]: MarkResolver<CodeNode>;
  [Mark.LINK]: MarkResolver<LinkNode>;
}

export const defaultMarkResolvers: MarkResolvers = {
  [Mark.BOLD]: (h, text) => <b>{text}</b>,
  [Mark.STRONG]: (h, text) => <strong>{text}</strong>,
  [Mark.STRIKE]: (h, text) => <s>{text}</s>,
  [Mark.UNDERLINE]: (h, text) => <u>{text}</u>,
  [Mark.ITALIC]: (h, text) => <i>{text}</i>,
  [Mark.CODE]: (h, text) => <code>{text}</code>,
  [Mark.LINK]: (h, text, node) => {
    const { href, target } = node.attrs
    return <a href={href} target={target}>{text}</a>
  }
}
