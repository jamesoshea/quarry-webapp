<template lang="html">
  <div>
    <div v-if="currentScrape" class="q-scrape-main">
      <div v-if="!currentScrape.rows">
        <div class="empty">
          <div class="empty-icon">
            <i class="icon icon-search"></i>!?
          </div>
          <p class="empty-title h5">This scrape is empty.</p>
          <p class="empty-subtitle">Click here to delete this scrape.</p>
          <div class="empty-action">
            <button class="btn btn-primary"
                    @click="deleteEmptyScrape">Delete</button>
          </div>
        </div>
      </div>
      <div v-else class="q-scrape">
        <h5 class="q-centre">{{new Date(currentScrape.timeStamp).toLocaleString()}}</h5>
        <p class="text-ellipsis q-url">{{currentScrape.url}}</p>
        <export-file></export-file>
        <div class="q-centre">
          <button class="btn btn-primary q-rerun-button"
                  @click="rerun(currentScrape.id)"
                  name="button">Run Again</button>
          <button class="btn btn-primary q-rerun-button"
                  @click="scheduleRerun(currentScrape.id)"
                  name="button">Schedule a Run</button>
        </div>
        <table class="table table-striped table-hover q-table">
          <thead>
            <tr>
              <th v-for="(column, index) in currentScrape.rows[0]">
                <div class="text-break">{{ column }} ({{ currentScrape.rows[1][index] }})</div>
                <div class="columns">
                  <div class="column col-1 tooltip tooltip-left" data-tooltip="Sort Ascending">
                    <i class="icon icon-arrow-up q-fake-link" @click="sortRows('asc', index)"></i>
                  </div>
                  <div class="column col-1 tooltip tooltip-left" data-tooltip="Sort Descending">
                    <i class="icon icon-arrow-down q-fake-link" @click="sortRows('desc', index)"></i>
                  </div>
                </div>
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
    </div>
    <div v-if="scrapes.length && !currentScrape" class="empty">
      <div class="empty-icon">
        <i class="icon icon-search"></i>
      </div>
      <p class="empty-title h5">Select a scrape by clicking above.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ExportFile from './ExportFile.vue'

export default {
  data() {
    return {
      showScheduler: false,
      cronString: ''
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
    deleteEmptyScrape() {
      this.$store.commit('deleteScrape', this.currentScrape.id)
    },
    sortRows(dir, i) {
      let result = []
      result[0] = this.currentScrape.rows[0]
      result[1] = this.currentScrape.rows[1]
      let len = this.currentScrape.rows.length
      let input = this.currentScrape.rows.slice(2, len)
      let output = input.sort((a, b)=> {
        if (dir === 'asc') {
          return a[i].toLowerCase() - b[i].toLowerCase()
        } else if (dir === 'desc') {
          return b[i].toLowerCase() - a[i].toLowerCase()
        }
      })
      for (var i = 0; i < output.length; i++) {
        result[i + 2] = output[i]
      }
      this.currentScrape.rows = result
    },
    rerun(id) {
      const self = this
      axios.get('http://quarry-17.herokuapp.com/scrapes/rerun/' + this.$store.getters.userId + '/' + this.currentScrape.id)
//      axios.get('http://localhost:3000/scrapes/rerun/' + this.$store.getters.userId + '/' + this.currentScrape.id)
      .then(function (response) {
        self.$store.commit('setScrapes', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    scheduleRerun(id) {
      let cronString = prompt('enter cron string')
      this.cronString = cronString
      const self = this
      axios.post('http://quarry-17.herokuapp.com/scrapes/scheduleRerun/' + this.$store.getters.userId + '/' + this.currentScrape.id, {
//      axios.post('http://localhost:3000/scrapes/scheduleRerun/' + this.$store.getters.userId + '/' + this.currentScrape.id, {
        cronString: cronString
      })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.q-scrape-main {
  background-color: #f8f9fa;
  margin-top: 1.5em;
  padding: 1.5em;
}

.q-scrape {
  padding-top: 2em;
  color: #727e96;
}

.q-rerun-button {
  margin-top: 0.5em;
}

.q-url {
  margin-top: 1em;
  text-align: center;
}

#q-select-message {
  padding: 1.5em;
}

</style>
