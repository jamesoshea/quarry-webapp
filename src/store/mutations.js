import axios from 'axios'

export default {
  setUser(state, userId) {
    state.userId = userId
  },
  setCurrentScrape(state, scrape) {
    state.currentScrape = scrape
  },
  setScrapes(state, scrapes) {
    state.scrapes = scrapes
  },
  toggleScrapeFav(state, i) {
    let options = {
      key: state.scrapes[i].id,
      bool: !state.scrapes[i].fav
    }
    console.log(options)
    axios.post('http://quarry-17.herokuapp.com/users/' + state.userId + '/setFav', options)
    .then((response)=> {
      console.log(response)
      state.scrapes[i].fav = !state.scrapes[i].fav
    })
    .catch((error)=> {
      console.log(error)
    })
  }
}
