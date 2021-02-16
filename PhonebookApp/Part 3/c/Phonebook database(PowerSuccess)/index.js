require('dotenv').config()
const Person = require('./models/person')

// const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')
app.use(cors())

// Using build folder as the static page source with help of express.
app.use(express.static('build'))

var morgan = require('morgan')

app.use(bodyParser.json())

// #One of perdefined deafult set of params for testing.
// app.use(morgan('combined'))

morgan.token('justBaoddy', function (req, res) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :justBaoddy'))
// #region morgan's Testing
// app.use(morgan(':justBaoddy'))
// app.use(morgan('tiny',':justBaoddy'))  //this doesn't work at all. i.e., using two params are not good with function syntax.
// app.use(morgan('tiny'))
// #endregion

// #region RequestLogger
//   const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }
// app.use(requestLogger)
// #endregion

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'Name is missing'
    })
  }
  else if (!body.number) {
    return response.status(400).json({
      error: 'Number is missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedNote => {
    response.json(savedNote.toJSON())
  }).catch(err => {
    console.log('***HEHAA.*** ERROR FOUND***')
    next(err)
    response.status(406).send({ error: `Phone number: ('${body.number}') is shorter than the 3 digits. Person validation failed.` })
  })

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  // res.send('<p>Phonebook has info for ' + persons.length + ' people.' + '</p><p>' + new Date() + '</p>')

  //mongo raaj
  Person.find({}).then(persn => {
    res.send('<p>Phonebook has info for ' + persn.length + ' people.' + '</p><p>' + new Date() + '</p>')
    // response.json(persons.map(person => person.toJSON()))
  })
})
// #region Simple responding to the '/' (Home Director) of the Domain.
// app.get('/', (req, res) => {
//     res.send('<h1>Hello World!</h1>')
// })
// #endregion

app.get('/api/persons', (req, response) => {
  // res.json(persons)
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // const person = persons.find(n => n.id === id)
  // // response.json(note)

  // if (person) {
  //     response.json(person)
  // } else {
  //     response.status(404).end()
  // }

  Person.findById(request.params.id)
    .then(persn => {
      if (persn) {
        response.json(persn.toJSON())
      } else {
        response.status(404).end()
      }
      // throw new Error("*****Whooooooooooooops!********");
    })
    .catch(err => next(err))

})

app.delete('/api/persons/:id', (request, response, next) => {
  // #region OLD CODE TECHNIQUE
  // const id = Number(request.params.id)
  // persons = persons.filter(note => note.id !== id)
  // console.log("...debugging...", "ITEM DELETED WITH ID: ", id);
  // response.status(204).end()
  // #endregion

  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log('**##**YOU JUST REMOVED THE OBJECT => ', result)
      response.status(204).end()
      // YOU CANNOT DO - response.status(204).send("Abrakadabra") some message because of the error code 204 doesn't allow this.
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: '**##**Unknown Endpoint- Buddy, you have come wrong way.LOL' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT

app.listen(PORT, () => {
  // console.log(`**##**SERVER RUNNING ON PORT ${PORT}`)
  console.log(`**##**SERVER RUNNING ON http://localhost:${PORT}`)
})