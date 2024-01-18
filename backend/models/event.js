const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    place: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    attendees: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Person',
        autopopulate: {
            maxDepth: 1 
        }
    }],
    organizers: [{
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
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

EventSchema.plugin(require('mongoose-autopopulate'))

const EventModel = mongoose.model('Event', EventSchema)

module.exports = EventModel
