<template lang="html">
  <div class="q-scrape-main">
    <div v-if="currentScrape">
      <h5 class="centre">{{new Date(currentScrape.timeStamp).toLocaleString()}}</h5>
      <p class="text-ellipsis">{{currentScrape.url}}</p>
      <export-file></export-file>
      <table class="table table-striped table-hover q-table">
        <thead>
          <tr>
            <th v-for="(column, index) in currentScrape.rows[0]">
              <div class="text-break">{{ column }} ({{ currentScrape.rows[1][index] }})</div>
              <i class="icon icon-arrow-up q-hover-active" @click="sortRows('asc', index)"></i>
              <i class="icon icon-arrow-down q-hover-active" @click="sortRows('desc', index)"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in currentScrape.rows.slice(2, currentScrape.rows.length).reverse()">
            <td class="text-break" v-for="item in row">{{ item }}</td>
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

import ExportFile from './ExportFile.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    exportFile: ExportFile
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
    sortRows(dir, i) {
      let result = []
      result[0] = this.currentScrape.rows[0]
      result[1] = this.currentScrape.rows[1]
      let len = this.currentScrape.rows.length
      let input = this.currentScrape.rows.slice(2, len)
      let output = input.sort((a, b)=> {
        if (dir === 'asc') {
          return a[i] - b[i]
        } else if (dir === 'desc') {
          return a[i] + b[i]
        }
      })
      for (var i = 0; i < output.length; i++) {
        result[i + 2] = output[i]
      }
      this.currentScrape.rows = result
    }
  }
}
</script>

<style>

.q-scrape-main {
  margin-top: 1.5rem;
}

.centre {
  text-align: center;
}

.q-fake-link {
  cursor: pointer;
}

.q-hover-active:hover {
  color: gold;
}

</style>
