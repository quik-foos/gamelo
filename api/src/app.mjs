import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import expressSession from 'express-session'
import mongoose from 'mongoose'
import passport from 'passport'
import initPassport from './passport/init.mjs'
import router from './router.mjs'

// DB Setup
mongoose.connect(`mongodb://${process.env.DATABASE_URL}`)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('Connection Succeeded')
})

// Express Setup
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())

// Passport setup
initPassport(passport)
app.use(expressSession({secret: 'secret'}));
app.use(passport.initialize())
app.use(passport.session())

// CORS setup
const whitelist = [
  process.env.CLIENT_URL,
  'http://localhost:4000'
]
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      console.log(origin)
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,
  credentials: true
}
app.use(cors(corsOptions))
app.options('*', cors())

app.use('/api', router(express, passport))

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.API_URL}`)
})