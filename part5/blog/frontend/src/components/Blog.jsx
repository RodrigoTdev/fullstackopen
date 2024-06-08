import axios from 'axios'
import { Togglable } from './Togglable'
import { useState } from 'react'

const Blog = ({ blog, setChildLikedBy }) => {
  const [likedBy, setLikedBy] = useState(null)
  const handleClickLike = () => {
    const user = JSON.parse(localStorage.getItem('loggedBlogappUser'))
    const { title, author, url, likes } = blog
    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: likes + 1,
      userid: user?.userId,
    }
    axios.put(`/api/blogs/${blog.id}`, newBlog).then(
      () => setLikedBy(user?.name),
      setChildLikedBy((prev) => prev + 1)
    )
  }
  const handleDeleteBlog = (id) => {
    const user = JSON.parse(localStorage.getItem('loggedBlogappUser'))
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      axios
        .delete(`/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => setChildLikedBy((prev) => prev + 1))
    }
  }
  return (
    <div className='blog-container'>
      <h2 className='title'>Title: {blog.title}</h2>
      <p>
        Author: <span className='author'>{blog.author}</span>
      </p>
      <Togglable buttonLabel='View Details'>
        <p
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '-4px',
          }}
        >
          <span className='url'>Url: {blog.url}</span>
          <span className='likes'>Likes: {blog.likes}</span>
          <button
            className='like-button'
            onClick={() => handleClickLike()}
            style={{
              cursor: 'pointer',
              backgroundColor: 'green',
              color: 'white',
              borderRadius: '5px',
              border: 'none',
              width: '50px',
              marginBottom: '5px',
            }}
          >
            like
          </button>
          {likedBy && (
            <span style={{ color: 'green' }}>
              Liked by <b>{likedBy}</b>
            </span>
          )}
          <button
            onClick={() => handleDeleteBlog(blog.id)}
            style={{
              cursor: 'pointer',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '5px',
              border: 'none',
              width: '50px',
              marginBottom: '5px',
            }}
          >
            Delete
          </button>
        </p>
      </Togglable>
    </div>
  )
}

export default Blog
