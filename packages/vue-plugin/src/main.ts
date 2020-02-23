import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import VueRichTextRenderer from '@/plugin'
import App from '@/App.vue'
import RichTextRenderer from '@/components/RichTextRenderer.vue'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(VueRichTextRenderer)

new Vue({
  render: h => h(App)
}).$mount('#app')

export default RichTextRenderer
