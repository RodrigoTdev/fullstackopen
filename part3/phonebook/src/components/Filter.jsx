import React from 'react'

export const Filter = ({ setSearch }) => {
  const filterStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }
  return (
    <div style={filterStyles}>
      <p>filter shown with </p>
      <input
        style={{ height: '20px' }}
        type='text'
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}
