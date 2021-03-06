import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		loggedIn: false,
		userId: '',
		scrapes: [],
		currentScrape: null,
		username: ''
	},
	getters,
	mutations
})