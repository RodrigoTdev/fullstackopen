const blog = require('../models/blog')

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

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
