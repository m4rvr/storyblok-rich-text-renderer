import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import { plugin } from '.'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [],
})

const app = createApp(App)
app.use(plugin())
app.use(router)
app.mount('#app')
