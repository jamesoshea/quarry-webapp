<template>
  <div id="app">
    <h1 id="q-main-msg">Quarry</h1>
    <div v-if="scrapes.length == 0">
      <p class="q-centre">{{ question }}</p>
      <input  class="form-input q-input-id"
              v-if="question"
              v-model="userIdInput"
              type="text"
              placeholder="User ID"
              v-on:keyup.enter="getUser"
              autofocus>
    </div>
    <div class="columns">
      <div class="column col-9">
        <router-view>
        </router-view>
      </div>
      <div class="column col-3">
        <favourites></favourites>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import axios from 'axios'
import Favourites from './components/Favourites.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    'favourites': Favourites,
    'app-footer': Footer
  },
  data() {
    return {
      userIdInput: '',
      userPasswordInput: '',
      question: 'What is your user id? (You can find it at the top of the extension)'
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
        this.$store.commit('login')
      })
      .catch((error)=> {
        console.log(error)
        self.question = 'User not found'
      })
    }
  },
  beforeMount() {
    if(localStorage.getItem('userId')) {
      this.userIdInput = localStorage.getItem('userId')
    }
  }
}
</script>

<style scoped>

body {
  background-color: #eee;
}

#app {
  width: 80%;
  margin: auto;
}

#q-main-msg {
  text-align: center;
}

.q-centre {
  text-align: center;
}

.q-input-id {
  margin-bottom: 1em;
}

</style>
