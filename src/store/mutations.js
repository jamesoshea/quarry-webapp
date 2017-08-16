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
    state.scrapes[i].fav = !state.scrapes[i].fav
    setFirebaseFavourite(state.userId, state.scrapes[i].id, state.scrapes[i].fav)
  }
}

function setFirebaseFavourite(userId, key, bool) {
  let options = {
    key,
    bool
  }
  axios.post('http://quarry-17.herokuapp.com/users/' + userId + '/setFav', options)
  .then((response)=> {
    console.log(response.data)
  })
}
