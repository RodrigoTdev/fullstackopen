const express = require('express')
const app = express()
const Blog = require('../models/blog')
const User = require('../models/user')
const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    response.status(200).json(blogs)
  } catch (error) {
    console.log(error)
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user.id,
  })
  try {
    if (!blog.title || !blog.url) {
      return response.status(400).json({ error: 'title and url are required' })
    }
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
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
