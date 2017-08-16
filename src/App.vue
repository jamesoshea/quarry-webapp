<template>
  <div id="app">
    <h1 id="q-main-msg">{{msg}}</h1>
    <div class="columns">
      <div class="column col-10">
        <router-view>
        </router-view>
      </div>
      <favourites></favourites>
    </div>
  </div>
</template>

<script>
import Favourites from './components/Favourites.vue'

export default {
  name: 'app',
  components: {
    'favourites': Favourites
  },
  data () {
    return {
      msg: 'Quarry'
    }
  },
  methods: {
  }
}
</script>

<style scoped>

#app {
  width: 80%;
  margin: auto;
}

#q-main-msg {
  text-align: center;
}

.centre {
  text-align: center;
}

</style>
