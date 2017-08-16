<template>
  <div class="q-no-overflow">
    <div>
      <h4>Scrapes</h4>
      <p class="centre">{{ question }}</p>
      <input class="form-input q-input-id" v-if="question" v-model="userIdInput" type="text" @keydown="getUser" placeholder="User ID">
    </div>
    <div class="q-scrape-list">
      <dl v-for="(scrape, index) in scrapes">
        <dt>{{ Date(scrape.timeStamp).toLocaleString() }}</dt>
        <dd @click="expandScrape(index)">{{ scrape.url }}</dd>
      </dl>
    </div>
    <div class="divider"></div>
    <display-scrape></display-scrape>
  </div>
</template>

<script>
import axios from 'axios'

import DisplayScrape from './DisplayScrape.vue'

export default {
  components: {
    'display-scrape': DisplayScrape
  },
  data() {
    return {
      question: 'What is your user id? (You can find it at the top of the extension popup)',
      scrapes: []
    }
  },
  computed: {
    userIdInput() {
      return this.$store.getters.userId || ''
    }
  },
  methods: {
    getUser(event) {
      if (event.key == "Enter") {
        const self = this
        axios.get('/users/' + this.userIdInput)
        .then((response)=> {
          for(var scrape in response.data) {
            if (response.data.hasOwnProperty(scrape)) {
              this.scrapes.push(response.data[scrape])
            }
          }
          self.question = null
          this.$store.commit('setUser', this.userIdInput)
          localStorage.setItem('userId', this.userIdInput)
        })
        .catch((error)=> {
          console.log(error)
          self.question = 'User not found'
        })
      }
    },
    expandScrape(i) {
      if(!this.$store.getters.currentScrape) {
        this.$store.commit('setCurrentScrape', this.scrapes[i])
      } else {
        this.$store.commit('setCurrentScrape', null)
      }
    }
  }
}
</script>

<style scoped>

.q-scrape-list {
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.q-no-overflow {
  overflow-x: hidden;
}

.q-input-id {
  width: 60%;
}

.q-table {
  width: 90%;
  margin: auto;
}

</style>
