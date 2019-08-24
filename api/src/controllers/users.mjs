import User from '../models/user.mjs'

const findAll = (req, res) => {
  res.status(405)
}

// Get user
const findOne = (req, res) => {
  User.findOne({
    username: req.params.username
  }, (error, user) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
    } else if (user) {
      res.send(user)
    } else {
      res.send({ error: 'User not found' })
    }
  })
}

// Create a user
const create = (req, res) => {
  new User({
    ...req.body
  }).save((error, user) => {
    if (error || !user) {
      console.log(error)
      res.status(500).send(error)
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
  User.findOne({
    username: req.params.username
  }, (error, user) => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
    } else if (user) {
      Object.keys(req.body).forEach( key => {
        if (req.body) {
          tile[key] = req.body[key]
        }
      })
      user.save((error, user) => {
        if (error || !user) {
          console.log(error)
          res.status(500).send(error)
          return
        }
        res.send({
          message: 'User updated successfully',
          user: user
        })
      })
    } else {
      res.status(404).send({ message: 'User not found' })
    }
  })
}

// Delete a user
const destroy = (req, res) => {
  User.remove({
    username: req.params.username
  }, error => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
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
        return res.send({
          success: false,
          message: err
        })
      }
      if (!user) {
        return res.send({
          success: false,
          error: 'Incorrect username or password'
        })
      }
      req.login(user, err => {
        if (err) {
          return res.send({
            success: false,
            error: err
          })
        }
        return res.send({ success: true })
      })
    })(req, res, next)
  }
}

const logout = (req, res) => {
  req.logout()
  res.send({ success: true })
}

export default {
  findAll,
  findOne,
  create,
  update,
  destroy,
  login,
  logout
}
