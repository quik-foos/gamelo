export default (server, type) => {
  return {
    findAll(params) {
      return server.get(`${type}`, { params });
    },
    findOne(params) {
      return server.get(`${type}/${params.id}`);
    },
    create(params) {
      return server.post(`${type}`, { params });
    },
    update(params) {
      return server.put(`${type}/${params.id}`, { params });
    },
    destroy(params) {
      return server.delete(`${type}/${params.id}`);
    },
  }
}