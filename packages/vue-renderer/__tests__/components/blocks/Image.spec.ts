import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbImage } from '../../../src/components';
import { createVueInstance } from '../..';

describe('Image.vue', () => {
  let localVue: typeof Vue;
  let mountFunction: (options?: object) => Wrapper<Vue>;

  const attrs = {
    src: 'my-image.jpg',
    alt: 'Awesome image',
    title: 'My awesome Vue.js image',
  };

  beforeEach(() => {
    localVue = createVueInstance();

    mountFunction = (options) => {
      return shallowMount(SbImage, {
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

  test('renders with attributes', () => {
    const wrapper = mountFunction({
      propsData: {
        attrs,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
