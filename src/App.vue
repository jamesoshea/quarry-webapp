<template>
  <div id="app">
    <div class="columns">
      <div class="column col-10">
        <h3 id="q-main-msg">{{msg}}</h3>
        <router-view>
        </router-view>
      </div>
      <div class="column col-2">
        <h3>Favourites</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
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

#q-main-msg {
  text-align: center;
}

</style>
