export default (server, type) => {
  return {
    findAll() {
      return server.get(`${type}`);
    },
    findOne(params) {
      return server.get(`${type}/${params.id}`);
    },
    create(params) {
      return server.post(`${type}`, params);
    },
    update(params) {
      return server.put(`${type}/${params.id}`, params);
    },
    destroy(params) {
      return server.delete(`${type}/${params.id}`);
    },
  }
}