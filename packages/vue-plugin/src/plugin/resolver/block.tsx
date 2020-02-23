import { CreateElement, VNode } from 'vue'
import {
  Block,
  BlockNodes,
  VoidBlockNodes,
  DocumentNode,
  HeadingNode,
  ParagraphNode,
  QuoteNode,
  OrderedListNode,
  UnorderedListNode,
  ListItemNode,
  CodeBlockNode,
  HrNode,
  BrNode,
  ImageNode
} from '@marvinrudolph/storyblok-rich-text-types'

export interface BlockResolver<T extends BlockNodes> {
  (h: CreateElement, children: VNode[], node: T): VNode;
}

export interface VoidBlockResolver<T extends VoidBlockNodes> {
  (h: CreateElement, node: T): VNode;
}

export interface BlockResolvers {
  [Block.DOCUMENT]: BlockResolver<DocumentNode>;
  [Block.HEADING]: BlockResolver<HeadingNode>;
  [Block.PARAGRAPH]: BlockResolver<ParagraphNode>;
  [Block.QUOTE]: BlockResolver<QuoteNode>;
  [Block.OL_LIST]: BlockResolver<OrderedListNode>;
  [Block.UL_LIST]: BlockResolver<UnorderedListNode>;
  [Block.LIST_ITEM]: BlockResolver<ListItemNode>;
  [Block.CODE]: BlockResolver<CodeBlockNode>;
  [Block.HR]: VoidBlockResolver<HrNode>;
  [Block.BR]: VoidBlockResolver<BrNode>;
  [Block.IMAGE]: VoidBlockResolver<ImageNode>;
}

export const defaultBlockResolvers: BlockResolvers = {
  [Block.DOCUMENT]: (h, children) => <div>{children}</div>,
  [Block.HEADING]: (h, children, node) => {
    const Tag = `h${node.attrs.level}`
    return <Tag>{children}</Tag>
  },
  [Block.PARAGRAPH]: (h, children) => <p>{children}</p>,
  [Block.QUOTE]: (h, children) => <blockquote>{children}</blockquote>,
  [Block.OL_LIST]: (h, children) => <ol>{children}</ol>,
  [Block.UL_LIST]: (h, children) => <ul>{children}</ul>,
  [Block.LIST_ITEM]: (h, children) => <li>{children}</li>,
  [Block.CODE]: (h, children, node) => <pre class={node.attrs.class}><code>{children}</code></pre>,
  [Block.HR]: (h) => <hr />,
  [Block.BR]: (h) => <br />,
  [Block.IMAGE]: (h, node) => {
    const { alt, src, title } = node.attrs
    return <img src={src} alt={alt} title={title} />
  }
}
