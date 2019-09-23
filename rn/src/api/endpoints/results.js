import server from '../server'
import getCrudApi from '../crud'

const crud = getCrudApi(server, 'results')

export default {
  ...crud,
  addValidatedPlayer(params) {
    return server.post(
      `/results/${params.id}/validated_players/${params.validatePlayerId}`,
      {
        params
      }
    )
  },
  removeValidatedPlayer(params) {
    return server.delete(
      `/results/${params.id}/validated_players/${params.validatePlayerId}`,
      {
        params
      }
    )
  }
}
