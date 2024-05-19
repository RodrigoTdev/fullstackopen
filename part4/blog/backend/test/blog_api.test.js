const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const helpers = require('./test_helpers')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog({
      ...helpers.initialBlogs[0],
      user: '664945dc28a7ef70c158dcc5',
    })
    await blogObject.save()
    blogObject = new Blog({
      ...helpers.initialBlogs[1],
      user: '664945dc28a7ef70c158dcc5',
    })

    await blogObject.save()
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Quantity of blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helpers.initialBlogs.length)
  })

  test('blogs have id identifier', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(
      response.body.every((objeto) => objeto.hasOwnProperty('id')),
      true
    )
  })
})

describe('no reset', () => {
  test('add a new blog', async () => {
    const newBlog = {
      title: 'Jest',
      author: 'RodriDev',
      url: 'https://jestjs.io',
      likes: 52000,
      userId: '664945dc28a7ef70c158dcc5',
    }
    await api
      .post('/api/blogs')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY2NDk2OGFkODY3OWY2ZTBmNmEzMmQ1NiIsImlhdCI6MTcxNjA4NzAwOCwiZXhwIjoxNzE2MTczNDA4fQ.k5QxbW3e9vO78ErndNyq1CNAC_0lFKmZyL4_PBcAqQo'
      )
      .send(newBlog)
    const blogs = await Blog.find({})

    assert.strictEqual(blogs.length, helpers.initialBlogs.length + 1)
  })

  test('add a new blog without likes', async () => {
    const newBlog = {
      title: 'TypeScript',
      author: 'RodriDev',
      url: 'https://www.typescriptlang.org',
      userId: '664945dc28a7ef70c158dcc5',
    }
    const response = await api
      .post('/api/blogs')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY2NDk2OGFkODY3OWY2ZTBmNmEzMmQ1NiIsImlhdCI6MTcxNjA4NzAwOCwiZXhwIjoxNzE2MTczNDA4fQ.k5QxbW3e9vO78ErndNyq1CNAC_0lFKmZyL4_PBcAqQo'
      )
      .send(newBlog)
    assert.strictEqual(response.body.likes, 0)
  })

  test('add a new blog without url', async () => {
    const newBlog = {
      title: 'TypeScript',
      author: 'RodriDev',
      userId: '664945dc28a7ef70c158dcc5',
    }
    await api
      .post('/api/blogs')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY2NDk2OGFkODY3OWY2ZTBmNmEzMmQ1NiIsImlhdCI6MTcxNjA4NzAwOCwiZXhwIjoxNzE2MTczNDA4fQ.k5QxbW3e9vO78ErndNyq1CNAC_0lFKmZyL4_PBcAqQo'
      )
      .send(newBlog)
      .expect(400)
  })

  test('add a new blog without title', async () => {
    const newBlog = {
      author: 'RodriDev',
      url: 'https://www.typescriptlang.org',
      userId: '664945dc28a7ef70c158dcc5',
    }
    await api
      .post('/api/blogs')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY2NDk2OGFkODY3OWY2ZTBmNmEzMmQ1NiIsImlhdCI6MTcxNjA4NzAwOCwiZXhwIjoxNzE2MTczNDA4fQ.k5QxbW3e9vO78ErndNyq1CNAC_0lFKmZyL4_PBcAqQo'
      )
      .send(newBlog)
      .expect(400)
  })

  test('delete a blog by id', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id

    await api.delete(`/api/blogs/${id}`)
    const response2 = await api.get('/api/blogs')
    assert.strictEqual(response2._body.length, helpers.initialBlogs.length + 1)
  })

  test('update a blog', async () => {
    const response = await api.get('/api/blogs')

    const id = response.body[0].id
    const blog = {
      title: 'Nodejs 20',
      author: 'RodriDev',
      url: 'https://nodejs.org/en/',
      likes: 150,
      userId: '664945dc28a7ef70c158dcc5',
    }
    await api.put(`/api/blogs/${id}`).send(blog)
    const response2 = await api.get('/api/blogs')
    assert.strictEqual(response2.body[0].likes, 150)
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

// npm test -- utils/blog_api.test.js
