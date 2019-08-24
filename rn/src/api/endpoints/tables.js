import server from '../server';
import getCrudApi from '../crud';

const crud = getCrudApi(server, 'tables');

export default {
  ...crud,
};
