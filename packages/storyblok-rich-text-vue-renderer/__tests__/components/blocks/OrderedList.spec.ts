import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbOrderedList } from '../../../src/components';
import { createVueInstance } from '../..';

describe('OrderedList.vue', () => {
  const localVue = createVueInstance();
  let mountFunction: (options?: object) => Wrapper<Vue>;

  beforeEach(() => {
    mountFunction = (options) => {
      return shallowMount(SbOrderedList, {
        localVue,
        ...options,
      });
    };
  });

  test('renders template with default slot', () => {
    const slot = 'Ordered List';
    const wrapper = mountFunction({
      slots: {
        default: [slot],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
