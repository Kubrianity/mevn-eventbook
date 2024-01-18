const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose");

const PersonSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    upcomingEvents: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Event',
        autopopulate: {
            maxDepth: 1
        }
    }],
    createdEvents: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Event',
        autopopulate: {
            maxDepth: 1
        }
    }],
    contacts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Person',
        autopopulate: {
            maxDepth: 1
        }
    }],
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment',
        autopopulate: {
            maxDepth: 1
        }
    }]
},
{
    timestamps: true
})

PersonSchema.plugin(require('mongoose-autopopulate'))

PersonSchema.plugin(passportLocalMongoose)

const PersonModel = mongoose.model('Person', PersonSchema)

module.exports = PersonModel
