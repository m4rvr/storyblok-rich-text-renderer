import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbLink } from '../../../src/components';
import { createVueInstance } from '../..';

describe('Link.vue', () => {
  const localVue = createVueInstance();
  let mountFunction: (options?: object) => Wrapper<Vue>;

  const attrs = {
    src: 'my-image.jpg',
    alt: 'Awesome image',
    title: 'My awesome Vue.js image',
  };

  beforeEach(() => {
    mountFunction = (options) => {
      return shallowMount(SbLink, {
        localVue,
        ...options,
      });
    };
  });

  test('receives attributes', () => {
    const wrapper = mountFunction({
      propsData: {
        attrs,
      },
    });

    expect(wrapper.props().attrs).toBe(attrs);
  });

  test('renders template with attributes & default slot', () => {
    const slot = 'Link';
    const wrapper = mountFunction({
      propsData: {
        attrs,
      },
      slots: {
        default: [slot],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
