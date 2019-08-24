import server from '../server'

export default {
  getUser (params) {
    return server.get(`users/${params.id}`)
  },
  createUser (params) {
    return server.post('users', params)
  },
  updateUser (params) {
    return server.put(`users/${params.id}`, params)
  },
  deleteUser (params) {
    return server.delete(`users/${params.id}`)
  },
  login (params) {
    return server.post('login', params)
  },
  logout (params) {
    return server.post('logout', params)
  }
}
