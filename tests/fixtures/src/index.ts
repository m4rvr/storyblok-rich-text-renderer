import Vue from 'vue';
import App from './App.vue';
import VueCompositionApi from '@vue/composition-api';
import RichTextRenderer from '@marvinrudolph/vue-storyblok-rich-text-renderer';
import { Block } from '@marvinrudolph/storyblok-rich-text-types';
import CustomParagraph from './CustomParagraph.vue';

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(RichTextRenderer, {
  resolvers: {
    blocks: {
      [Block.PARAGRAPH]: CustomParagraph,
    },
  },
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
