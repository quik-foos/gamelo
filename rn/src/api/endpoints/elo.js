import server from '../server';
import getCrudApi from '../crud';

const crud = getCrudApi(server, 'elo');

export default {
  ...crud,
};
