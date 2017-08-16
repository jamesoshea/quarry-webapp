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
  toggleScrapeFav(state, key) {
    state.scrapes[key].fav = !state.scrapes[key].fav
    setFirebaseFavourite(state, key, state.scrapes[key].fav)
  }
}

function setFirebaseFavourite(state, key, bool) {
  let options = {
    key: key,
    value: bool
  }
  axios.post('http://quarry-17.herokuapp.com/users/' + state.userId + '/setFav', options)
  .then((response)=> {
    console.log(response.data)
  })
}
