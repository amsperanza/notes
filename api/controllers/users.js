const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    date: 1
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { body } = request
  const { 
    username, 
    name, 
    password,
    titular,
    residencia,
    about,
    hobbiestring,
    deportes,
    carrera: [{
      institucion,
      categoria,
      desde,
      hasta,
      desc_gral,
      logros
    }]
  } = body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
    titular,
    residencia,
    about,
    hobbiestring,
    deportes,
    carrera: [{
      institucion,
      categoria,
      desde,
      hasta,
      desc_gral,
      logros
    }]
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
