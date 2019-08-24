import { Game } from './schema.mjs'

// Fetch all games
const fetchGames = (req, res) => {
  Game.find({}, (error, games) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }  
    res.send(games)
  }).sort({ _id:-1 })
}

// Get a single game
const getGame = (req, res) => {
  Game.findById(req.params.game_id, (error, game) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    res.send(game)
  })
}

// Create a games
const createGame = (req, res) => {
  new Game({
    ...req.body
  }).save((error, game) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    res.send({
      message: 'Game created successfully',
      game: game
    })
  })
}

// Update a game
const updateGame = (req, res) => {
  Game.findById(req.params.game_id, (error, game) => {
    if (error || !game) {
      console.log(error)
      res.status(500).send(error)
      return
    } 
    Object.keys(req.body).forEach(key => {
      if (req.body) {
        game[key] = req.body[key]
      }
    })
    Game.save((error, game) => {
      if (error) {
        console.log(error)
        res.status(500).send(error)
        return
      }
      res.send({
        message: 'Game updated successfully',
        game: game
      })
    })
  })
}

// Delete a game
const deleteGame = (req, res) => {
  Game.remove({ _id: req.params.game_id }, (error) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    res.send({
      message: 'Game deleted successfully'
    })
  })
}

export default (express, passport) => {
  return express.Router()
    .get('/games', fetchGames)
    .get('/games/:game_id', getGame)
    .post('/games', createGame)
    .put('/games/:game_id', updateGame)
    .delete('/games/:game_id', deleteGame)
}