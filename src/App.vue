<template>
  <div id="app">
    <app-header></app-header>
    <div class="divider q-main-divider"></div>
    <div v-if="!loggedIn">
      <p class="q-centre">What is your user id? (You can find it at the top of the extension)</p>
      <input  class="form-input q-input-id"
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
import Header from './components/Header.vue'
import Favourites from './components/Favourites.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    'app-header': Header,
    'favourites': Favourites,
    'app-footer': Footer
  },
  data() {
    return {
      userIdInput: '',
      userPasswordInput: ''
    }
  },
  computed: {
    scrapes() {
      return this.$store.getters.scrapes
    },
    loggedIn() {
      return this.$store.getters.loggedIn
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

.q-main-divider {
  margin-bottom: 2em;
}

.q-centre {
  text-align: center;
}

.q-input-id {
  margin-bottom: 1em;
}

.q-logout {
  margin-top: 0.75em;
}

</style>
