const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app.js')
const User = require('../models/user.js')
const helpers = require('./test_helpers')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('albus', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helpers.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helpers.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helpers.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helpers.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails if username length is less than 3', async () => {
    const usersAtStart = await helpers.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helpers.usersInDb()
    assert(
      result.body.error.includes(
        'username and password must be at least 3 characters long'
      )
    )

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails if password length is less than 3', async () => {
    const usersAtStart = await helpers.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helpers.usersInDb()
    assert(
      result.body.error.includes(
        'username and password must be at least 3 characters long'
      )
    )

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  try {
    await mongoose.connection.close()
    console.log('Conexión cerrada correctamente')
    process.exit(0)
  } catch (error) {
    console.error('Error al cerrar la conexión:', error)
    process.exit(1)
  }
})
