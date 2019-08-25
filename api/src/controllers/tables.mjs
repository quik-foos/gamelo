import Table from '../models/table.mjs'
import Game from '../models/game.mjs'
import User from '../models/user.mjs'

const findAll = (req, res) => {
  let query = {}
  console.log(req.query)
  if (req.query.host) query.host = req.query.host
  if (req.query.status) query.host = req.query.status
  if (req.query.player) {
    query.player = { _id: req.query.player }
  }
  if (req.query.joinRequest) {
    query.joinRequest = { _id: req.query.joinRequest }
  }

  Table.find(query, (error, tables) => {
    if (error) {
      console.log(error)
      res.status(400).send(error)
    } else {
      res.send(tables)
    }
  }).sort({ _id: -1 })
}

const findOne = (req, res) => {
  Table.findById(req.params.table_id, (error, table) => {
    if (error) {
      console.log(error)
      res.status(400).send(error)
    } else if (table) {
      res.send(table)
    } else {
      res.status(404).send({ message: `Table not found` })
    }
  })
}

const create = (req, res) => {
  new Table({
    ...req.body
  }).save((error, table) => {
    if (error || !table) {
      console.log(error)
      res.status(400).send(error)
    } else {
      res.send({
        message: 'Table created successfully',
        table: table
      })
    }
  })
}

const update = (req, res) => {
  Table.findById(req.params.table_id, (error, table) => {
    if (error) {
      console.log(error)
      res.status(400).send(error)
    } else if (table) {
      Object.keys(req.body).forEach(key => {
        if (req.body) {
          table[key] = req.body[key]
        }
      })
      Table.save((error, table) => {
        if (error || !table) {
          console.log(error)
          res.status(400).send(error)
        } else {
          res.send({
            message: 'Table updated successfully',
            table: table
          })
        }
      })
    } else {
      res.status(404).send({ message: 'Table not found' })
    }
  })
}

const destroy = (req, res) => {
  Table.remove({ _id: req.params.table_id }, (error) => {
    if (error) {
      console.log(error)
      res.status(404).send({ message: 'Table not found' })
    } else {
      res.send({
        message: 'Table deleted successfully'
      })
    }
  })
}

const addGame = (req, res) => {
  Table.findById(req.params.table_id, (error, table) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (table) {
      Game.findById(req.params.game_id, (error, game) => {
        if (error || !game) {
          console.log(error)
          res.status(404).send({ message: 'Game not found' })
        } else {
          table.games = [...table.games, game._id]
          table.save((error, table) => {
            if (error || !table) {
              res.status(400).send({ message: 'Table could not be saved' })
            } else{
              res.send({
                message: 'Game added successfully',
                table: table
              })
            }
          })
        }
      })
    } else {
      res.status(404).send({ error: 'Table not found' })
    }
  })
}

const removeGame = (req, res) => {
  Table.findById(req.params.table_id, (error, table) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (table) {
      table.games = table.games.filter(x =>  x._id != req.params.game_id)
      table.save((error, table) => {
        if (error || !table) {
          res.status(400).send({ message: 'User not found' })
        } else{
          res.send({
            message: 'Game removed successfully',
            table: table
          })
        }
      })
    } else {
      res.status(404).send({ error: 'Table not found' })
    }
  })
}

const addPlayer = (req, res) => {
  Table.findById(req.params.table_id, (error, table) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (table) {
      User.findById(req.params.user_id, (error, user) => {
        if (error || !user) {
          console.log(error)
          res.status(404).send({ message: 'User not found' })
        } else {
          table.players = [...table.players, user._id]
          table.save((error, table) => {
            if (error || !table) {
              res.status(400).send({ message: 'Table could not be saved' })
            } else{
              res.send({
                message: 'User added successfully',
                table: table
              })
            }
          })
        }
      })
    } else {
      res.status(404).send({ error: 'Table not found' })
    }
  })
}

const removePlayer = (req, res) => {
  Table.findById(req.params.table_id, (error, table) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (table) {
      table.players = table.players.filter(x =>  x._id != req.params.user_id)
      table.save((error, table) => {
        if (error || !table) {
          res.status(400).send({ message: 'User not found' })
        } else{
          res.send({
            message: 'User removed successfully',
            table: table
          })
        }
      })
    } else {
      res.status(404).send({ error: 'Table not found' })
    }
  })
}

const addJoinRequest = (req, res) => {
  Table.findById(req.params.table_id, (error, table) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (table) {
      User.findById(req.params.user_id, (error, user) => {
        if (error || !user) {
          console.log(error)
          res.status(404).send({ message: 'User not found' })
        } else {
          table.joinRequests = [...table.joinRequests, user._id]
          table.save((error, table) => {
            if (error || !table) {
              res.status(400).send({ message: 'Table could not be saved' })
            } else{
              res.send({
                message: 'Join Request added successfully',
                table: table
              })
            }
          })
        }
      })
    } else {
      res.status(404).send({ error: 'Table not found' })
    }
  })
}

const removeJoinRequest = (req, res) => {
  Table.findById(req.params.table_id, (error, table) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (table) {
      table.joinRequests = table.joinRequests.filter(x =>  x._id != req.params.user_id)
      table.save((error, table) => {
        if (error || !table) {
          res.status(400).send({ message: 'User not found' })
        } else{
          res.send({
            message: 'Join Request removed successfully',
            table: table
          })
        }
      })
    } else {
      res.status(404).send({ error: 'Table not found' })
    }
  })
}

export default {
  findAll,
  findOne,
  create,
  update,
  destroy,
  addGame,
  removeGame,
  addPlayer,
  removePlayer,
  addJoinRequest,
  removeJoinRequest
}
