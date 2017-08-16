<template lang="html">
  <div>
    <div v-if="currentScrape">
      <h5>{{new Date(currentScrape.timeStamp).toLocaleString()}}</h5>
      <p>{{currentScrape.url}}</p>
      <table class="table table-striped table-hover q-table">
        <thead>
          <tr>
            <th v-for="(column, index) in currentScrape.rows[0]">{{ column }} ({{ currentScrape.rows[1][index] }})</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in currentScrape.rows.slice(2, currentScrape.rows.length).reverse()">
            <td v-for="item in row">{{ item }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <h5 v-if="scrapes">Select a scrape by clicking its URL above</h5>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    currentScrape() {
      return this.$store.getters.currentScrape
    },
    scrapes() {
      return this.$store.getters.scrapes
    }
  },
  methods: {

  }
}
</script>

<style lang="css">
</style>
