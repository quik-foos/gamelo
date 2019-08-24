import server from '../server'

export default {
  fetchGames () {
    return server.get('games')
  },
  getGame (params) {
    return server.get(`games/${params.id}`)
  },
  createGame (params) {
    return server.post('games', params)
  },
  updateGame (params) {
    return server.put(`games/${params.id}`, params)
  },
  deleteGame (params) {
    return server.delete(`games/${params.id}`)
  }
}
