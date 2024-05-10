import { useState } from 'react'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'
import { useEffect } from 'react'
import noteService from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    noteService.getAll().then((data) => setPersons(data))
  }, [])

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newName.length === 0 || newNumber.length === 0) {
      alert('Missing data')
    } else if (!persons.some((person) => person.name === newName)) {
      noteService
        .addPerson({
          name: newName,
          number: newNumber,
          id: `${persons.length + 1}`,
        })
        .then((data) => setPersons(persons.concat(data)))
    } else {
      if (
        window.confirm(
          `${newName} already in contacts, do you want to change the number to ${newNumber}?`
        )
      ) {
        const person = persons.find((person) => person.name == newName)
        const newPerson = { ...person, number: newNumber }
        noteService.editPerson(newPerson)

        const newPersons = persons.map((person) => {
          if (person.name == newPerson.name) {
            return newPerson
          } else {
            return person
          }
        })

        setPersons(newPersons)
      }
    }
  }

  const handleDelete = (person) => {
    if (window.confirm(`Are you sure yo want to delete ${person.name} ?`))
      noteService
        .deletePerson(person.id)
        .then((data) =>
          setPersons(persons.filter((person) => person.id !== data.id))
        )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setSearch={setSearch} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons
        persons={filteredPersons}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
