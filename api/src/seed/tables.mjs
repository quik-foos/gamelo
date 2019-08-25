import Table from '../models/table.mjs'
import Game from '../models/game.mjs'
import User from '../models/user.mjs'

const status = ['Scheduled', 'In-Progress', 'Completed']
const date = new Date()

export default () => {
  User.find({}, (error, users) => {
    Game.find({}, (error, games) => {
      let i = 0
      users.forEach(user => {
        status.forEach(status => {
          Table.create({
            host: user._id,
            games: [],
            players: [],
            joinRequests: [],
            photoURL: 'https://c8.alamy.com/comp/C95267/illustration-of-kids-playing-a-board-game-C95267.jpg?fbclid=IwAR0ySnq6OZOsBYmBYI1WU0YUuwOIng1FLUQsFZRFFRYpJbcBdJnic6Xr6ug',
            location: { lng: -79.397599 + (Math.random() - 0.6) / 3, lat: 43.659101 + Math.random() / 3 },
            minPlayers: 0,
            maxPlayers: 4,
            startTime: date + 1,
            endTime: date + 2,
            status: status
          })
          i++
        })
      })
    })
  })
}