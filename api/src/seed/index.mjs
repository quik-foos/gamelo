import seedGames from './games.mjs'
import seedTables from './tables.mjs'
import User from '../models/user.mjs'
import Elo from '../models/elo.mjs'

export default () => {
  // User.findById("5d618db4ec27cd02bd95d261", (error, user) => {
  //   console.log(user)
  //   Elo.create({game: "5d619a5810f78003d54cf5ec"}, (error, elo) => {
  //   console.log(elo)
  //     user.elo.push(elo._id)
  //     user.save()
  //   })
  // })
  seedGames()
  seedTables()
}