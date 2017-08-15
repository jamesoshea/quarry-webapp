<template>
  <div>
    <h2>What is your user id? (You can find it at the top of the extension popup)</h2>
    <input v-model="userIdInput" type="text" @keydown="getUser" placeholder="User ID">
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
      userIdInput: null,
      scrapes: [],
      currentScrape: null
    }
  },
  methods: {
    getUser(event) {
      if (event.key == "Enter") {
        axios.get('/users/' + this.userIdInput)
        .then((response)=> {
          console.log(response.data)
          for(var scrape in response.data) {
            if (response.data.hasOwnProperty(scrape)) {
              this.scrapes.push(response.data[scrape])
            }
          }
        })
        .catch((error)=> {
          console.log(error)
        })
      }
    },
    expandScrape(i) {
      this.currentScrape = this.scrapes[i]
    }
  }
}
</script>

<style scoped>

</style>
