import UsersController from './controllers/users.mjs'
import EloController from './controllers/elo.mjs'
import ProfilesController from './controllers/profiles.mjs'
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
    .use('/users', getCrudMethods(UsersController, 'username'))
    .use('/games', getCrudMethods(GamesController, 'game_id'))
    .use('/tables', getCrudMethods(TablesController, 'table_id'))
    .use('/results', getCrudMethods(ResultsController, 'result_id'))
    .post('/login', UsersController.login(passport))
    .post('/logout', UsersController.logout)
    .get('/users/:username/profile', ProfilesController.findOne)
}
