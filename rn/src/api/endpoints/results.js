import server from '../server';
import getCrudApi from '../crud';

const crud = getCrudApi(server, 'results');

export default {
  ...crud,
  addValidation(params) {
    return server.post(
      `/results/${params.id}/validations/${params.validatorId}`,
      {
        params,
      },
    );
  },
  removePlayer(params) {
    return server.delete(
      `/results/${params.id}/validations/${params.validatorId}`,
      {
        params,
      },
    );
  },
};
