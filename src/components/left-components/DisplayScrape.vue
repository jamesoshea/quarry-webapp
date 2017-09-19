<template lang="html">
  <div class="q-scrape-main">
    <div v-if="currentScrape">
      <div class="columns">
        <div class="column col-4">

        </div>
        <div class="column col-4 q-time-bar">
          <h5 class="centre">{{new Date(currentScrape.timeStamp).toLocaleString()}}</h5>
        </div>
        <div class="column col-4">
          <button class="btn centre q-action-button"  @click="rerun(currentScrape.id)" name="button">Run Again</button>
        </div>
      </div>
      <p class="text-ellipsis">{{currentScrape.url}}</p>
      <export-file></export-file>
      <table class="table table-striped table-hover q-table">
        <thead>
          <tr>
            <th v-for="(column, index) in currentScrape.rows[0]">
              <div class="text-break">{{ column }} ({{ currentScrape.rows[1][index] }})</div>
              <div class="columns">
                <div class="column col-1 tooltip tooltip-left" data-tooltip="Sort Ascending">
                  <i class="icon icon-arrow-up q-hover-active" @click="sortRows('asc', index)"></i>
                </div>
                <div class="column col-1 tooltip tooltip-left" data-tooltip="Sort Descending">
                  <i class="icon icon-arrow-down q-hover-active" @click="sortRows('desc', index)"></i>
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
    <div v-else>
      <h5 v-if="scrapes.length">Select a scrape by clicking its URL above</h5>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
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
//      axios.get('http://quarry-17.herokuapp.com/scrapes/rerun/' + this.$store.getters.userId + '/' + this.currentScrape.id)
      axios.get('http://localhost:3000/scrapes/rerun/' + this.$store.getters.userId + '/' + this.currentScrape.id)
      .then(function (response) {
        self.$store.commit('setScrapes', response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
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

.q-time-bar {
  padding-top: 0.25rem;
}

.q-action-button {
  border-color: #000;
  color: #000;
}

.q-action-button:hover {
  transform: scale(1.1);
  border-color: gold;
  background-color: #FFF;
  color: #000;
}

.q-fake-link {
  cursor: pointer;
}

.q-hover-active:hover {
  color: gold;
}

</style>
