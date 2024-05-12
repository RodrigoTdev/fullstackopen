import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export const PersonForm = ({
  handleSubmit,
  setNewName,
  setNewNumber,
  clearInputs,
}) => {
  return (
    <div>
      {' '}
      <form onSubmit={handleSubmit}>
        {' '}
        <div key={clearInputs ? 'uno' : 'two'}>
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
