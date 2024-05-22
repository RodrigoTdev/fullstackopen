import { useEffect, useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import { AddBlogForm } from './AddBlogForm'
import { Notification } from './Notification'

export const Blogs = ({ name }) => {
  const [blogs, setBlogs] = useState([])
  const [addBlog, setAddBlog] = useState(false)
  const [addBlogNotification, setAddBlogNotification] = useState(false)
  const [addNewBlog, setAddNewBlog] = useState({})

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(blogs.filter((blog) => blog.user.name === name))
      )
  }, [addNewBlog, name])

  const handleClickLogOut = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div className='blogs'>
      <div className='header'>
        <button
          style={{ marginRight: 'auto', marginLeft: '20px' }}
          onClick={() => setAddBlog(!addBlog)}
        >
          {!addBlog ? 'Add Blog' : 'Cancel'}
        </button>
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
      <h1>BLOGS</h1>

      {!addBlog &&
        blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}

      {addBlog && (
        <AddBlogForm
          setAddBlog={setAddBlog}
          setAddBlogNotification={setAddBlogNotification}
          setAddNewBlog={setAddNewBlog}
        />
      )}
    </div>
  )
}
