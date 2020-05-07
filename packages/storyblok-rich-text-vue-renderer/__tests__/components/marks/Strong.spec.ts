import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbStrong } from '../../../src/components';
import { createVueInstance } from '../..';

describe('Strong.vue', () => {
  let localVue: typeof Vue;
  let mountFunction: (options?: object) => Wrapper<Vue>;

  beforeEach(() => {
    localVue = createVueInstance();

    mountFunction = (options) => {
      return shallowMount(SbStrong, {
        localVue,
        ...options,
      });
    };
  });

  test('renders template with default slot', () => {
    const slot = 'Strong';
    const wrapper = mountFunction({
      slots: {
        default: [slot],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
