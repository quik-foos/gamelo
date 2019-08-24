import login from './login.mjs'
import signup from './signup.mjs'
import User from '../models/user.mjs'

const init = passport => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })
        
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  // Set up strategies for login and register
  login(passport)
  signup(passport)
}

export default init 