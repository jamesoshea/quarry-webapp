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
      question: 'What is your user id? (You can find it at the top of the extension popup)'
    }
  },
  computed: {
    scrapes() {
      return this.$store.getters.scrapes
    }
  },
  methods: {
    getUser(event) {
      if (event.key == "Enter") {
        const self = this
        let getString = 'https://quarry-17.herokuapp.com/users/' + self.userIdInput
        axios.get(getString)
        .then((response)=> {
          self.question = null
          this.$store.commit('setScrapes', response.data)
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
      this.$store.commit('sortScrapes', dir)
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
