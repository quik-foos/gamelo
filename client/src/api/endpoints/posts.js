import server from '../server'

export default {
  fetchPosts () {
    return server.get('posts')
  },
  getPost (params) {
    return server.get(`posts/${params.id}`)
  },
  createPost (params) {
    return server.post('posts', params)
  },
  updatePost (params) {
    return server.put(`posts/${params.id}`, params)
  },
  deletePost (params) {
    return server.delete(`posts/${params.id}`)
  }
}
