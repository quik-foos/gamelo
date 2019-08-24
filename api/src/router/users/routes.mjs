import { User } from './schema.mjs'

// Get user
const getUser = (req, res) => {
  console.log(req.user)
  console.log(req.isAuthenticated())
  User.findOne({
    username: req.params.username
  }, (error, user) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
      return
    } else if (user) {
      res.send(user)
    } else {
      res.send({ error: 'User not found' })
    }
  })
}

// Create a user
const createUser = (req, res) => {
  new User({
    ...req.body
  }).save((error, user) => {
    if (error) {
      console.log(error)
      res.status(403).send(error)
      return
    }
    res.send({
      message: 'User created successfully',
      user: user
    })
  })
}

// Update a user
const updateUser = (req, res) => {
  User.findOne({
    username: req.params.username
  }, (error, user) => {
    if (error || !user) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    Object.keys(req.body).forEach( key => {
      if (req.body) {
        tile[key] = req.body[key]
      }
    })
    user.save((error, user) => {
      if (error) {
        console.log(error)
        res.status(500).send(error)
        return
      }
      res.send({
        message: 'User updated successfully',
        user: user
      })
    })
  })
}

// Delete a user
const deleteUser = (req, res) => {
  User.remove({
    username: req.params.username
  }, error => {
    if (error) {
      console.log(error)
      res.status(500).send(error)
      return
    }
    res.send({
      message: 'User deleted successfully'
    })
  })
}

const login = (passport) => {
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

export default (express, passport) => {
  return express.Router()
    .get('/users/:username', getUser)
    .post('/users', createUser)
    .put('/users/:username', updateUser)
    .delete('/users/:username', deleteUser)
    .post('/login', login(passport))
    .post('/logout', logout)
}
