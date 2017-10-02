<template lang="html">
  <div class="q-scrape-list" v-if="scrapes.length">
    <div class="columns">
      <div class="column col-2" id="q-scrapes-heading">
        <h4>Scrapes</h4>
      </div>
      <div class="column col-1 tooltip tooltip-left q-scrape-list-arrows" data-tooltip="Sort Ascending">
        <i class="icon icon-arrow-up q-fake-link" @click="sortScrapes('asc')"></i>
      </div>
      <div class="column col-1 tooltip tooltip-left q-scrape-list-arrows" data-tooltip="Sort Descending">
        <i class="icon icon-arrow-down q-fake-link" @click="sortScrapes('desc')"></i>
      </div>
    </div>
    <dl v-for="(scrape, index) in scrapes">
      <div class="columns">
        <div class="column col-10">
          <dt class="q-scrape-dates">{{ new Date(scrape.timeStamp).toLocaleString() }}</dt>
        </div>
        <div class="column col-1 tooltip tooltip-left" data-tooltip="Delete">
          <i  class="icon icon-delete q-fake-link"
              @click="deleteScrape(index)"></i>
        </div>
        <div class="column col-1 tooltip tooltip-left" data-tooltip="Un/favourite">
          <i  v-if="scrape.fav"
              class="icon icon-bookmark q-bookmark-active"
              @click="toggleFavourite(index)"></i>
          <i  v-else
              class="icon icon-bookmark q-fake-link"
              @click="toggleFavourite(index)">hello</i>
        </div>
      </div>
      <dd class="q-fake-link text-ellipsis"
          @click="expandScrape(index)"
          >
          {{ scrape.url }}
      </dd>
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
		deleteScrape(i) {
			this.$store.commit('deleteScrape', this.scrapes[i].id)
		},
		expandScrape(i) {
			if (!this.$store.getters.currentScrape || this.$store.getters.currentScrape.id !== this.scrapes[i].id) {
				this.$store.commit('setCurrentScrape', this.scrapes[i])
			} else {
				this.$store.commit('setCurrentScrape', null)
			}
		},
		sortScrapes(dir) {
			this.$store.commit('sortScrapes', dir)
		},
		toggleFavourite(i) {
			this.$store.commit('toggleScrapeFav', i)
		}
	}
}

</script>

<style lang="scss" scoped>

@import '../../css/variables';

.q-scrape-list-arrows {
  padding-top: 0.5em;
}

.q-scrape-list {
  padding: 1.5em;
  padding-top: 0em;
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.q-bookmark-active {
  cursor: pointer;
  color: $primary-color;
  &:hover {
    color: lighten($dark-color, 5%);
  }
}

#q-scrapes-heading {
  margin-right: 2em;
}

</style>
