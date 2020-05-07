import Vue from 'vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import { SbListItem } from '../../../src/components';
import { createVueInstance } from '../..';

describe('ListItem.vue', () => {
  let localVue: typeof Vue;
  let mountFunction: (options?: object) => Wrapper<Vue>;

  beforeEach(() => {
    localVue = createVueInstance();

    mountFunction = (options) => {
      return shallowMount(SbListItem, {
        localVue,
        ...options,
      });
    };
  });

  test('renders template with default slot', () => {
    const slot = 'List Item';
    const wrapper = mountFunction({
      slots: {
        default: [slot],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
