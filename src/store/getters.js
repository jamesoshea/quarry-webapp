export default {
  userId(state) {
    return state.userId
  },
  currentScrape(state) {
    return state.currentScrape
  },
  scrapes(state) {
    return state.scrapes.sort((a, b)=> {
      return b.timeStamp - a.timeStamp
    })
  }
}
