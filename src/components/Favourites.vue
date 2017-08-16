<template>
  <div class="column col-2">
    <h4>Favourites</h4>
    <dl v-for="(scrape, index) in favourites">
      <div class="columns">
        <div class="column col-10">
          <dt>{{ new Date(scrape.timeStamp).toLocaleString() }}</dt>
        </div>
        <div class="column col-2" @click="unFavourite(index)">
          <i v-if="scrape.fav" class="icon icon-cross"></i>
        </div>
      </div>
      <dd>{{ scrape.url }}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  computed: {
    favourites() {
      return this.$store.getters.scrapes.filter((scrape)=>{
        return scrape.fav == true
      })
    }
  },
  methods: {
    unFavourite(i) {
      this.$store.commit('unFavourite', i)
    }
  }
}
</script>

<style lang="css">
</style>
