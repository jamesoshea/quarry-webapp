import axios from 'axios'

export default {
  setUser(state, userId) {
    state.userId = userId
  },
  setCurrentScrape(state, scrape) {
    state.currentScrape = scrape
  },
  setScrapes(state, response) {
    let scrapes = []
    for(var scrape in response) {
      if (response.hasOwnProperty(scrape)) {
        let obj = {
          id: scrape,
          fav: response[scrape].fav,
          timeStamp: response[scrape].timeStamp,
          rows: response[scrape].rows,
          url: response[scrape].url
        }
        scrapes.push(obj)
      }
    }
    scrapes.sort((a, b)=> {
      return b.timeStamp - a.timeStamp
    })
    console.log(scrapes)
    state.scrapes = scrapes
  },
  toggleScrapeFav(state, i) {
    let options = {
      key: state.scrapes[i].id,
      bool: !state.scrapes[i].fav
    }
    axios.post('http://quarry-17.herokuapp.com/users/' + state.userId + '/setFav', options)
    .then((response)=> {
      state.scrapes[i].fav = !state.scrapes[i].fav
    })
    .catch((error)=> {
      console.log(error)
    })
  }
}
