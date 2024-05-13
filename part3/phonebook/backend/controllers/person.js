const express = require('express')
const PersonModel = require('../models/person')
const router = express.Router()
const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err))

// Routes
router.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

router.get('/persons', async (req, res, next) => {
  try {
    const db = await PersonModel.find()
    res.json(db)
  } catch (error) {
    next(error)
  }
})

router.get('/persons/:id', async (req, res, next) => {
  try {
    const person = await PersonModel.findById(req.params.id)
    res.json(person)
  } catch (error) {
    next(error)
  }
})

router.get('/info', async (req, res, next) => {
  try {
    const db = await PersonModel.find()
    res.send(
      `<p>Phonebook has info for ${db.length} people</p><p>${new Date()}</p>`
    )
  } catch (error) {
    next(error)
  }
})

router.post('/persons', async (req, res) => {
  const { name, number } = req.body

  try {
    // Validations
    if (!name || !number) {
      return res.status(400).json({ error: 'name or number missing' })
    }

    const newDb = await PersonModel.create({
      name,
      number,
    })
    res.status(201).json(newDb)
  } catch (error) {
    next(error)
  }
})

router.delete('/persons/:id', async (req, res) => {
  try {
    await PersonModel.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/persons/:id', async (req, res) => {
  try {
    await PersonModel.findByIdAndUpdate(req.params.id, req.body)

    res.status(201)
  } catch (error) {
    next(error)
  }
})

module.exports = router
