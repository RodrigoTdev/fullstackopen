const Blog = ({ blog }) => (
  <div className='blog-container'>
    <h2>Title: {blog.title}</h2>
    <h4>Author: {blog.author}</h4>
    <p>
      Url:{' '}
      <a
        target='_blank'
        href={blog.url}
      >
        {blog.url}
      </a>
    </p>
    <p>Likes: {blog.likes}</p>
  </div>
)

export default Blog
