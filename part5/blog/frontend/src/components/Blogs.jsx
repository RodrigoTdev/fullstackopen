import React from 'react'
import Blog from './Blog'

export const Blogs = ({ blogs, name }) => {
  return (
    <div className='blogs'>
      <p style={{ marginLeft: 'auto', marginRight: '20px' }}>
        <span style={{ fontWeight: 'bold', color: 'green' }}>{name}</span> -
        Loggend In
      </p>
      <h1>BLOGS</h1>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}
