import Game from '../models/game.mjs'

const findAll = (req, res) => {
  Game.find({}, (error, games) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
    } else {
      res.send(games)
    } 
  }).sort({ _id: -1 })
}

const findOne = (req, res) => {
  Game.findById(req.params.game_id, (error, game) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
    } else if (game) {
      res.send(game)
    } else {
      res.status(404).send({ message: `Game not found` })
    }
  })
}

const create = (req, res) => {
  new Game({
    ...req.body
  }).save((error, game) => {
    if (error || !game) {
      console.log(error)
      res.status(500).send(error)
    } else {
      res.send({
        message: 'Game created successfully',
        game: game
      })
    }
  })
}

const update = (req, res) => {
  Game.findById(req.params.game_id, (error, game) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
    } else if (game) {
      Object.keys(req.body).forEach(key => {
        if (req.body) {
          game[key] = req.body[key]
        }
      })
      Game.save((error, game) => {
        if (error || !game) {
          console.log(error)
          res.status(500).send(error)
        } else {
          res.send({
            message: 'Game updated successfully',
            game: game
          })
        }
      })
    } else {
      res.status(404).send({ message: 'Game not found' })
    }
  })
}

const destroy = (req, res) => {
  Game.remove({ _id: req.params.game_id }, (error) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
    } else {
      res.send({
        message: 'Game deleted successfully'
      })
    }
  })
}

export default {
  findAll,
  findOne,
  create,
  update,
  destroy
}