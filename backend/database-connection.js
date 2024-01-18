const mongoose = require('mongoose')
async function main () {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost/eventbook', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('Connected'))
    .catch(err => console.log(err))
}      
main()