import Vue from 'vue'
import VueRichTextRenderer from './plugin'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueRichTextRenderer)

new Vue({
  render: h => h(App)
}).$mount('#app')
