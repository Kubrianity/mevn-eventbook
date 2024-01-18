const BaseService = require('./base-service');
const EventModel = require('../models/event');

class EventService extends BaseService {
  model = EventModel

  async findAndFilterByDate() {
    try {
      let currentDate = new Date().toISOString();
      await this.model.updateMany({ date: { $lt: currentDate }}, { isActive: false })
    }
    catch(err) {
      console.log('Error filtering events by date in database', err)
    }
    finally {
      return await this.findAll()
    }
  }
  async delete(itemId) {
    try {
      return await this.model.findByIdAndUpdate({_id: itemId }, { isDeleted: true }, {runValidators:true, new:true})
    }
    catch(err) {
      console.log('Error operating soft delete in database', err)
    }
  }
}
module.exports = new EventService();