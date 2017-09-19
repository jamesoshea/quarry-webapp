<template lang="html">
  <div class="q-scrape-main">
    <div v-if="currentScrape">
      <div v-if="!currentScrape.rows">
        <p class="q-centre">This scrape is empty</p>
      </div>
      <div v-else>
        <h5 class="q-centre">{{new Date(currentScrape.timeStamp).toLocaleString()}}</h5>
        <p class="text-ellipsis q-url">{{currentScrape.url}}</p>
        <export-file></export-file>
        <div class="q-centre">
          <button class="btn q-centre q-action-button q-rerun-button"  @click="rerun(currentScrape.id)" name="button">Run Again</button>
        </div>
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
      axios.get('http://quarry-17.herokuapp.com/scrapes/rerun/' + this.$store.getters.userId + '/' + this.currentScrape.id)
//      axios.get('http://localhost:3000/scrapes/rerun/' + this.$store.getters.userId + '/' + this.currentScrape.id)
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

.q-centre {
  text-align: center;
}

.q-time-bar {
  padding-top: 0.25rem;
}

.q-rerun-button {
  margin-top: 0.5em;
  width: auto;
}

.q-action-button {

}

.q-action-button:hover {

}

.q-fake-link {
  cursor: pointer;
}

.q-hover-active:hover {
  color: gold;
}

.q-url {
  margin-top: 1em;
  text-align: center;
}

</style>
