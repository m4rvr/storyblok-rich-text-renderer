import { createApp, h } from 'vue';
import App from './App.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { plugin  } from './plugin';
import CustomComponent from './components/CustomComponent.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [],
});

const app = createApp(App);
app.use(plugin({
  resolvers: {
    components: {
      'custom-component': () => h(CustomComponent)
    }
  }
}));
app.use(router);
app.mount('#app');
