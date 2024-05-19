const blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Nodejs 19',
    author: 'RodriDev',
    url: 'https://nodejs.org/en/',
    likes: 191,
  },
  {
    title: 'Nodejs 20',
    author: 'RodriDev',
    url: 'https://nodejs.org/en/',
    likes: 201,
  },
]
const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
