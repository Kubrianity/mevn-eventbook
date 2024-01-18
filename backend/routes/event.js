const express = require('express')
const router = express.Router()

const EventService = require('../services/event-service')
const PersonService = require('../services/person-service')
const isLoggedIn = require('../middleware/ensure-login')

router.get('/all', async (req, res) => {
  try {
    const events = await EventService.findAll()
    res.render('events', { events })
  }
  catch(err) {
    console.log('Error fetching events', err)
  }
})

router.get('/all/json', async (req, res) => {
  try {
    const events = await EventService.findAndFilterByDate()
    res.send(events)
  }
  catch(err) {
    console.log('Error fetching events in json', err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const event = await EventService.find(req.params.id)
    if(!event) res.status(404)
    res.render('event-detail', { event })
  }
  catch(err) {
    console.log('Error fetching an event', err)
  }
})

router.get('/:id/json', async (req, res) => {
  try {
    const event = await EventService.find(req.params.id)
    if(!event) res.status(404)
    res.send(event)
  }
  catch(err) {
    console.log('Error fetching an event in json', err)
  }
})

router.post('/', isLoggedIn, async (req, res) => {
  try {
    const person = await PersonService.find(req.user._id)
    const event = await EventService.add(req.body.formInfo)
    await PersonService.create(person, event)
    res.send(event)
  }
  catch(err) {
    console.log('Error creating an event', err)
  }
})

router.put('/:id', isLoggedIn, async (req,res) => {
  try {
    const {id} = req.params
    await EventService.update(id, req.body)
    res.send('Updated')
  }
  catch(err) {
    console.log('Error updating an event', err)
  }
})

router.delete('/:id', isLoggedIn, async (req, res) => {
  try {
    await EventService.delete(req.params.id)
    res.send('Deleted!')
  }
  catch(err) {
    console.log('Error deleting an event', err)
  }
})

module.exports = router