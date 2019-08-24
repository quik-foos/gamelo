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
    return server.post('/users/:user_id/games/:game_id', params);
  },
  addResult(params) {
    return server.post('/users/:user_id/results/:result_id', params);
  },
  addElo(params) {
    return server.post('/users/:user_id/elo/:elo_id', params);
  },
  removeGame(params) {
    return server.post('/users/:user_id/games/:game_id', params);
  },
  removeResult(params) {
    return server.post('/users/:user_id/results/:game_id', params);
  },
  removeElo(params) {
    return server.post('/users/:user_id/elo/:elo_id', params);
  },
};
