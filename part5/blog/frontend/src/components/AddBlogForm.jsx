import axios from 'axios'

export const AddBlogForm = ({
  setAddBlog,
  setAddBlogNotification,
  setAddNewBlog,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const localStorage = window.localStorage.getItem('loggedBlogappUser')
    const token = JSON.parse(localStorage).token
    const blog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
      likes: 0,
      userId: JSON.parse(localStorage).userId,
    }
    setAddBlog(false)
    axios
      .post('/api/blogs', blog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setAddNewBlog(response.data))
      .then(
        () =>
          setAddBlogNotification({
            type: 'success',
            message: `a new blog ${blog.title} by ${blog.author} added`,
          }),
        setTimeout(() => {
          setAddBlogNotification(null)
        }, 3000)
      )
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
