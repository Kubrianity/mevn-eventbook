if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express')
require('./database-connection')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors({ credentials: true, origin: true, methods: ['POST', 'GET', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'] }))

const PersonModel = require('./models/person')

const cookieParser = require('cookie-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
passport.serializeUser(PersonModel.serializeUser()) 
passport.deserializeUser(PersonModel.deserializeUser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  resave: true, 
  saveUninitialized: true 
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

app.use(bodyParser.json())
app.set('view engine', 'pug')

passport.use(new LocalStrategy(PersonModel.authenticate()))

const eventRouter = require('./routes/event')
const personRouter = require('./routes/person')
const commentRouter = require('./routes/comment')
const authRouter = require('./routes/auth')

app.use('/events', eventRouter)
app.use('/person', personRouter)
app.use('/comments', commentRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.render('index')
})

module.exports = app