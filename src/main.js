import Vue from 'vue'
import VueRouter from 'vue-router'

import { store } from './store/store'

import App from './App.vue'
import Left from './components/Left.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Left }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  beforeMount() {
    if (localStorage.getItem('userId')) {
      store.commit('setUser', localStorage.getItem('userId'))
    }
  }
})
