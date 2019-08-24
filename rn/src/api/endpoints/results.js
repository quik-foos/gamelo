import server from '../server';
import getCrudApi from '../crud';

const crud = getCrudApi(server, 'results');

export default {
  ...crud,
};
