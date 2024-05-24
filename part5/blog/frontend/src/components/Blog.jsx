import axios from 'axios'
import { Togglable } from './Togglable'
import { useState } from 'react'

const Blog = ({ blog, addLike, setChildLikedBy }) => {
  const [likedBy, setLikedBy] = useState(null)
  const handleClick = () => {
    const user = JSON.parse(localStorage.getItem('loggedBlogappUser'))
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      userid: user.userId,
    }
    axios.put(`/api/blogs/${blog.id}`, newBlog).then(
      () => setLikedBy(user.name),
      setChildLikedBy((prev) => prev + 1)
    )
  }
  return (
    <div className='blog-container'>
      <h2>Title: {blog.title}</h2>
      <Togglable buttonLabel='View Details'>
        <p>
          Author: {blog.author}
          <br />
          Url: {blog.url}
          <br />
          Likes: {blog.likes}
          <button
            onClick={() => handleClick()}
            style={{
              marginLeft: '10px',
              cursor: 'pointer',
              backgroundColor: 'green',
              color: 'white',
              borderRadius: '5px',
              border: 'none',
            }}
          >
            like
          </button>
          <br />
          {likedBy && (
            <span style={{ color: 'green' }}>
              Liked by <b>{likedBy}</b>
            </span>
          )}
        </p>
      </Togglable>
    </div>
  )
}

export default Blog
