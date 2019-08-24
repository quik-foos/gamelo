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
};
