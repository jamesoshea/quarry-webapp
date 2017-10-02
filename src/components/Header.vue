<template lang="html">
  <div class="columns q-header">
    <div class="column col-7">
      <h1 id="q-main-msg">Quarry</h1>
    </div>
    <div v-if="loggedIn" class="column col-5 q-logout">
      <button class="btn"
            @click="logout">
            <i class="icon icon-shutdown"></i> Logout
      </button>
      <button class="btn " @click="settingsActive = true"><i class="icon icon-edit"></i> Settings</button>
      <button class="btn btn-primary" @click="profileActive = true"><i class="icon icon-people"></i> View Profile</button>
    </div>
    <div :class="{active: profileActive}" class="modal">
      <div class="modal-overlay"></div>
      <div class="modal-container">
        <div class="modal-header">
          <button class="btn btn-clear float-right q-fake-link" @click="profileActive = false"></button>
          <div class="modal-title h5">Profile</div>
        </div>
        <div class="modal-body">
          <div class="content">
            <h2 v-if="username">Hi, {{ username }}</h2>
            <h2 v-else>You haven't entered a name yet!</h2>
            <p>Your user id is: {{ userId }}</p>
            <p>You have saved {{ scrapes.length }} scrapes.</p>
          </div>
        </div>
      </div>
    </div>
    <div :class="{active: settingsActive}" class="modal">
      <div class="modal-overlay"></div>
      <div class="modal-container">
        <div class="modal-header">
          <button class="btn btn-clear float-right q-fake-link" @click="settingsActive = false"></button>
          <div class="modal-title h5">Settings</div>
        </div>
        <div class="modal-body">
          <div class="content">
            <div class="form-group">
              <label class="form-label" for="input-example-1">Name</label>
              <input class="form-input" type="text" id="input-example-1" v-model="nameInput" :placeholder="username || 'Enter your name, if you like'">
              <button class="btn btn-primary" @click="sendSettings">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
	data() {
		return {
			profileActive: false,
			settingsActive: false,
			nameInput: ''
		}
	},
	computed: {
		loggedIn() {
			return this.$store.getters.loggedIn
		},
		userId() {
			return this.$store.getters.userId
		},
		username() {
			return this.$store.getters.username
		},
		scrapes() {
			return this.$store.getters.scrapes
		}
	},
	methods: {
		logout() {
			this.$store.commit('logout')
		},
		sendSettings() {
			axios.post('http://quarry-17.herokuapp.com/users/' + this.userId + '/setName', {name: this.nameInput})
			//      axios.post('http://localhost:3000/users/' + this.userId + '/setName', {name: this.nameInput})
				.then(() => {
					this.$store.commit('setUsername', this.nameInput)
					this.settingsActive = false
				})
		}
	}
}
</script>

<style lang="scss" scoped>

.q-header {
  padding-top: 1em;
  margin-bottom: 0.5em;
}

.q-logout {
  padding-top: 0.5em;
  text-align: right;
}

</style>
