<template lang="html">
  <div>
    <div class="columns" v-if="scrapes.length">
      <div class="column col-2">
        <h4>Scrapes</h4>
      </div>
      <div class="column col-2">
        <i class="icon icon-arrow-up q-hover-active" @click="sortScrapes('asc')"></i>
        <i class="icon icon-arrow-down q-hover-active" @click="sortScrapes('desc')"></i>
      </div>
    </div>
    <div v-if="scrapes.length == 0">
      <p class="centre">{{ question }}</p>
      <input  class="form-input q-input-id"
              v-if="question"
              v-model="userIdInput"
              type="text"
              @keydown="getUser"
              placeholder="User ID" autofocus>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userIdInput: '',
      question: 'What is your user id? (You can find it at the top of the extension popup)',
      scrapes: []
    }
  },
  methods: {
    getUser(event) {
      if (event.key == "Enter") {
        const self = this
        let getString = 'https://quarry-17.herokuapp.com/users/' + self.userIdInput
        axios.get(getString)
        .then((response)=> {
          for(var scrape in response.data) {
            if (response.data.hasOwnProperty(scrape)) {
              let obj = {
                id: scrape,
                fav: response.data[scrape].fav,
                timeStamp: response.data[scrape].timeStamp,
                rows: response.data[scrape].rows,
                url: response.data[scrape].url
              }
              this.scrapes.push(obj)
            }
          }
          this.scrapes.sort((a, b)=> {
            return b.timeStamp - a.timeStamp
          })
          self.question = null
          this.$store.commit('setScrapes', this.scrapes)
          this.$store.commit('setUser', this.userIdInput)
          localStorage.setItem('userId', this.userIdInput)
        })
        .catch((error)=> {
          console.log(error)
          self.question = 'User not found'
        })
      }
    },
    sortScrapes(dir) {
      let scrapes = this.$store.getters.scrapes
      if (dir == 'asc') {
        console.log('up')
        scrapes.sort((a, b) => {
          return a.timeStamp - b.timeStamp
        })
      } else if (dir == 'desc') {
        scrapes.sort((a, b) => {
          return b.timeStamp - a.timeStamp
        })
      }
      this.$store.commit('setScrapes', scrapes)
    }
  },
  beforeMount() {
    if(localStorage.getItem('userId')) {
      this.userIdInput = localStorage.getItem('userId')
    }
  }
}
</script>

<style lang="css">
</style>
