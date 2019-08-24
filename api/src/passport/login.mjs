import User from '../models/user.mjs'
import passportLocal from 'passport-local'
const LocalStrategy = passportLocal.Strategy

const login = passport => {
  passport.use('login',
    new LocalStrategy((username, password, done) => { 
      User.findOne({ username: username })
        .select('+passwordHash')
        .exec((err, user) => {

        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false, { message: 'Username does not exist' })
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password' })
        }
        return done(null, user);
      })
    })
  )
}

export default login