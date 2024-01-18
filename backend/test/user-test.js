const test = require('ava');
const request = require('supertest')
const app = require('../app')

test('Get list of all people', async t => {
  t.plan(1)
  
  const res = await request(app).get('/person/all')
  t.is(res.status, 200)

})

test('Create a new person', async t => {
  t.plan(2)
  const newPerson = {
    username: 'New User',
    password : "password"
  }

  const res = await request(app)
    .post('/auth/register')
    .send(newPerson)
  
  // Check for server response status  
  t.is(res.status, 200)
  // Compare the user data
  t.is(res.body.username, newPerson.username)
})

test('Fetch a person', async t => {
  t.plan(1)
  const personToFetch = {
    username: 'Fetched User',
    password: "12345"
  }

  // Create a person
  const fetchedUser = (await request(app)
    .post('/auth/register')
    .send(personToFetch)).body

  // Fetch the person
  const fetchRes = await request(app).get(`/person/${fetchedUser._id}`)
  
  t.is(fetchRes.status, 200)
})

test('Delete a person', async t => {
    t.plan(3)
  
    const personToCreate = { username: 'Lovely Cat', password: "mirmir" }
  
    const userCreated = (await request(app)
      .post('/auth/register')
      .send(personToCreate)).body
  
    const deleteRes = await request(app).delete(`/person/${userCreated._id}`)
    
    t.is(deleteRes.status, 200)
    t.is(deleteRes.ok, true)
  
    const fetch = await request(app).get(`/person/${userCreated._id}`)
  
    t.is(fetch.status, 404)
})