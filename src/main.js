import Vue from 'vue'
import App from './App.vue'

import store from './store.js';
import router from './routes.js';

new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App)
})
