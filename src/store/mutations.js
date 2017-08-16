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
  },
  unFavourite(state, i) {
    state.scrapes[i].fav = false
  }
}
