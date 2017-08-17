<template>
  <div class="q-no-overflow">
    <welcome></welcome>
    <scrape-list></scrape-list>
    <div class="divider"></div>
    <display-scrape></display-scrape>
  </div>
</template>

<script>

import Welcome from './left-components/Welcome.vue'
import DisplayScrape from './left-components/DisplayScrape.vue'
import ScrapeList from './left-components/ScrapeList.vue'

export default {
  components: {
    'welcome': Welcome,
    'scrape-list': ScrapeList,
    'display-scrape': DisplayScrape
  }
}
</script>

<style scoped>

.q-input-id {
  width: 60%;
}

.q-table {
  width: 90%;
  margin: auto;
}

</style>
