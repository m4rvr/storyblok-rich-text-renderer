import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbUnderline } from '../../../src/components';
import { createVueInstance } from '../..';

describe('Underline.vue', () => {
  let localVue: typeof Vue;
  let mountFunction: (options?: object) => Wrapper<Vue>;

  beforeEach(() => {
    localVue = createVueInstance();

    mountFunction = (options) => {
      return shallowMount(SbUnderline, {
        localVue,
        ...options,
      });
    };
  });

  test('renders template with default slot', () => {
    const slot = 'Underline';
    const wrapper = mountFunction({
      slots: {
        default: [slot],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
