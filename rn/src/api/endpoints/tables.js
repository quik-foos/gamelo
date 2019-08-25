import server from '../server';
import getCrudApi from '../crud';

const crud = getCrudApi(server, 'tables');

export default {
  ...crud,
  addGame(params) {
    return server.post(`/tables/${params.id}/games/${params.gameId}`, {params});
  },
  addPlayer(params) {
    return server.post(`/tables/${params.id}/players/${params.userId}`, {
      params,
    });
  },
  addJoinRequest(params) {
    return server.post(`/tables/${params.id}/join_requests/${params.userId}`, {
      params,
    });
  },
  removeGame(params) {
    return server.delete(`/tables/${params.id}/games/${params.gameId}`, {
      params,
    });
  },
  removePlayer(params) {
    return server.delete(`/tables/${params.id}/players/${params.userId}`, {
      params,
    });
  },
  removeJoinRequest(params) {
    return server.delete(
      `/tables/${params.id}/join_requests/${params.userId}`,
      {
        params,
      },
    );
  },
};
