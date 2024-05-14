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

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
}
