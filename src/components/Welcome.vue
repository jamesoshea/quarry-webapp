<template>
  <div>
    <h2>{{ question }}</h2>
    <input v-if="question" v-model="userIdInput" type="text" @keydown="getUser" placeholder="User ID">
    <ul v-for="(scrape, index) in scrapes">
      <p @click="expandScrape(index)">{{scrape.url}}</p>
    </ul>
    <hr>
    <div v-if="currentScrape">
      <p>{{currentScrape.url}}</p>
      <p>{{currentScrape.timeStamp}}</p>
      <ul v-for="row in currentScrape">
        {{row}}
      </ul>
    </div>
    <ul v-for="">

    </ul>

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

</style>
