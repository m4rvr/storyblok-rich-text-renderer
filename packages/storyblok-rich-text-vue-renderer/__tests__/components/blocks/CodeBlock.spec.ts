import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbCodeBlock } from '../../../src/components';
import { createVueInstance } from '../..';

describe('CodeBlock.vue', () => {
  let localVue: typeof Vue;
  let mountFunction: (options?: object) => Wrapper<Vue>;

  const attrs = {
    class: 'language-javascript',
  };

  beforeEach(() => {
    localVue = createVueInstance();

    mountFunction = (options) => {
      return shallowMount(SbCodeBlock, {
        localVue,
        ...options,
      });
    };
  });

  test('receives attributes', () => {
    const wrapper = mountFunction({
      propsData: {
        attrs,
      },
    });

    expect(wrapper.props().attrs).toBe(attrs);
  });

  test('renders html with passed class', () => {
    const slot = 'Code Block';
    const wrapper = mountFunction({
      propsData: {
        attrs,
      },
      slots: {
        default: [slot],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
