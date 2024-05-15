const mongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const Blog = mongoose.model('Blog', blogSchema, 'blogs')

module.exports = Blog
