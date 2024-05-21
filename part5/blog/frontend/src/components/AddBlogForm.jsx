import React from 'react'

export const AddBlogForm = ({ setAddBlog }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const blog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    }
    console.log(blog)
    setAddBlog(false)
  }
  return (
    <form
      className='add-blog-form'
      onSubmit={(e) => handleSubmit(e)}
    >
      <h2>Create New Blog</h2>
      <label>Title:</label>
      <input
        type='text'
        name='title'
        id='title'
        placeholder='Title'
      />
      <label>Author:</label>
      <input
        type='text'
        name='author'
        id='author'
        placeholder='Author'
      />
      <label>Url:</label>
      <input
        type='url'
        name='url'
        id='url'
        placeholder='Url'
      />
      <input
        type='submit'
        value='Create'
      />
    </form>
  )
}
