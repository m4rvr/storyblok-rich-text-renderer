import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbHorizontalRule } from '../../../src/components';
import { createVueInstance } from '../..';

describe('HorizontalRule.vue', () => {
  let localVue: typeof Vue;
  let mountFunction: (options?: object) => Wrapper<Vue>;

  beforeEach(() => {
    localVue = createVueInstance();

    mountFunction = (options) => {
      return shallowMount(SbHorizontalRule, {
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
