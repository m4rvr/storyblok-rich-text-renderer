export enum NodeTypes {
  // Blocks
  DOCUMENT = 'doc',
  HEADING = 'heading',
  PARAGRAPH = 'paragraph',
  QUOTE = 'blockquote',
  OL_LIST = 'ordered_list',
  UL_LIST = 'bullet_list',
  LIST_ITEM = 'list_item',
  CODE_BLOCK = 'code_block',
  HR = 'horizontal_rule',
  BR = 'hard_break',
  IMAGE = 'image',
  EMOJI = 'emoji',
  // Marks
  BOLD = 'bold',
  STRONG = 'strong',
  STRIKE = 'strike',
  UNDERLINE = 'underline',
  ITALIC = 'italic',
  CODE = 'code',
  LINK = 'link',
  ANCHOR = 'anchor',
  STYLED = 'styled',
  SUPERSCRIPT = 'superscript',
  SUBSCRIPT = 'subscript',
  TEXT_STYLE = 'textStyle',
  HIGHLIGHT = 'highlight',
  // Text
  TEXT = 'text',
  // Component
  COMPONENT = 'blok',
}

export const blockNodeTypes = [
  NodeTypes.DOCUMENT,
  NodeTypes.HEADING,
  NodeTypes.PARAGRAPH,
  NodeTypes.QUOTE,
  NodeTypes.OL_LIST,
  NodeTypes.UL_LIST,
  NodeTypes.LIST_ITEM,
  NodeTypes.CODE_BLOCK,
  NodeTypes.HR,
  NodeTypes.BR,
  NodeTypes.IMAGE,
  NodeTypes.EMOJI,
]

export interface NodeAttributes {}

export interface Node {
  type: NodeTypes
  attrs?: NodeAttributes
}

export interface NodeWithContent extends Node {
  // @TODO better one type with all?
  content?: BlockNodes[] | TextNode[]
}

export interface TextNode extends Node {
  type: NodeTypes.TEXT
  text: string
  marks?: MarkNodes[]
}

export type ComponentBodyShell = Record<string, any>

export interface ComponentBody extends ComponentBodyShell {
  component: string
  _uid: string
}

export interface ComponentAttributes extends NodeAttributes {
  id: string
  body: ComponentBody[]
}

export interface ComponentNode extends Node {
  type: NodeTypes.COMPONENT
  attrs: ComponentAttributes
}

// Blocks
export interface DocumentNode extends NodeWithContent {
  type: NodeTypes.DOCUMENT
  content: RootNodes[]
}

export type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6

export interface HeadingAttributes extends NodeAttributes {
  level: HeadingLevels
}

export interface HeadingNode extends NodeWithContent {
  type: NodeTypes.HEADING
  content: TextNode[]
  attrs: HeadingAttributes
}

export interface ParagraphNode extends NodeWithContent {
  type: NodeTypes.PARAGRAPH
  content: TextNode[]
}

export interface ListItemNode extends NodeWithContent {
  type: NodeTypes.LIST_ITEM
  content: ParagraphNode[]
  attrs: NodeAttributes
}

export interface OrderedListAttributes extends NodeAttributes {
  order: number
}

export interface OrderedListNode extends NodeWithContent {
  type: NodeTypes.OL_LIST
  content: ListItemNode[]
  attrs: OrderedListAttributes
}

export interface UnorderedListNode extends NodeWithContent {
  type: NodeTypes.UL_LIST
  content: ListItemNode[]
}

export interface QuoteNode extends NodeWithContent {
  type: NodeTypes.QUOTE
  content: ParagraphNode[]
}

export interface CodeBlockAttributes extends NodeAttributes {
  class: string
}

export interface CodeBlockNode extends NodeWithContent {
  type: NodeTypes.CODE_BLOCK
  content: TextNode[]
  attrs: CodeBlockAttributes
}

export interface HorizontalRuleNode extends Node {
  type: NodeTypes.HR
}

export interface BreakNode extends Node {
  type: NodeTypes.BR
}

export interface ImageAttributes extends NodeAttributes {
  alt: string
  src: string
  title: string | null
}

export interface ImageNode extends Node {
  type: NodeTypes.IMAGE
  attrs: ImageAttributes
}

export interface EmojiAttributes extends NodeAttributes {
  name: string | null
  emoji: string | null
  fallbackImage: string | null
}

export interface EmojiNode extends Node {
  type: NodeTypes.EMOJI
  attrs: EmojiAttributes
}

// Marks
export interface BoldNode extends Node {
  type: NodeTypes.BOLD
}

export interface StrongNode extends Node {
  type: NodeTypes.STRONG
}

export interface StrikeNode extends Node {
  type: NodeTypes.STRIKE
}

export interface UnderlineNode extends Node {
  type: NodeTypes.UNDERLINE
}

export interface ItalicNode extends Node {
  type: NodeTypes.ITALIC
}

export interface CodeNode extends Node {
  type: NodeTypes.CODE
}

export enum LinkTargets {
  SELF = '_self',
  BLANK = '_blank',
}

export enum LinkTypes {
  URL = 'url',
  STORY = 'story',
  ASSET = 'asset',
  EMAIL = 'email',
}

export interface LinkAttributes {
  href: string
  uuid: string | null
  target: LinkTargets | null
  linktype: LinkTypes
  anchor: string | null
}

export interface LinkNode extends Node {
  type: NodeTypes.LINK
  attrs: LinkAttributes
}

export interface StyledAttributes {
  class: string
}

export interface StyledNode extends Node {
  type: NodeTypes.STYLED
  attrs: StyledAttributes
}

export interface AnchorAttributes {
  id: string
}

export interface AnchorNode extends Node {
  type: NodeTypes.ANCHOR
  attrs: AnchorAttributes
}

export interface SuperscriptNode extends Node {
  type: NodeTypes.SUPERSCRIPT
}

export interface SubscriptNode extends Node {
  type: NodeTypes.SUBSCRIPT
}

export interface TextStyleAttributes {
  color: string | null
}

export interface TextStyleNode {
  type: NodeTypes.TEXT_STYLE
  attrs: TextStyleAttributes
}

export interface HighlightAttributes {
  color: string | null
}

export interface HighlightNode {
  type: NodeTypes.HIGHLIGHT
  attrs: HighlightAttributes
}

export type BlockNodes =
  | DocumentNode
  | HeadingNode
  | ParagraphNode
  | ListItemNode
  | OrderedListNode
  | UnorderedListNode
  | QuoteNode
  | CodeBlockNode
  | HorizontalRuleNode
  | BreakNode
  | ImageNode
  | EmojiNode

export type MarkNodes =
  | BoldNode
  | StrongNode
  | StrikeNode
  | UnderlineNode
  | ItalicNode
  | CodeNode
  | LinkNode
  | StyledNode
  | AnchorNode
  | SuperscriptNode
  | SubscriptNode
  | TextStyleNode
  | HighlightNode

export type RootNodes =
  | HeadingNode
  | ParagraphNode
  | OrderedListNode
  | UnorderedListNode
  | QuoteNode
  | HorizontalRuleNode
  | ImageNode

export type BlockNodesWithContent =
  | DocumentNode
  | ParagraphNode
  | QuoteNode
  | UnorderedListNode
  | ListItemNode

export type BlockNodesWithoutOptions = HorizontalRuleNode | BreakNode
export type BlockNodesWithAttributes = ImageNode | EmojiNode
export type BlockNodesWithContentAndAttributes =
  | HeadingNode
  | OrderedListNode
  | CodeBlockNode

export type MarkNodesWithoutOptions =
  | BoldNode
  | StrongNode
  | StrikeNode
  | UnderlineNode
  | ItalicNode
  | CodeNode
  | SuperscriptNode
  | SubscriptNode

export type MarkNodesWithAttributes =
  | LinkNode
  | AnchorNode
  | StyledNode
  | TextStyleNode
  | HighlightNode
