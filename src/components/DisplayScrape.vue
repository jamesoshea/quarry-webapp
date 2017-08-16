<template lang="html">
  <div>
    <div v-if="currentScrape">
      <h5>URL:</h5>
      <p>{{currentScrape.url}}</p>
      <p>{{Date(currentScrape.timeStamp).toLocaleString()}}</p>
      <table class="table table-striped table-hover q-table">
        <thead>
          <tr>
            <th v-for="(column, index) in currentScrape.rows[0]">{{ column }} ({{ currentScrape.rows[1][index] }})</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in currentScrape.rows.slice(2, currentScrape.rows.length)">
            <td v-for="item in row">{{ item }}</td>
          </tr>
        </tbody>
      </table>
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
    }
  },
  methods: {

  }
}
</script>

<style lang="css">
</style>
