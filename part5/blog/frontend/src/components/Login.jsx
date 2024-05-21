import axios from 'axios'
import React from 'react'

export const Login = ({ setUser }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('/api/login', {
        username: e.target[0].value,
        password: e.target[1].value,
      })
      .then((response) => {
        setUser(response.data)
      })
  }
  return (
    <div className='login'>
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
          defaultValue='rodrigo'
        />
        <label htmlFor='password-input'>Password</label>
        <input
          type='password'
          placeholder='password'
          id='password-input'
          defaultValue='1988'
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
