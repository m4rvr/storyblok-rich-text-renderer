import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbHeading } from '../../../src/components';
import { createVueInstance } from '../..';

describe('Heading.vue', () => {
  const localVue = createVueInstance();
  let mountFunction: (options?: object) => Wrapper<Vue>;

  const attrs = {
    level: 1,
  };

  beforeEach(() => {
    mountFunction = (options) => {
      return shallowMount(SbHeading, {
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

  test('renders tag with passed level prop', () => {
    const slot = 'Headline 1';
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
