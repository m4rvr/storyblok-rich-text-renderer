import Vue from 'vue';
import { shallowMount, mount } from '@vue/test-utils';
import { RichTextRenderer } from '../../src/components';
import {
  createVueInstance,
  paragraphNode,
  headingNode,
  paragraphNodeWithStrongMark,
  paragraphNodeWithMultipleMarks,
  componentNode,
} from '..';
import CustomButton from './CustomButton.vue';
import CustomParagraph from './CustomParagraph.vue';
import { Block } from '@marvinrudolph/storyblok-rich-text-types';

describe('RichTextRenderer.vue', () => {
  let localVue: typeof Vue;

  const WrapperComponent = {
    components: {
      RichTextRenderer,
    },
    template: `
      <div>
        <rich-text-renderer v-bind="$attrs" />
      </div>
    `,
  };

  beforeEach(() => {
    localVue = createVueInstance();
  });

  test('renders single paragraph node', () => {
    const wrapper = shallowMount(RichTextRenderer, {
      localVue,
      propsData: {
        document: paragraphNode,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders multiple paragraph nodes', () => {
    const wrapper = mount(WrapperComponent, {
      localVue,
      propsData: {
        document: [paragraphNode, paragraphNode],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders multiple different nodes', () => {
    const wrapper = mount(WrapperComponent, {
      localVue,
      propsData: {
        document: [headingNode, paragraphNode],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders paragraph with strong mark', () => {
    const wrapper = mount(WrapperComponent, {
      localVue,
      propsData: {
        document: paragraphNodeWithStrongMark,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders paragraph with multiple marks', () => {
    const wrapper = mount(WrapperComponent, {
      localVue,
      propsData: {
        document: paragraphNodeWithMultipleMarks,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders custom storyblok component', () => {
    const wrapper = mount(WrapperComponent, {
      localVue,
      propsData: {
        document: componentNode,
        options: {
          resolvers: {
            components: {
              button: CustomButton,
            },
          },
        },
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders custom paragraph', () => {
    const wrapper = mount(WrapperComponent, {
      localVue,
      propsData: {
        document: componentNode,
        options: {
          resolvers: {
            blocks: {
              [Block.PARAGRAPH]: CustomParagraph,
            },
          },
        },
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
