import server from '../server'
import getCrudApi from '../crud'

const crud = getCrudApi(server, 'games')

export default {
  ...crud
}
