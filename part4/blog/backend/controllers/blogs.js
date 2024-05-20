const express = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const blogsRouter = express.Router()
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    response.status(200).json(blogs)
  } catch (error) {
    console.log(error)
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(request.user.id)

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

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const _id = request.params.id
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const user = await User.findById(request.user.id)

    try {
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
      }
      const blog = await Blog.findById(_id)
      if (request.user.id === blog.user.toString()) {
        const result = await Blog.findByIdAndDelete(_id)
        user.blogs = user.blogs.filter((b) => b.toString() !== _id)
        await user.save()
        response.status(204).json(result)
      } else {
        return response.status(401).json({ error: 'unauthorized' })
      }
    } catch (error) {
      console.log(error)
    }
  }
)

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
