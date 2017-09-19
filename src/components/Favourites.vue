<template>
  <div v-if="loggedIn">
    <h4>Favourites</h4>
    <dl v-for="(scrape, index) in favourites">
      <div class="columns">
        <div class="column col-10">
          <dt>{{ new Date(scrape.timeStamp).toLocaleString() }}</dt>
        </div>
        <div class="column col-2 tooltip tooltip-left" data-tooltip="Unfavourite" @click="unFavourite(index)">
          <i v-if="scrape.fav" class="icon icon-cross"></i>
        </div>
      </div>
      <dd class="q-fake-link text-ellipsis" @click="findFav(scrape.id)">{{ scrape.url }}</dd>
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
    },
    scrapes() {
      return this.$store.getters.scrapes
    },
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  },
  methods: {
    unFavourite(i) {
      this.$store.commit('toggleScrapeFav', i)
    },
    findFav(id) {
      this.$store.commit('setCurrentScrape', this.scrapes.find(x => x.id === id))
    }
  }
}
</script>

<style lang="scss">

@import '../css/variables';

.q-fake-link {
  cursor: pointer;
}

.q-fake-link:hover {
  color: $primary-color;
}

</style>
