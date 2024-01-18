const test = require('ava');
const request = require('supertest')
const app = require('../app')

test('Get list of all events', async t => {
  t.plan(1)

  const res = await request(app).get('/events/all')
  t.is(res.status, 200)
})

test('Create a new event', async t => {
  t.plan(4)

  const eventToCreate = {
    name: 'Zeytinli Rock Feast',
    place: 'Balıkesir',
    date: '17-22 August 2022',
    organizers: [],
    attendees: []
  }

  const res = await request(app)
    .post('/events')
    .send(eventToCreate)

  t.is(res.status, 200)
  t.is(res.body.name, eventToCreate.name)
  t.is(res.body.place, eventToCreate.place)
  t.deepEqual(res.body.attendees, eventToCreate.attendees)
})

test('Fetch an event', async t => {
  t.plan(1)
  const eventToCreate = {
    name: 'Modern Art Exhibition',
    place: 'Istanbul',
    date: '15-18 September 2022',
    organizers: [],
    attendees: []
  }

  const eventCreated = (await request(app)
    .post('/events')
    .send(eventToCreate)).body

  const fetchRes = await request(app).get(`/events/${eventCreated._id}`)
  t.is(fetchRes.status, 200)
})

test('Delete an event', async t => {
  t.plan(3)
    const eventToCreate = {
    name: 'Ankara Theatre Days',
    place: 'Ankara',
    date: '15-18 January 2023',
    organizers: [],
    attendees: []
  }

  const event = (await request(app)
    .post('/events')
    .send(eventToCreate)).body

  const deleteRes = await request(app).delete(`/events/${event._id}`)

  t.is(deleteRes.status, 200)
  t.is(deleteRes.ok, true)

  const fetch = await request(app).get(`/events/${event._id}`)
  t.is(fetch.status, 404)
})
