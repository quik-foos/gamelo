import Result from '../models/result.mjs'

const findAll = (req, res) => {
  let query = {}
  if (req.params.table) query.table = req.params.table

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

const addValidation = (req, res) => {
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
          result.users = [...result.users, user._id]
          result.save((error, result) => {
            if (error || !result) {
              res.status(400).send({ message: 'Result could not be saved' })
            } else{
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

const removeValidation = (req, res) => {
  Result.findById(req.params.table_id, (error, result) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (result) {
      result.users = result.users.filter(x =>  x._id !== req.params.user_id)
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

export default {
  findAll,
  findOne,
  create,
  update,
  destroy,
  addValidation,
  removeValidation
}