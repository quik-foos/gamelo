import User from '../models/user.mjs'
import Game from '../models/game.mjs'
import Result from '../models/result.mjs'
import Elo from '../models/elo.mjs'

const handleError = (error) => {
  let message = 'Unknown error'
  if (error.errors.firstName) {
    message = 'First Name is required'
  } else if (error.errors.lastName) {
    message = 'Last Name is required'
  } else if (error.errors.username) {
    if (error.errors.username.kind === 'required') {
      message = 'Username is required'
    } else if (error.errors.username.kind === 'unique') {
      message = 'Username is already taken'
    }
  } else if (error.errors.email) {
    if (error.errors.email.kind === 'required') {
      message = 'Email is required'
    } else if (error.errors.email.kind === 'unique') {
      message = 'Email is already being used'
    }
  }

  return { message: message }
}

const findAll = (req, res) => {
  res.status(405)
}

// Get user
const findOne = (req, res) => {
  User.findById(req.params.user_id, (error, user) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (user) {
      res.send(user)
    } else {
      res.status(404).send({ error: 'User not found' })
    }
  })
}

// Create a user
const create = (req, res) => {
  new User({
    ...req.body
  }).save((error, user) => {
    if (error || !user) {
      res.status(400).send(handleError(error))
    } else {
      res.send({
        message: 'User created successfully',
        user: user
      })
    }
  })
}

// Update a user
const update = (req, res) => {
  User.findById(req.params.user_id, (error, user) => {
    if (error) {
      res.status(400).send(handleError(error))
    } else if (user) {
      Object.keys(req.body).forEach( key => {
        if (req.body) {
          tile[key] = req.body[key]
        }
      })
      user.save((error, user) => {
        if (error || !user) {
          res.status(400).send(handleError(error))
        } else{
          res.send({
            message: 'User updated successfully',
            user: user
          })
        }
      })
    } else {
      res.status(404).send({ message: 'User not found' })
    }
  })
}

// Delete a user
const destroy = (req, res) => {
  User.remove({
    username: req.params.user_id
  }, error => {
    if (error) {
      res.status(404).send({ message: 'User not found'})
    } else {
      res.send({
        message: 'User deleted successfully'
      })
    }
  })
}

const login = passport => {
  return (req, res, next) => {
    passport.authenticate('login', (err, user) => {
      if (err) {
        return res.status(404).send({
          success: false,
          message: 'Incorrect username or password'
        })
      }
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'Incorrect username or password'
        })
      }
      req.login(user, err => {
        if (err) {
          return res.status(404).send({
            success: false,
            message: 'Incorrect username or password'
          })
        }
        return res.send({
          success: true,
          user: user
        })
      })
    })(req, res, next)
  }
}

const logout = (req, res) => {
  req.logout()
  res.send({ success: true })
}

const addGame = (req, res) => {
  User.findById(req.params.user_id, (error, user) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (user) {
      Game.findById(req.params.game_id, (error, game) => {
        if (error || !game) {
          console.log(error)
          res.status(404).send({ message: 'Game not found' })
        } else {
          user.games = [...user.games, game._id]
          user.save((error, user) => {
            if (error || !user) {
              res.status(400).send(handleError(error))
            } else{
              res.send({
                message: 'Game added successfully',
                user: user
              })
            }
          })
        }
      })
    } else {
      res.status(404).send({ error: 'User not found' })
    }
  })
}

const removeGame = (req, res) => {
  User.findById(req.params.user_id, (error, user) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (user) {
      user.games = user.games.filter(x =>  x._id !== req.params.game_id)
      user.save((error, user) => {
        if (error || !user) {
          res.status(400).send(handleError(error))
        } else{
          res.send({
            message: 'Game removed successfully',
            user: user
          })
        }
      })
    } else {
      res.status(404).send({ error: 'User not found' })
    }
  })
}

const addResult = (req, res) => {
  User.findById(req.params.user_id, (error, user) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (user) {
      Result.findById(req.params.result_id, (error, result) => {
        if (error || !result) {
          console.log(error)
          res.status(404).send({ message: 'Result not found' })
        } else {
          user.results = [...user.results, result._id]
          user.save((error, user) => {
            if (error || !user) {
              res.status(400).send(handleError(error))
            } else{
              res.send({
                message: 'Result added successfully',
                user: user
              })
            }
          })
        }
      })
    } else {
      res.status(404).send({ error: 'User not found' })
    }
  })
}

const removeResult = (req, res) => {
  User.findById(req.params.user_id, (error, user) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (user) {
      user.results = user.results.filter(x =>  x._id !== req.params.result_id)
      user.save((error, user) => {
        if (error || !user) {
          res.status(400).send(handleError(error))
        } else{
          res.send({
            message: 'Game added updated successfully',
            user: user
          })
        }
      })
    } else {
      res.status(404).send({ error: 'User not found' })
    }
  })
}

const addElo = (req, res) => {
  User.findById(req.params.user_id, (error, user) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (user) {
      Elo.findById(req.params.elo_id, (error, elo) => {
        if (error || !elo) {
          console.log(error)
          res.status(404).send({ message: 'Elo not found' })
        } else {
          user.elo = [...user.elo, elo._id]
          user.save((error, user) => {
            if (error || !user) {
              res.status(400).send(handleError(error))
            } else{
              res.send({
                message: 'Elo added successfully',
                user: user
              })
            }
          })
        }
      })
    } else {
      res.status(404).send({ error: 'User not found' })
    }
  })
}

const removeElo = (req, res) => {
  User.findById(req.params.user_id, (error, user) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (user) {
      user.elo = user.results.filter(x =>  x._id !== req.params.elo_id)
      user.save((error, user) => {
        if (error || !user) {
          console.log(error)
          res.status(400).send(handleError(error))
        } else{
          res.send({
            message: 'Elo removed successfully',
            user: user
          })
        }
      })
    } else {
      res.status(404).send({ error: 'User not found' })
    }
  })
}

export default {
  findAll,
  findOne,
  create,
  update,
  destroy,
  login,
  logout,
  addGame,
  removeGame,
  addResult,
  removeResult,
  addElo,
  removeElo
}
