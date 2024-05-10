import React from 'react'

export const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} - {person.number}{' '}
          <button onClick={() => handleDelete(person)}>Delete</button>
        </p>
      ))}
    </div>
  )
}
