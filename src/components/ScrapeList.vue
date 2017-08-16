<template lang="html">
  <div class="q-scrape-list">
    <dl v-for="(scrape, index) in scrapes">
      <dt>{{ new Date(scrape.timeStamp).toLocaleString() }}</dt>
      <dd @click="expandScrape(index)">{{ scrape.url }}</dd>
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
    expandScrape(i) {
      if(!this.$store.getters.currentScrape) {
        this.$store.commit('setCurrentScrape', this.scrapes[i])
      } else {
        this.$store.commit('setCurrentScrape', null)
      }
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

</style>
