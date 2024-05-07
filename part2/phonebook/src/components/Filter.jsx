import React from 'react'

export const Filter = ({ setSearch }) => {
  return (
    <div>
      {' '}
      <p>filter shown with</p>
      <input
        type='text'
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}
