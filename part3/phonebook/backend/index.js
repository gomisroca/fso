require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
  response.send('<h1>Welcome to the Phonebook API</h1>')
})

app.get('/api/info', (request, response, next) => {
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} persons</p><p>${new Date()}</p>`)
  })
    .catch(error =>  next(error))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
    .catch(error =>  next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  let existingPerson = null
  Person.findOne({ name: body.name }).then(person => existingPerson = person)

  if (!body.name) {
    return response.status(400).json({
      error: 'Name Missing'
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'Number Missing'
    })
  } else if (existingPerson) {
    return response.status(400).json({
      error: 'Person already exists'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error =>  next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    if(person){
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error =>  next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  const id = request.params.id
  Person.findByIdAndUpdate(
    id,
    { name, number },
    { new: true , runValidators: true , context: 'query' }
  ).then(updatedPerson => {
    response.json(updatedPerson)
  }).catch(error =>  next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id).then(result => {
    response.status(204).end()
  })
    .catch(error =>  next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted ID' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})