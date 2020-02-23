import {
  Block,
  TextType,
  TextNode,
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
  ImageNode,
  Mark,
  ComponentType,
  ComponentNode
} from '@marvinrudolph/storyblok-rich-text-types'

function textNode (text: string): TextNode {
  return {
    type: TextType,
    text
  }
}

function paragraphNode (text: string): ParagraphNode {
  return {
    type: Block.PARAGRAPH,
    content: [textNode(text)]
  }
}

function listItem (): ListItemNode {
  return {
    type: Block.LIST_ITEM,
    content: [paragraphNode('list item')]
  }
}

const heading: HeadingNode = {
  type: Block.HEADING,
  attrs: {
    level: 1
  },
  content: [textNode('h1')]
}

const paragraph = paragraphNode('paragraph')

const quote: QuoteNode = {
  type: Block.QUOTE,
  content: [paragraphNode('quote')]
}

const orderedList: OrderedListNode = {
  type: Block.OL_LIST,
  attrs: {
    order: 1
  },
  content: [
    listItem(),
    listItem(),
    listItem()
  ]
}

const unorderedList: UnorderedListNode = {
  type: Block.UL_LIST,
  content: [
    listItem(),
    listItem()
  ]
}

const codeBlock: CodeBlockNode = {
  type: Block.CODE,
  attrs: {
    class: 'language-javascript'
  },
  content: [textNode('code block')]
}

const hr: HrNode = {
  type: Block.HR
}

const br: BrNode = {
  type: Block.BR
}

const image: ImageNode = {
  type: Block.IMAGE,
  attrs: {
    alt: 'image alt',
    src: 'image src',
    title: 'image title'
  }
}

const document: DocumentNode = {
  type: Block.DOCUMENT,
  content: [heading, paragraph, quote, orderedList, unorderedList, codeBlock, image]
}

const emptyDocument: DocumentNode = {
  type: Block.DOCUMENT,
  content: []
}

const paragraphWithMarks: ParagraphNode = {
  type: Block.PARAGRAPH,
  content: [
    {
      type: TextType,
      text: 'Pa'
    },
    {
      type: TextType,
      text: 'ra',
      marks: [
        {
          type: Mark.BOLD
        }
      ]
    },
    {
      type: TextType,
      text: 'gr',
      marks: [
        {
          type: Mark.ITALIC
        }
      ]
    },
    {
      type: TextType,
      text: 'aph',
      marks: [
        {
          type: Mark.STRONG
        }
      ]
    }
  ]
}

const invalidNode = {
  type: 'invalid' as Block
}

const paragraphWithInvalidMarks: ParagraphNode = {
  type: Block.PARAGRAPH,
  content: [
    {
      type: TextType,
      text: 'Para',
      marks: [
        {
          type: Mark.STRONG
        }
      ]
    },
    {
      type: TextType,
      text: 'graph',
      marks: [
        {
          type: 'INVALID' as Mark,
          attrs: {} as any // eslint-disable-line @typescript-eslint/no-explicit-any
        }
      ]
    }
  ]
}

const paragraphWithMultipleMarks: ParagraphNode = {
  type: Block.PARAGRAPH,
  content: [
    {
      type: TextType,
      text: 'Para',
      marks: [
        {
          type: Mark.STRONG
        },
        {
          type: Mark.STRIKE
        },
        {
          type: Mark.UNDERLINE
        }
      ]
    }
  ]
}

const paragraphWithLink: ParagraphNode = {
  type: Block.PARAGRAPH,
  content: [
    {
      type: TextType,
      text: 'link',
      marks: [
        {
          type: Mark.LINK,
          attrs: {
            href: 'https://www.storyblok.com',
            uuid: null,
            target: '_blank',
            linktype: 'url'
          }
        }
      ]
    }
  ]
}

const component: ComponentNode = {
  type: ComponentType,
  attrs: {
    id: '489f2970-6787-486a-97c3-6f1e8a99b7a9',
    body: [
      {
        _uid: 'i-134324ee-1754-48be-93df-02df1e394733',
        title: 'Second button!',
        component: 'button'
      },
      {
        _uid: 'i-437c2948-0be9-442e-949d-a11c79736aa6',
        title: 'My Button',
        component: 'button'
      }
    ]
  }
}

export {
  heading,
  paragraph,
  paragraphWithMarks,
  paragraphWithInvalidMarks,
  paragraphWithMultipleMarks,
  paragraphWithLink,
  quote,
  orderedList,
  unorderedList,
  codeBlock,
  hr,
  br,
  image,
  document,
  emptyDocument,
  invalidNode,
  component
}
