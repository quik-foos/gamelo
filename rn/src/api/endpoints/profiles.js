import server from '../server';
import getCrudApi from '../crud';

const crud = getCrudApi(server, 'profiles');

export default {
  ...crud,
};
