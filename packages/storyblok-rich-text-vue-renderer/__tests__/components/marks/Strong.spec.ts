import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbStrong } from '../../../src/components';
import { createVueInstance } from '../..';

describe('Strong.vue', () => {
  const localVue = createVueInstance();
  let mountFunction: (options?: object) => Wrapper<Vue>;

  beforeEach(() => {
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
