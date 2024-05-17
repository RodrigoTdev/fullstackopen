const express = require('express')
const app = express()
const Blog = require('../models/blog')
const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})

    response.status(200).json(blogs)
  } catch (error) {
    console.log(error)
  }
})

blogsRouter.post('/', async (request, response) => {
  const blog = await new Blog(request.body)
  try {
    if (!blog.title || !blog.url) {
      return response.status(400).json({ error: 'title and url are required' })
    }
    await blog.save()
    const blogs = await Blog.find({})
    response.status(201).json(blogs)
  } catch (error) {
    console.log(error)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const _id = request.params.id
  try {
    const result = await Blog.findByIdAndDelete(_id)
    response.status(204).json(result)
  } catch (error) {
    console.log(error)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const _id = request.params.id
  const blog = request.body
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(_id, blog)
    response.status(200).json(updatedBlog)
  } catch (error) {
    console.log(error)
  }
})

module.exports = blogsRouter
