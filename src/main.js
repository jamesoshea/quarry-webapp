import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Welcome from './components/Welcome.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Welcome }
]

const router = new VueRouter({routes})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
