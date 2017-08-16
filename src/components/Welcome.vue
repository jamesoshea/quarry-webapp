<template>
  <div>
    <h4 class="centre">{{ question }}</h4>
    <input class="form-input q-input-id" v-if="question" v-model="userIdInput" type="text" @keydown="getUser" placeholder="User ID">
    <div class="q-container">
      <ul v-for="(scrape, index) in scrapes">
        <li @click="expandScrape(index)">{{scrape.url}}</li>
      </ul>
      <hr>
      <div v-if="currentScrape">
        <h5>URL:</h5>
        <p>{{currentScrape.url}}</p>
        <p>{{Date(currentScrape.timeStamp).toLocaleString()}}</p>
        <table class="table table-striped table-hover q-table">
          <thead>
            <tr>
              <th v-for="column in currentScrape.rows[0]">{{ column }}</th>
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
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      question: 'What is your user id? (You can find it at the top of the extension popup)',
      userIdInput: null,
      scrapes: [],
      currentScrape: null
    }
  },
  methods: {
    getUser(event) {
      if (event.key == "Enter") {
        const self = this
        axios.get('/users/' + this.userIdInput)
        .then((response)=> {
          console.log(response.data)
          for(var scrape in response.data) {
            if (response.data.hasOwnProperty(scrape)) {
              this.scrapes.push(response.data[scrape])
            }
          }
          self.question = null
        })
        .catch((error)=> {
          console.log(error)
        })
      }
    },
    expandScrape(i) {
      if(!this.currentScrape) {
        this.currentScrape = this.scrapes[i]
      } else {
        this.currentScrape = null
      }
    }
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
