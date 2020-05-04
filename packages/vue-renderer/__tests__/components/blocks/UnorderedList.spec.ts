import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbUnorderedList } from '../../../src/components';
import { createVueInstance } from '../..';

describe('UnorderedList.vue', () => {
  let localVue: typeof Vue;
  let mountFunction: (options?: object) => Wrapper<Vue>;

  beforeEach(() => {
    localVue = createVueInstance();

    mountFunction = (options) => {
      return shallowMount(SbUnorderedList, {
        localVue,
        ...options,
      });
    };
  });

  test('renders template with default slot', () => {
    const slot = 'Unordered List';
    const wrapper = mountFunction({
      slots: {
        default: [slot],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
