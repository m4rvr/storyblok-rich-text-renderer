import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbItalic } from '../../../src/components';
import { createVueInstance } from '../..';

describe('Italic.vue', () => {
  let localVue: typeof Vue;
  let mountFunction: (options?: object) => Wrapper<Vue>;

  beforeEach(() => {
    localVue = createVueInstance();

    mountFunction = (options) => {
      return shallowMount(SbItalic, {
        localVue,
        ...options,
      });
    };
  });

  test('renders template with default slot', () => {
    const slot = 'Italic';
    const wrapper = mountFunction({
      slots: {
        default: [slot],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
