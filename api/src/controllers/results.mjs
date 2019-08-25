import Result from '../models/result.mjs'
import User from '../models/user.mjs'
import Elo from '../models/elo.mjs'

const findAll = (req, res) => {
  let query = {}
  if (req.params.table) query.table = req.params.table
  if (req.query.player) {
    query.player = { _id: req.query.player }
  }

  Result.find(query, (error, results) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
    } else {
      res.send(results)
    } 
  }).sort({ _id: -1 })
}

const findOne = (req, res) => {
  Result.findById(req.params.result_id, (error, result) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
    } else if (result) {
      res.send(result)
    } else {
      res.status(404).send({ message: `Result not found` })
    }
  })
}

const create = (req, res) => {
  new Result({
    ...req.body
  }).save((error, result) => {
    if (error || !result) {
      console.log(error)
      res.status(500).send(error)
    } else {
      res.send({
        message: 'Result created successfully',
        result: result
      })
    }
  })
}

const update = (req, res) => {
  Result.findById(req.params.result_id, (error, result) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
    } else if (result) {
      Object.keys(req.body).forEach(key => {
        if (req.body) {
          result[key] = req.body[key]
        }
      })
      Result.save((error, result) => {
        if (error || !result) {
          console.log(error)
          res.status(500).send(error)
        } else {
          res.send({
            message: 'Result updated successfully',
            result: result
          })
        }
      })
    } else {
      res.status(404).send({ message: 'Result not found' })
    }
  })
}

const destroy = (req, res) => {
  Result.remove({ _id: req.params.result_id }, (error) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
    } else {
      res.send({
        message: 'Result deleted successfully'
      })
    }
  })
}

const addValidatedPlayer = (req, res) => {
  Result.findById(req.params.result_id, (error, result) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (result) {
      User.findById(req.params.user_id, (error, user) => {
        if (error || !user) {
          console.log(error)
          res.status(404).send({ message: 'User not found' })
        } else {
          result.validatedPlayers = [...result.validatedPlayers, user._id]
          result.save((error, result) => {
            if (error || !result) {
              res.status(400).send({ message: 'Result could not be saved' })
            } else {
              if (result.validatedPlayers.length === result.players.lenghth) {
                updateElo(result)
              }
              res.send({
                message: 'User added successfully',
                result: result
              })
            }
          })
        }
      })
    } else {
      res.status(404).send({ error: 'Result not found' })
    }
  })
}

const removeValidatedPlayer = (req, res) => {
  Result.findById(req.params.table_id, (error, result) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (result) {
      result.validatedPlayers = result.validatedPlayers.filter(x =>  x._id !== req.params.user_id)
      result.save((error, result) => {
        if (error || !result) {
          res.status(400).send({ message: 'User not found' })
        } else{
          res.send({
            message: 'User removed successfully',
            result: result
          })
        }
      })
    } else {
      res.status(404).send({ error: 'Result not found' })
    }
  })
}

const createNewElo = (user, gameId) => {
  Elo.create({
    game: gameId,
    user: user._id
  }, (error, elo) => {
    if (error) {
      console.log(error)
    } else {
      user.elo.push(elo._id)
      user.save(error => {
        if (error) {
          console.log(error)
        }
      })
    }
  })
}

const getExpectedValue = (playerRating, opponentRating) => {
  const M = 400
  const playerValue = Math.pow(10, playerRating / M)
  const opponentValue = Math.pow(10, playerValue / M)
  return playerValue / (playerValue + opponentValue)
}

const getNewEloRating = (oldRating, actual, expected, n) => {
  const K = 30
  return oldRating + (K * (actual - expected) / Math.sqrt(n - 1))
}

const getActualAndExpectedValue = (player, winners, losers, ratings) => {
  const isWinner = winners.includes(playerId)
  
  let expected = 0
  let actual = 0
  winners.forEach(winner => {
    if (winner !== userId) {
      expected += getExpectedValue(ratings[player._id], ratings[winner])
      if (isWinner) actual += 0.5
    }
  })

  losers.forEach(loser => {
    if (loser !== userId) {
      expected += getExpectedValue(ratings[player._id], ratings[loser])
      actual += isWinner ? 1 : 0.5
    }
  })

  return { actual: actual, expected: expected }
}

const updateElo = (result) => {
  const winnerIds = result.winners.map(winner => winner._id)
  const loserIds = result.players.filter(player => winners.includes(player._id)).map(x => x._id)
  let ratings = {}
  result.players.forEach(player => {
    Elo.findOne({ user: player._id, game: result.game._id }, (error, elo) => {
      if (error) {
        console.log(error)
      } else {
        ratings[player._id] = elo.rating
      }
    })
  })

  // Initialize elo for players that don't have it
  result.players.forEach(player => {
    if (!ratings[player._id]) {
      createNewElo(player, result.game._id)
      ratings[player._id] = 1500
    }
  })

  const outcomes = {}
  result.players.forEach(player => {
    // outcome = { player1Id, expectedValue, actualValue }
    outcomes[player._id] = getActualAndExpectedValue(player, winnerIds, loserIds, ratings)
  })

  Object.keys(outcomes).forEach(playerId => {
    Elo.findOne({ user: playerId, game: result.game._id }, (error, elo) => {
      if (error) {
        console.log(error)
      } else {
        elo.rating = getNewEloRating(elo.rating, outcomes[playerId].actual, outcomes[playerId].expected, players.length)
        elo.timesPlayed++
        elo.save(error => {
          if (error) console.log(error)
        })
      }
    })
  })
}

export default {
  findAll,
  findOne,
  create,
  update,
  destroy,
  addValidatedPlayer,
  removeValidatedPlayer
}