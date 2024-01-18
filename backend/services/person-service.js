const BaseService = require('./base-service');
const PersonModel = require('../models/person');

class PersonService extends BaseService {
  model = PersonModel
    
  async create(person, event) {
    try {
      person.createdEvents.push(event)
      event.organizers.push(person)
      event.attendees.push(person)
      await person.save()
      await event.save()
    }
		catch(err) {
			console.log('Error creating an event in service', err)
		}
  }

  async register(person, event) {
		try {
      person.upcomingEvents.push(event)
      event.attendees.push(person)
      await person.save()
      await event.save()
		}
		catch(err) {
			console.log('Error registering for an event in service', err)
		}
  }

  async connect(person, personToConnect) {
		try {
      person.contacts.push(personToConnect)
      personToConnect.contacts.push(person)
      await person.save()
      await personToConnect.save()
		}
		catch(err) {
			console.log('Error connecting with a user in service', err)
		}	
  }

  async makeComment(person, comment, event) {
		try {
      person.comments.push(comment)
      comment.author = person.username
      event.comments.push(comment)
      await person.save()
      await comment.save()
      await event.save()
		}
		catch(err) {
			console.log('Error making a comment in service', err)
		}
  }
}

module.exports = new PersonService();