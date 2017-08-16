import Vue from 'vue'
import VueRouter from 'vue-router'

import { store } from './store/store'

import App from './App.vue'
import Welcome from './components/Welcome.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Welcome }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
