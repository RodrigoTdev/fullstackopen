const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const helpers = require('./test_helpers')
const jwt = require('jsonwebtoken')

const api = supertest(app)

describe('blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog({
      ...helpers.initialBlogs[0],
      user: '664a7c1896a3a65fcfff47df',
    })
    await blogObject.save()
    blogObject = new Blog({
      ...helpers.initialBlogs[1],
      user: '664a7c1896a3a65fcfff47df',
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
  const validToken = jwt.sign(
    { username: 'root', id: '664a7c1896a3a65fcfff47df' },
    process.env.SECRET,
    { expiresIn: '24h' }
  )
  test('add a new blog', async () => {
    const users = await User.find({})
    const newBlog = {
      title: 'Jest',
      author: 'RodriDev',
      url: 'https://jestjs.io',
      likes: 52000,
      userId: '664a7c1896a3a65fcfff47df',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${validToken}`)
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
      .set('Authorization', `Bearer ${validToken}`)
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
      .set('Authorization', `Bearer ${validToken}`)
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
      .set('Authorization', `Bearer ${validToken}`)
      .send(newBlog)
      .expect(400)
  })
  test('delete a blog by id', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${validToken}`)
    const response2 = await api.get('/api/blogs')
    assert.strictEqual(response2._body.length, helpers.initialBlogs.length + 1)
  })
  test('delete a blog by id without token', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    const responseDelete = await api.delete(`/api/blogs/${id}`).expect(401)
    // .set('Authorization', `Bearer ${validToken}`)
    const response2 = await api.get('/api/blogs')
    assert.strictEqual(responseDelete.body.error, 'Token missing or invalid')
    assert.strictEqual(response2.body.length, helpers.initialBlogs.length + 1)
  })
  test('delete a blog by id with an invalid token', async () => {
    const blogs = await api.get('/api/blogs')
    const id = blogs.body[0].id
    const responseDelete = await api
      .delete(`/api/blogs/${id}`)
      .expect(401)
      .set('Authorization', `Bearer invalidToken`)
    const blogsAfterDelete = await api.get('/api/blogs')
    assert.strictEqual(responseDelete.body.error, 'token invalid')
    assert.strictEqual(
      blogsAfterDelete.body.length,
      helpers.initialBlogs.length + 1
    )
  })
  test('delete a blog by incorrect user', async () => {
    const validToken2 = jwt.sign(
      { username: 'root2', id: '664bb8b1cb8eed986e79c3fe' },
      process.env.SECRET,
      { expiresIn: '24h' }
    )
    const blogs = await api.get('/api/blogs')
    const id = blogs.body[0].id
    const responseDelete = await api
      .delete(`/api/blogs/${id}`)
      .expect(401)
      .set('Authorization', `Bearer ${validToken2}`)
    const blogsAfterDelete = await api.get('/api/blogs')
    assert.strictEqual(responseDelete.body.error, 'unauthorized')
    assert.strictEqual(
      blogsAfterDelete.body.length,
      helpers.initialBlogs.length + 1
    )
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
