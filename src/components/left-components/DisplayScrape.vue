<template lang="html">
  <div class="q-scrape-main">
    <div v-if="currentScrape">
      <h5 class="centre">{{new Date(currentScrape.timeStamp).toLocaleString()}}</h5>
      <p class="text-ellipsis">{{currentScrape.url}}</p>
      <p class="centre">Export as:
        <input class="form-input centre" v-model="filename" placeholder="Filename">
        <span class="q-fake-link" @click="exportFile(currentScrape.rows, 'csv')">CSV</span> |
        <span class="q-fake-link" @click="exportFile(currentScrape.rows, 'tsv')">TSV</span>
      </p>
      <table class="table table-striped table-hover q-table">
        <thead>
          <tr>
            <th v-for="(column, index) in currentScrape.rows[0]">
              {{ column }} ({{ currentScrape.rows[1][index] }})<br>
              <i class="icon icon-arrow-up q-hover-active" @click="sortRows('asc', index)"></i>
              <i class="icon icon-arrow-down q-hover-active" @click="sortRows('desc', index)"></i>
            </th>
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
      filename: ''
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
    exportFile(rows, format) {
      let processRow = function (row) {
        let finalVal = ''
        for (let j = 0; j < row.length; j++) {
          let innerValue = row[j] === null ? '' : row[j].toString()
          if (row[j] instanceof Date) {
            innerValue = row[j].toLocaleString()
          }
          let result = innerValue.replace(/"/g, '""')
          if (result.search(/("|,|\n)/g) >= 0) {
            result = '"' + result + '"'
          }
          if (j > 0) {
            if (format === 'csv') {
              finalVal += ','
            } else if (format === 'tsv') {
              finalVal += '\t'
            }
          }
          finalVal += result
        }
        return finalVal + '\n'
      };

      let csvFile = ''
      for (let i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i])
      }
      let filename = this.filename
      if (format === 'csv') {
        filename += '.csv'
      } else if (format === 'tsv') {
        filename += '.tsv'
      }
      const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' })
      if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename)
      } else {
        let link = document.createElement("a")
        if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          let url = URL.createObjectURL(blob)
          link.setAttribute("href", url)
          link.setAttribute("download", filename)
          link.style.visibility = 'hidden'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      }
    },
    sortRows(dir, i) {
      let result = []
      result[0] = this.currentScrape.rows[0]
      result[1] = this.currentScrape.rows[1]
      let len = this.currentScrape.rows.length
      let input = this.currentScrape.rows.slice(2, len)
      let output = input.sort((a, b)=> {
        if (dir === 'asc') {
          return a - b
        } else if (dir === 'desc') {
          return a + b
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
