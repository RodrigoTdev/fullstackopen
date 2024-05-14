var _ = require('lodash')

const dummy = (blogs) => {
  if (Array.isArray(blogs)) {
    return 1
  } else {
    return 'no es array'
  }
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    return total + blog.likes
  }, 0)
}

const mostLikes = (blogs) => {
  return blogs.reduce((acc, valActual) => {
    if (acc.likes < valActual.likes) {
      acc = valActual
    }
    return acc
  }, blogs[0])
}

const mostBlogs = (blogs) => {
  const groups = _.chain(blogs)
    .groupBy('author')
    .map((value, key) => ({ author: key, blogs: value.length }))
    .value()

  const mostBlogs = _.maxBy(groups, 'blogs')
  return mostBlogs
}

const mostLikesByAuthor = (blogs) => {
  const groups = _.chain(blogs)
    .groupBy('author')
    .map((value, key) => ({ author: key, likes: _.sumBy(value, 'likes') }))
    .value()

  const mostLikes = _.maxBy(groups, 'likes')
  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs,
  mostLikesByAuthor,
}
