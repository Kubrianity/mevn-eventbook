const express = require('express')
const router = express.Router()

const PersonService = require('../services/person-service')
const EventService = require( '../services/event-service' )
const CommentService = require( '../services/comment-service' )
const isLoggedIn = require('../middleware/ensure-login')


router.get('/all', async (req, res) => {
  try {
    const people = await PersonService.findAll()
    res.render('people', { people })
  }
  catch(err) {
    console.log('Error fetching users', err)
  }
})

router.get('/all/json', async (req, res) => {
  try {
    const users = await PersonService.findAll()
    res.send(users)
  }
  catch(err) {
    console.log('Error fetching users in json', err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const person = await PersonService.find(req.params.id)
    if (!person) res.status(404)
    res.render('person-detail', { person })
  }
  catch(err) {
    console.log('Error fetching a user', err)
  }
})

router.get('/:id/json', async (req, res) => {
  try {
    const person = await PersonService.find(req.params.id)
    if (!person) res.status(404)
    res.send(person)
  }
  catch(err) {
    console.log('Error fetching a user in json', err)
  }
})

// Updates person model
router.patch('/:id', isLoggedIn, async (req,res) => {
  try {
    const {id} = req.params
    await PersonService.update(id, req.body)
    res.send('Updated')
  }
  catch(err) {
    console.log('Error updating a user info', err)
  }
})

router.delete('/:id', isLoggedIn, async (req, res) => {
  try {
    await PersonService.del(req.params.id)
    res.send('Deleted!')
  }
  catch(err) {
    console.log('Error deleting a user', err)
  }
})

// Register for an event
router.post('/register/:eventId', isLoggedIn, async (req, res) => {
  try {
    const person = await PersonService.find(req.user._id)
    const event = await EventService.find(req.params.eventId)
    await PersonService.register(person, event)
    res.send(person)
  }
  catch(err) {
    console.log('Error registering for an event', err)
  }
})

// Add a new contact
router.post('/contacts/:targetId', isLoggedIn, async (req, res) => {
  try {
    const person = await PersonService.find(req.user._id)
    const personToConnect = await PersonService.find(req.params.targetId)
    await PersonService.connect(person, personToConnect)
    res.send('connected!')
  }
  catch(err) {
    console.log('Error connecting with a user', err)
  }
})

// Make a comment for an event
router.post('/events/:eventId/comments', isLoggedIn, async (req, res) => {
  try {
    const person = await PersonService.find(req.user._id)
    const event = await EventService.find(req.params.eventId)
    const comment = await CommentService.add(req.body.comment)
    await PersonService.makeComment(person, comment, event)
    res.send('ok!')
  }
  catch(err) {
    console.log('Error making a comment', err)
  }
})

module.exports = router