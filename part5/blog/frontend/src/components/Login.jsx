import axios from 'axios'
import React, { useState } from 'react'
import { Notification } from './Notification'

export const Login = ({ setUser }) => {
  const [loginError, setLoginError] = useState(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('/api/login', {
        username: e.target[0].value,
        password: e.target[1].value,
      })
      .then((response) => {
        setUser(response.data)
        window.localStorage.setItem(
          'loggedBlogappUser',
          JSON.stringify(response.data)
        )
      })
      .catch(() => {
        setLoginError({ type: 'error', message: 'wrong username or password' })
        setTimeout(() => {
          setLoginError(null)
        }, 3000)
      })
  }
  return (
    <div className='login'>
      {loginError && <Notification loginError={loginError} />}
      <h2>Log in to the application</h2>
      <form
        className='login-form'
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor='username-input'>Username:</label>
        <input
          type='text'
          placeholder='username'
          id='username-input'
        />
        <label htmlFor='password-input'>Password</label>
        <input
          type='password'
          placeholder='password'
          id='password-input'
        />
        <input
          type='submit'
          value='Log in'
          id='login-button'
        />
      </form>
    </div>
  )
}
