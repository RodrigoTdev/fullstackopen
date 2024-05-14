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

module.exports = {
  dummy,
  totalLikes,
}
