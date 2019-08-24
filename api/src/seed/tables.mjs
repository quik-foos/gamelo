import Table from '../models/table.mjs'
import Game from '../models/game.mjs'
import User from '../models/user.mjs'

const status = ['Scheduled', 'In-Progress', 'Completed']
const date = new Date()

export default () => {
  User.find({}, (error, users) => {
    Game.find({}, (error, games) => {
      users.forEach(user => {
        status.forEach(status => {
          Table.create({
            host: user._id,
            games: [],
            players: [],
            joinRequests: [],
            location: { lng: 100, lat: 100 },
            minPlayers: 0,
            maxPlayers: 4,
            startTime: date + 1,
            endTime: date + 2,
            status: status
          })
        })
      })
    })
  })
}