const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.get('/', async (_, response) => {
  // Fetch and return all users
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username){
    response.status(400).json({
      error: 'Username must be a string'
    })
  } else if (username.length < 3) {
    response.status(400).json({
      error: 'Username must be at least 3 characters'
    })
  }
  
  if (!password) {
    response.status(400).json({
      error: 'Password must be a string'
    })
  } else if (password.length < 3) {
    response.status(400).json({
      error: 'Password must be at least 3 characters'
    })
  }


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter