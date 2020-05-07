import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbBold } from '../../../src/components';
import { createVueInstance } from '../..';

describe('Bold.vue', () => {
  let localVue: typeof Vue;
  let mountFunction: (options?: object) => Wrapper<Vue>;

  beforeEach(() => {
    localVue = createVueInstance();

    mountFunction = (options) => {
      return shallowMount(SbBold, {
        localVue,
        ...options,
      });
    };
  });

  test('renders template with default slot', () => {
    const slot = 'Bold';
    const wrapper = mountFunction({
      slots: {
        default: [slot],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
