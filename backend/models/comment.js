const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    body: String,
    author: String,
},
{
    timestamps: true
})

const CommentModel = mongoose.model('Comment', CommentSchema)

module.exports = CommentModel
