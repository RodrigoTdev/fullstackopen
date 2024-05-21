import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import { Blogs } from './components/Blogs'
import { Login } from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  return (
    <div className='app'>
      {!user && <Login setUser={setUser} />}
      {user && (
        <Blogs
          blogs={blogs.filter((blog) => blog.user.username === user?.username)}
          name={user.name}
        />
      )}
    </div>
  )
}

export default App
