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
              placeholder="User ID"
              v-on:keyup.enter="getUser"
              autofocus>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userIdInput: '',
      userPasswordInput: '',
      question: 'What is your user id and password? (You can find it at the top of the extension popup)'
    }
  },
  computed: {
    scrapes() {
      return this.$store.getters.scrapes
    }
  },
  methods: {
    getUser(event) {
      const self = this
      let getString = 'http://quarry-17.herokuapp.com/users/' + self.userIdInput
//        let getString = 'http://localhost:3000/users/' + self.userIdInput
      axios.get(getString)
      .then((response)=> {
        self.question = null
        this.$store.commit('setScrapes', response.data.snapshot)
        localStorage.setItem('token', response.data.token)
        this.$store.commit('setUser', this.userIdInput)
        localStorage.setItem('userId', this.userIdInput)
      })
      .catch((error)=> {
        console.log(error)
        self.question = 'User not found'
      })
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
  .q-input-id {
    margin-bottom: 1em;
  }
</style>
