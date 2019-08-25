import server from '../server';
import getCrudApi from '../crud';

const crud = getCrudApi(server, 'users');

export default {
  ...crud,
  login(params) {
    return server.post('login', params);
  },
  logout(params) {
    return server.post('logout', params);
  },
  addGame(params) {
    return server.post(`/users/${params.id}/games/${params.gameId}`, {params});
  },
  addResult(params) {
    return server.post(`/users/${params.id}/results/${params.resultId}`, {
      params,
    });
  },
  addElo(params) {
    return server.post(`/users/${params.id}/elo/${params.eloId}`, {params});
  },
  removeGame(params) {
    return server.delete(`/users/${params.id}/games/${params.gameId}`, {params});
  },
  removeResult(params) {
    return server.delete(`/users/${params.id}/results/${params.resultId}`, {
      params,
    });
  },
  removeElo(params) {
    return server.delete(`/users/${params.id}/elo/${params.eloId}`, {params});
  },
};
