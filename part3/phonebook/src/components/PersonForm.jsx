import React from 'react'

export const PersonForm = ({
  handleSubmit,
  setNewName,
  setNewNumber,
  length,
}) => {
  return (
    <div>
      {' '}
      <form onSubmit={handleSubmit}>
        {' '}
        <div key={length + 111}>
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
