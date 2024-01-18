const test = require('ava');
const request = require('supertest')
const app = require('../app')

test('Get list of all comments', async t => {
  t.plan(1)
  
  const res = await request(app).get('/comments/all')
  t.is(res.status, 200)
})
