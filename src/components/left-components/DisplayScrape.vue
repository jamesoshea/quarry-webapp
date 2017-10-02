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
                  @click="rerunModalActive = true"
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
    <div :class="{active: rerunModalActive}" class="modal">
      <div class="modal-overlay"></div>
      <div class="modal-container">
        <div class="modal-header">
          <button class="btn btn-clear float-right q-fake-link" @click="rerunModalActive = false"></button>
          <div class="modal-title h5">Schedule Reruns</div>
        </div>
        <div class="modal-body">
          <div class="content q-centre">
            <h2>Have this scraped:</h2>
            <div class="form-group">
              <form class="q-centre">
                <label class="form-radio q-centre">
                  <input type="radio" v-model="frequency" value="daily" checked>
                  <i class="form-icon"></i> Daily
                </label><br />
                <label class="form-radio q-centre">
                  <input type="radio" v-model="frequency" value="weekly">
                  <i class="form-icon"></i> Weekly
                </label>
              </form>
              <button id="rerun-submit" class="btn btn-primary" @click="scheduleRerun">Noice</button>
              <p v-if="rerunErrorMessage">{{ rerunErrorMessage }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ExportFile from './ExportFile.vue'

export default {
  data() {
    return {
      rerunModalActive: false,
      rerunErrorMessage: '',
      frequency: null
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
      const self = this
      axios.post('http://quarry-17.herokuapp.com/scrapes/scheduleRerun/' + this.$store.getters.userId + '/' + this.currentScrape.id, {
//      axios.post('http://localhost:3000/scrapes/scheduleRerun/' + this.$store.getters.userId + '/' + this.currentScrape.id, {
        freq: this.frequency
      })
      .then(function (response) {
        console.log(response)
        self.rerunModalActive = false
        self.rerunErrorMessage = ''
      })
      .catch(function (error) {
        console.log(error)
        self.rerunErrorMessage = 'There has been an error. Please try again.'
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

#rerun-submit {
  margin-top: 1em;
}

</style>
