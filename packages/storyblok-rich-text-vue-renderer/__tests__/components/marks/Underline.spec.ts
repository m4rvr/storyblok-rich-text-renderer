import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbUnderline } from '../../../src/components';
import { createVueInstance } from '../..';

describe('Underline.vue', () => {
  const localVue = createVueInstance();
  let mountFunction: (options?: object) => Wrapper<Vue>;

  beforeEach(() => {
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
