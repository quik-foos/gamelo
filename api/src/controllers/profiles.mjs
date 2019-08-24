import Profile from '../models/profile.mjs'

const findAll = (req, res) => {
  res.status(405)
}

const findOne = (req, res) => {
  User.findById(req.params.user_id, (error, user) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (user) {
      res.send(user.profile)
    } else {
      res.send({ error: 'User not found' })
    }
  })
}

const create = (req, res) => {
  res.status(405)
}

const update = (req, res) => {
  res.status(405)
}

const destroy = (req, res) => {
  res.status(405)
}

export default {
  findAll,
  findOne,
  create,
  update,
  destroy
}