<template lang="html">
  <div>
    <h4>Scrapes</h4>
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
