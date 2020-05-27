import { createLocalVue } from '@vue/test-utils';
import CompositionApi from '@vue/composition-api';
import {
  HeadingNode,
  ParagraphNode,
  Block,
  Mark,
  TextNode,
  TextType,
  MarkNode,
  StrongNode,
  UnderlineNode,
  ComponentNode,
  ComponentType,
} from '@marvr/storyblok-rich-text-types';

export function createVueInstance() {
  const localVue = createLocalVue();
  localVue.use(CompositionApi);
  return localVue;
}

function createTextNode(text: string, marks: MarkNode[] = []): TextNode {
  return {
    type: TextType,
    text,
    marks,
  };
}

export const headingNode: HeadingNode = {
  type: Block.HEADING,
  attrs: {
    level: 1,
  },
  content: [createTextNode('Heading')],
};

export const paragraphNode: ParagraphNode = {
  type: Block.PARAGRAPH,
  content: [createTextNode('Paragraph')],
};

const strongMark: StrongNode = {
  type: Mark.STRONG,
};

const underlineMark: UnderlineNode = {
  type: Mark.UNDERLINE,
};

export const paragraphNodeWithStrongMark: ParagraphNode = {
  type: Block.PARAGRAPH,
  content: [createTextNode('Para'), createTextNode('graph', [strongMark])],
};

export const paragraphNodeWithMultipleMarks: ParagraphNode = {
  type: Block.PARAGRAPH,
  content: [
    createTextNode('Para'),
    createTextNode('graph', [strongMark, underlineMark]),
  ],
};

export const componentNode: ComponentNode = {
  type: ComponentType,
  attrs: {
    id: '123',
    body: [
      {
        sub: [],
        _uid: '1',
        title: 'Second button!',
        component: 'button',
      },
      {
        sub: [],
        _uid: '2',
        title: 'My Button ',
        component: 'button',
      },
    ],
  },
};
