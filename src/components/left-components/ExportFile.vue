<template lang="html">
  <form class="form-horizontal q-rerun-form">
    <div class="form-group">
      <div class="col-3 q-text-right">
        <label class="form-label" for="input-example-1">Save as:</label>
      </div>
      <div class="col-5">
        <input ref="filename"
          class="form-input centre q-filename-form"
          v-model="filename"
          placeholder="Filename"
          v-focus>
      </div>
      <div class="col-4 q-output-format">
        <label class="form-label" for="input-example-1">
          <span class="q-fake-link" @click="exportFile(currentScrape.rows, 'csv')">.CSV</span> |
          <span class="q-fake-link" @click="exportFile(currentScrape.rows, 'tsv')">TSV</span> |
          <span class="q-fake-link" @click="exportJSON()">JSON</span>
        </label>
      </div>
    </div>
  </form>
</template>

<script>
const focus = {
   inserted(el) {
     el.focus()
   },
 }

export default {
  data() {
    return {
      filename: ''
    }
  },
  computed: {
    currentScrape() {
      return this.$store.getters.currentScrape
    }
  },
  methods: {
    exportFile(rows, format) {
      if (!this.filename) {
        return
      }
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
    exportJSON() {
      if (!this.filename) {
        alert('Please enter a filename.')
        return
      }
      let filename = this.filename += '.json'
      let str = JSON.stringify(this.currentScrape.rows)
      const blob = new Blob([str], { type: 'application/json' })
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
    }
  },
  directives: { focus }
}
</script>

<style>
.q-filename-form {
  /*width: 40%;
  margin: auto;*/
}

.q-text-right {
  text-align: right;
  margin-right: 1.5rem;
}

.q-output-format {
  margin-left: 1.5rem;
}

.q-rerun-form {
  width: 100%
}
</style>
