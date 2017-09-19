import axios from 'axios'

export default {
  deleteScrape(state, id) {
//    let getString = 'http://localhost:3000/scrapes/delete/' + state.userId + '/' + id
    let getString = 'http://quarry-17.herokuapp.com/scrapes/delete/' + state.userId + '/' + id
    axios.post(getString)
      .then((response) => {
        state.scrapes = scrapeFormatter(response.data)
        state.currentScrape = null
      })
      .catch((error) => {
        console.log(error.message)
      })
  },
  login(state) {
    state.loggedIn = true
  },
  logout(state) {
    state.loggedIn = false
    state.userId = ''
    state.scrapes = []
    state.currentScrape = null
  },
  setUser(state, userId) {
    state.userId = userId
  },
  setCurrentScrape(state, scrape) {
    state.currentScrape = scrape
  },
  setScrapes(state, response) {
    state.scrapes = scrapeFormatter(response)
  },
  sortScrapes(state, dir) {
    if (dir == 'asc') {
      state.scrapes.sort((a, b) => a.timeStamp - b.timeStamp)
    } else if (dir == 'desc') {
      state.scrapes.sort((a, b) => b.timeStamp - a.timeStamp)
    }
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
      console.log(error.message)
    })
  }
}

function scrapeFormatter(response) {
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
  return scrapes
}
