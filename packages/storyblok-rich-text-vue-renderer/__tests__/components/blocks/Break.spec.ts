import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbBreak } from '../../../src/components';
import { createVueInstance } from '../..';

describe('Break.vue', () => {
  const localVue = createVueInstance();
  let mountFunction: (options?: object) => Wrapper<Vue>;

  beforeEach(() => {
    mountFunction = (options) => {
      return shallowMount(SbBreak, {
        localVue,
        ...options,
      });
    };
  });

  test('renders template', () => {
    const wrapper = mountFunction();

    expect(wrapper.html()).toMatchSnapshot();
  });
});
