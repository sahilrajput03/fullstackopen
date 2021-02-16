const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

const url = process.env.MONGODB_URI
// console.log('**##**CONNECTING TO MongoDB URL:', url)
console.log('**##**CONNECTING TO MongoDB')

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('**##**CONNECTED TO MongoDB')
  })
  // .catch((error) => console.log('**##**ERROR CONNECTING TO MongoDB:', error.message)
  .catch((error) => console.log('**##**ERROR (-X-X-X-) CONNECTION TO MongoDB FAILED')
  )

const personSchema = new mongoose.Schema({
  name: {
    type: String, unique: true, minlength: 3
  },
  number: { type: Number, min: 10000000 }
})
// #region Alternate personSchema (earlier code)
// const personSchema = new mongoose.Schema({
//   name: String,
//   number: Number
// })
// #endregion

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()

    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
// console.log("Hello");