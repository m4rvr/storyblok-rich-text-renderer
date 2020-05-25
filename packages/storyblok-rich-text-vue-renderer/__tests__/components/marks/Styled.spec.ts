import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbStyled } from '../../../src/components';
import { createVueInstance } from '../..';

describe('Styled.vue', () => {
  let localVue: typeof Vue;
  let mountFunction: (options?: object) => Wrapper<Vue>;

  const attrs = {
    class: 'css-class',
  };

  beforeEach(() => {
    localVue = createVueInstance();

    mountFunction = (options) => {
      return shallowMount(SbStyled, {
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
    const slot = 'Styled';
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
