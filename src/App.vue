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
    <div v-if="emptyUser">
      <div class="empty">
        <div class="empty-icon">
          <i class="icon icon-search"></i>?
        </div>
        <p class="empty-title h5">You haven't scraped anything yet!</p>
        <p class="empty-subtitle q-fake-link">
          <a href="https://chrome.google.com/webstore/detail/quarry/jkgbmaenkkenaipebbdnlhkijkiaonel" target="blank">
            Get the Chrome extension here to get started.
          </a>
        </p>
      </div>
    </div>
    <div class="columns">
      <div class="column col-9">
        <left></left>
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
import Left from './components/Left.vue'
import Favourites from './components/Favourites.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    'app-header': Header,
    'left': Left,
    'favourites': Favourites,
    'app-footer': Footer
  },
  data() {
    return {
      userIdInput: '',
      emptyUser: false
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
//      let getString = 'http://quarry-17.herokuapp.com/users/' + self.userIdInput
     let getString = 'http://localhost:3000/users/' + this.userIdInput
      axios.get(getString)
      .then((response)=> {
        if (!response.data.hasOwnProperty('scrapes')) {
          this.emptyUser = true
        } else {
          this.emptyUser = false
          this.question = null
          this.$store.commit('setScrapes', response.data.scrapes)
          this.$store.commit('setUser', this.userIdInput)
          localStorage.setItem('userId', this.userIdInput)
          this.$store.commit('login')
        }
        if (!response.data.hasOwnProperty('name')) {
          this.$store.commit('setUsername', response.data.name)
        }
      })
      .catch((error)=> {
        console.log(error)
        this.question = 'User not found'
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

<style lang="scss">

@import './css/variables';

#app {
  width: 80%;
  margin: auto;
}

.q-main-divider {
  margin-bottom: 1.5em;
}

.q-centre {
  text-align: center;
}

.q-fake-link {
  cursor: pointer;
  &:hover {
    color: $primary-color;
  }
}

.q-input-id {
  margin-bottom: 1em;
}

.q-logout {
  margin-top: 0.75em;
}

</style>
