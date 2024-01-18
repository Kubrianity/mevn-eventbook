const test = require('ava');
const request = require('supertest')
const app = require('../app')

test('Register a new person', async t => {
  t.plan(1)
  const newPerson = {
    username: 'New User',
    password : "password"
  }

  const res = await request(app)
    .post('/auth/register')
    .send(newPerson)
  
  // Check for server response status  
  t.is(res.status, 200)
})

