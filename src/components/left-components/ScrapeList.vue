<template lang="html">
  <div class="q-scrape-list">
    <dl v-for="(scrape, index) in scrapes">
      <div class="columns">
        <div class="column col-10">
          <dt>{{ new Date(scrape.timeStamp).toLocaleString() }}</dt>
        </div>
        <div class="column col-1 tooltip tooltip-left" data-tooltip="Delete">
          <i class="icon icon-delete q-list-icon"></i>
        </div>
        <div class="column col-1 tooltip tooltip-left" data-tooltip="Un/favourite">
          <i  v-if="scrape.fav"
              class="icon icon-bookmark q-bookmark-active q-list-icon"
              @click="toggleFavourite(index)"></i>
          <i v-else class="icon icon-bookmark q-list-icon" @click="toggleFavourite(index)">hello</i>
        </div>
      </div>
      <dd class="q-fake-link text-ellipsis" @click="expandScrape(index)">{{ scrape.url }}</dd>
    </dl>
  </div>
</template>

<script>

import { EventBus } from '../../main.js';

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
      if (!this.$store.getters.currentScrape || this.$store.getters.currentScrape.id !== this.scrapes[i].id) {
        this.$store.commit('setCurrentScrape', this.scrapes[i])
      } else {
        this.$store.commit('setCurrentScrape', null)
      }
    },
    toggleFavourite(i) {
      this.$store.commit('toggleScrapeFav', i)
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

.q-list-icon {
  margin-left: 0.5rem;
}

.q-fake-link {
  cursor: pointer;
}

.q-fake-link:hover {
  color: gold;
}

</style>
