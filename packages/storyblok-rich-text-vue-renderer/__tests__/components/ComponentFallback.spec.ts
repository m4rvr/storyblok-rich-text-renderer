import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbComponentFallback } from '../../src/components';
import { createVueInstance } from '..';

describe('ComponentFallback.vue', () => {
  const localVue = createVueInstance();
  let mountFunction: (options?: object) => Wrapper<Vue>;

  const body = {
    component: 'button',
  };

  beforeEach(() => {
    mountFunction = (options) => {
      return shallowMount(SbComponentFallback, {
        localVue,
        ...options,
      });
    };
  });

  test('receives body prop', () => {
    const wrapper = mountFunction({
      propsData: {
        body,
      },
    });

    expect(wrapper.props().body).toBe(body);
  });

  test('renders with passed component name', () => {
    const wrapper = mountFunction({
      propsData: {
        body,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
