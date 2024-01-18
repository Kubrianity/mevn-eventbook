module.exports = class Service {
  constructor(model, dbPath) {
    this.model = model
    this.dbPath = dbPath
  }

  async findAll() {
    try {
      return this.model.find()
    }
    catch(err) {
      console.log('Error finding items in database', err)
    }
  }

  async add(item) {
    try {
      return this.model.create(item)
    }
    catch(err) {
      console.log('Error creating an item in database', err)
    }
  }

  async  del(itemId) {
    try {
      return this.model.deleteOne({_id: itemId })
    }
    catch(err) {
      console.log('Error deleting an item in database', err)
    }
  }

  async find(itemId) {
    try {
      return this.model.findById({_id: itemId})
    }
    catch(err) {
      console.log('Error finding an item in database', err)
    }
  }
  
  async update(itemId, updatedValues) {
    try {
      return this.model.findByIdAndUpdate({_id: itemId }, updatedValues, {runValidators:true, new:true})
    }
    catch(err) {
      console.log('Error updating an item in database', err)
    }
  }
}