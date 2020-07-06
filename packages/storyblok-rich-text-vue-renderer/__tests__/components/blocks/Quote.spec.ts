import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbQuote } from '../../../src/components';
import { createVueInstance } from '../..';

describe('Quote.vue', () => {
  const localVue = createVueInstance();
  let mountFunction: (options?: object) => Wrapper<Vue>;

  beforeEach(() => {
    mountFunction = (options) => {
      return shallowMount(SbQuote, {
        localVue,
        ...options,
      });
    };
  });

  test('renders template with default slot', () => {
    const slot = 'Quote';
    const wrapper = mountFunction({
      slots: {
        default: [slot],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
