import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbParagraph } from '../../../src/components';
import { createVueInstance } from '../..';

describe('Paragraph.vue', () => {
  const localVue = createVueInstance();
  let mountFunction: (options?: object) => Wrapper<Vue>;

  beforeEach(() => {
    mountFunction = (options) => {
      return shallowMount(SbParagraph, {
        localVue,
        ...options,
      });
    };
  });

  test('renders template with default slot', () => {
    const slot = 'Paragraph';
    const wrapper = mountFunction({
      slots: {
        default: [slot],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
