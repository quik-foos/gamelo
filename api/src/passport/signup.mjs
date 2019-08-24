import { User } from '../router/users/schema.mjs'
import passportLocal from 'passport-local'
const LocalStrategy = passportLocal.Strategy

const login = passport => {
  passport.use('signup',
    new LocalStrategy((username, password, done) => { 
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err)
        }
        if (user) {
          return done(null, false, { message: 'User already exists' })
        } else {
          let newUser = new User({ username: username, password: password })
          newUser.save(err => {
            if (err) {
              throw err
            }
            return done(null, newUser, { message: 'User created successfully'})
          })
        }
      })
    })
  )
}

export default login