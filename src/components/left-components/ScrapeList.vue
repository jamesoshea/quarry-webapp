<template lang="html">
  <div class="q-scrape-list">
    <dl v-for="(scrape, key) in scrapes">
      <div class="columns">
        <div class="column col-11">
          <dt>{{ new Date(scrape.timeStamp).toLocaleString() }}</dt>
        </div>
        <div class="column col-1" @click="toggleFavourite(key)">
          <i v-if="scrapes[key].fav" class="icon icon-bookmark q-bookmark-active"></i>
          <i v-else class="icon icon-bookmark"></i>
        </div>
      </div>
      <dd @click="expandScrape(key)">{{ scrape.url }}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    scrapes() {
      return this.$store.getters.scrapes
    }
  },
  methods: {
    expandScrape(key) {
      if(!this.$store.getters.currentScrape) {
        this.$store.commit('setCurrentScrape', this.scrapes[key])
      } else {
        this.$store.commit('setCurrentScrape', null)
      }
    },
    toggleFavourite(key) {
      this.$store.commit('toggleScrapeFav', key)
    }
  }
}
</script>

<style lang="css">

.q-scrape-list {
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.q-bookmark-active {
  color: gold;
}

</style>
