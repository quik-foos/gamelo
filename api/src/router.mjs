import UsersController from './controllers/users.mjs'
import ResultsController from './controllers/results.mjs'
import GamesController from './controllers/games.mjs'
import TablesController from './controllers/tables.mjs'

export default (express, passport) => {
  const getCrudMethods = (controller, identifier=null) => {
    return express.Router()
      .get(`/`, controller.findAll)
      .get(`/:${identifier}`, controller.findOne)
      .post(`/`, controller.create)
      .put(`/:${identifier}`, controller.update)
      .delete(`/:${identifier}`, controller.destroy)
  }

  return express.Router()
    .use('/users', getCrudMethods(UsersController, 'user_id'))
    .use('/games', getCrudMethods(GamesController, 'game_id'))
    .use('/tables', getCrudMethods(TablesController, 'table_id'))
    .use('/results', getCrudMethods(ResultsController, 'result_id'))
    .post('/login', UsersController.login(passport))
    .post('/logout', UsersController.logout)
    .post('/users/:user_id/games/:game_id', UsersController.addGame)
    .delete('/users/:user_id/games/:game_id', UsersController.removeGame)
    .post('/tables/:table_id/games/:game_id', TablesController.addGame)
    .post('/tables/:table_id/players/:user_id', TablesController.addPlayer)
    .post('/tables/:table_id/join_requests/:user_id', TablesController.addJoinRequest)
    .delete('/tables/:table_id/games/:game_id', TablesController.removeGame)
    .delete('/tables/:table_id/players/:user_id', TablesController.removePlayer)
    .delete('/tables/:table_id/join_requests/:user_id', TablesController.removeJoinRequest)
    .post('/results/:result_id/validated_players/:user_id', ResultsController.addValidatedPlayer)
    .delete('/results/:result_id/validated_players/:user_id', ResultsController.removeValidatedPlayer)
}
