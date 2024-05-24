import { useEffect, useRef, useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import { AddBlogForm } from './AddBlogForm'
import { Notification } from './Notification'
import { Togglable } from './Togglable'

export const Blogs = ({ name }) => {
  const [blogs, setBlogs] = useState([])
  const [addBlogNotification, setAddBlogNotification] = useState(false)
  const [addNewBlog, setAddNewBlog] = useState({})
  const [likedBy, setLikedBy] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(blogs.filter((blog) => blog.user.name === name))
      )
  }, [addNewBlog, name, likedBy])

  const handleClickLogOut = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const blogFormRef = useRef()

  const childLikedBy = (name) => {
    setLikedBy(name)
  }

  return (
    <div className='blogs'>
      <div className='header'>
        <p style={{ marginLeft: 'auto', marginRight: '20px' }}>
          <span style={{ fontWeight: 'bold', color: 'green' }}>{name}</span> -
          Loggend In
        </p>
        <button
          style={{ marginRight: '20px' }}
          onClick={() => handleClickLogOut()}
        >
          Logout
        </button>
      </div>

      {addBlogNotification && (
        <Notification
          loginError={addBlogNotification}
          setAddBlogNotification={setAddBlogNotification}
        />
      )}
      <Togglable
        buttonLabel='reveal'
        ref={blogFormRef}
      >
        <AddBlogForm
          setAddBlogNotification={setAddBlogNotification}
          setAddNewBlog={setAddNewBlog}
          blogFormRef={blogFormRef}
        />
      </Togglable>
      <h1>BLOGS</h1>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          setChildLikedBy={childLikedBy}
        />
      ))}
    </div>
  )
}
