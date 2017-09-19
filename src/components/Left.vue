<template>
  <div class="q-no-overflow">
    <scrape-list></scrape-list>
    <display-scrape></display-scrape>
  </div>
</template>

<script>

import DisplayScrape from './left-components/DisplayScrape.vue'
import ScrapeList from './left-components/ScrapeList.vue'

export default {
  components: {
    'scrape-list': ScrapeList,
    'display-scrape': DisplayScrape
  }
}
</script>

<style lang="scss" scoped>

.q-input-id {
  width: 60%;
}

.q-table {
  width: 90%;
  margin: auto;
}

</style>
