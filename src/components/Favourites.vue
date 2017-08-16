<template>
  <div class="column col-2">
    <h4>Favourites</h4>
    <dl v-for="(scrape, key) in favourites">
      <div class="columns">
        <div class="column col-10">
          <dt>{{ new Date(scrape.timeStamp).toLocaleString() }}</dt>
        </div>
        <div class="column col-2" @click="unFavourite(key)">
          <i class="icon icon-cross"></i>
        </div>
      </div>
      <dd>{{ scrape.url }}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  computed: {
    scrapes() {
      return this.$store.getters.scrapes
    },
    favourites() {
      let result = {}
      for (let scrape in this.scrapes) {
        if (this.scrapes.hasOwnProperty(scrape) && this.scrapes[scrape].fav) {
          result[scrape] = this.scrapes[scrape]
        }
      }
      return result
    }
  },
  methods: {
    unFavourite(key) {
      this.$store.commit('toggleScrapeFav', key)
    }
  }
}
</script>

<style lang="css">
</style>
