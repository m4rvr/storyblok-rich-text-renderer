import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { plugin } from '@marvr/storyblok-rich-text-vue-renderer'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./routes/index.vue'),
    },
  ],
})

const app = createApp(App)
app.use(router)
app.use(plugin())
app.mount('#app')
