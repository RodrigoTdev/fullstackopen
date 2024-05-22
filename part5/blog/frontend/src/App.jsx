import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import { Blogs } from './components/Blogs'
import { Login } from './components/Login'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div className='app'>
      {!user && <Login setUser={setUser} />}
      {user && <Blogs name={user.name} />}
    </div>
  )
}

export default App
