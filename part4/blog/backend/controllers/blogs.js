const express = require('express')
const app = express()
const Blog = require('../models/blog')
const route = express.Router()

route.get('/', (request, response) => {
  try {
    Blog.find({}).then((blogs) => {
      response.json(blogs)
    })
  } catch (error) {
    console.log(error)
  }
})

route.post('/', (request, response) => {
  const blog = new Blog(request.body)
  try {
    blog.save().then((result) => {
      response.status(201).json(result)
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = route
