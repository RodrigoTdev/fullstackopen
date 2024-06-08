import blogService from '../services/blogs'

export const AddBlogForm = ({
  setAddBlogNotification,
  setAddNewBlog,
  blogFormRef,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility()

    const { title, author, url } = e.target

    const userId = JSON.parse(
      window.localStorage.getItem('loggedBlogappUser')
    ).userId

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0,
      userId,
    }

    try {
      const response = await blogService.create(blog)

      await setAddNewBlog(response.data)
      await setAddBlogNotification({
        type: 'success',
        message: `New blog ${blog.title} - by ${blog.author} added`,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setAddBlogNotification(null)
      }, 3000)
    }
  }

  return (
    <form
      className='add-blog-form'
      onSubmit={(e) => handleSubmit(e)}
    >
      <h2 style={{ margin: '10px 0 5px 0' }}>Create New Blog</h2>
      <label>Title:</label>
      <input
        type='text'
        name='title'
        id='title'
        placeholder='Title'
        defaultValue='Test 15'
      />
      <label>Author:</label>
      <input
        type='text'
        name='author'
        id='author'
        placeholder='Author'
        defaultValue='Root'
      />
      <label>Url:</label>
      <input
        type='url'
        name='url'
        id='url'
        placeholder='Url'
        defaultValue='https://www.test15.com/'
      />
      <input
        type='submit'
        value='Create'
        className='submit-button'
        style={{
          backgroundColor: 'forestgreen',
          color: 'white',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '5px',
          width: '70px',
        }}
      />
    </form>
  )
}
