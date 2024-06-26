import React from 'react'

export const PersonForm = ({ handleSubmit, setNewName, setNewNumber }) => {
  return (
    <div>
      {' '}
      <form onSubmit={handleSubmit}>
        {' '}
        <div>
          name: <input onChange={(e) => setNewName(e.target.value)} />{' '}
          <div>
            number: <input onChange={(e) => setNewNumber(e.target.value)} />{' '}
          </div>{' '}
        </div>{' '}
        <div>
          <button type='submit'>add</button>{' '}
        </div>{' '}
      </form>
    </div>
  )
}
