import { useState } from 'react'
import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'
import { Filter } from './components/Filter'
import { useEffect } from 'react'
import noteService from './services/notes'
import { Notification } from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState(null)
  const [clearInputs, setClearInputs] = useState(false)

  useEffect(() => {
    noteService.getAll().then((data) => setPersons(data))
  }, [])

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newName.length === 0 || newNumber.length === 0) {
      setNotification({ type: 'warning', message: `Missing data` })
      setTimeout(() => {
        setNotification(null)
      }, 2000)
    } else if (!persons.some((person) => person.name === newName)) {
      noteService
        .addPerson({
          name: newName,
          number: newNumber,
        })
        .then((data) => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
          setClearInputs(!clearInputs)
          setNotification({ type: 'success', message: `Added ${newName}` })
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
        .catch((error) => {
          setNotification({
            type: 'warning',
            message: `${error.response.data.slice(158, 223)}`,
          })
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
    } else {
      if (
        window.confirm(
          `${newName} already in contacts, do you want to change the number to ${newNumber}?`
        )
      ) {
        const person = persons.find((person) => person.name == newName)
        const newPerson = { ...person, number: newNumber }
        noteService.editPerson(newPerson).catch((error) => {
          console.log(error)
          setNotification({
            type: 'warning',
            // message: `${newName} already deleted from contacts`,
            message: `${error.response.data.slice(158, 223)}`,
          })
          setTimeout(() => {}, 3000)
        })

        const newPersons = persons.map((person) => {
          if (person.name == newPerson.name) {
            return newPerson
          } else {
            return person
          }
        })

        if (notification && notification.type != 'warning') {
          setPersons(newPersons)
        }
        setClearInputs(!clearInputs)
        setNotification({
          type: 'success',
          message: `${newName} number changed`,
        })
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      }
    }
  }

  const handleDelete = (person) => {
    if (window.confirm(`Are you sure yo want to delete ${person.name} ?`))
      noteService.deletePerson(person.id).then(() => {
        setNotification({
          type: 'warning',
          message: `${person.name} was deleted`,
        })

        setPersons(persons.filter((item) => item.id !== person.id))
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification notification={notification} />}
      <Filter setSearch={setSearch} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        clearInputs={clearInputs}
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
