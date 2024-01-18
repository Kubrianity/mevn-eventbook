const express = require('express')
const router = express.Router()

const CommentService = require('../services/comment-service')
const isLoggedIn = require('../middleware/ensure-login')

router.get('/all', async (req, res) => {
  try {
    const comments = await CommentService.findAll()
    res.render('comments', { comments })
  }
  catch(err) {
    console.log('Error fetching comments', err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const comment = await CommentService.find(req.params.id)
    if(!comment) res.status(404)
    res.send(comment)
  }
  catch(err) {
    console.log('Error fetching a comment', err)
  }
})

router.delete('/:id', isLoggedIn, async (req, res) => {
  try {
    await CommentService.del(req.params.id)
    res.send('Deleted!')
  }
  catch(err) {
    console.log('Error deleting a comment', err)
  }
})

module.exports = router