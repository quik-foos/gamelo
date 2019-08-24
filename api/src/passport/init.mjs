import login from './login.mjs'
import signup from './signup.mjs'

const init = passport => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })
        
  passport.deserializeUser((user, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  // Set up strategies for login and register
  login(passport)
  signup(passport)
}

export default init 