import Result from '../models/result.mjs'

const findAll = (req, res) => {
  Result.find({}, (error, results) => {
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

export default {
  findAll,
  findOne,
  create,
  update,
  destroy
}