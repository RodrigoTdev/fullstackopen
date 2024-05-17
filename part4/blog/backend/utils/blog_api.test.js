const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index.js')
const Blog = require('../models/blog.js')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Nodejs 19',
    author: 'RodriDev',
    url: 'https://nodejs.org/en/',
    likes: 19,
  },
  {
    title: 'Nodejs 20',
    author: 'RodriDev',
    url: 'https://nodejs.org/en/',
    likes: 20,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
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

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blogs have id identifier', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(
    response.body.every((objeto) => objeto.hasOwnProperty('id')),
    true
  )
})

test('add a new blog', async () => {
  const newBlog = {
    title: 'Jest',
    author: 'RodriDev',
    url: 'https://jestjs.io',
    likes: 52000,
  }
  const response = await api.post('/api/blogs').send(newBlog)
  assert.strictEqual(response.body.length, initialBlogs.length + 1)
})

test('add a new blog without likes', async () => {
  const newBlog = {
    title: 'TypeScript',
    author: 'RodriDev',
    url: 'https://www.typescriptlang.org',
  }
  const response = await api.post('/api/blogs').send(newBlog)
  assert.strictEqual(response.body[response.body.length - 1].likes, 0)
})

test('add a new blog without url', async () => {
  const newBlog = {
    title: 'TypeScript',
    author: 'RodriDev',
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('add a new blog without title', async () => {
  const newBlog = {
    author: 'RodriDev',
    url: 'https://www.typescriptlang.org',
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('delete a blog by id', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body[1].id

  await api.delete(`/api/blogs/${id}`)
  const response2 = await api.get('/api/blogs')
  assert.strictEqual(response2.body.length, initialBlogs.length - 1)
})

test('update a blog', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body[0].id
  const blog = {
    title: 'Nodejs 19',
    author: 'RodriDev',
    url: 'https://nodejs.org/en/',
    likes: 150,
  }
  await api.put(`/api/blogs/${id}`).send(blog)
  const response2 = await api.get('/api/blogs')
  assert.strictEqual(response2.body[0].likes, 150)
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
