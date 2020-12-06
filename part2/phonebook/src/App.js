import React, { useState, useEffect } from 'react'
import noteService from './services/noteService'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ successMessage, setSuccessMessage] = useState(null)
  const [ failedMessage, setFailedMessage] = useState(null)

  const Notification = ({ message, success }) => {
    if (message === null) {
      return null
    } else if (success === true) {
      return (
        <div className='successMessage'>
          {message}
        </div>
      )
    } else {
      return (
        <div className='failedMessage'>
          {message}
        </div>
      )
    }
  }

  useEffect(() => {
    noteService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameAdd = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberAdd = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      const r = window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')
      if (r === true) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = {...person, number: newNumber}
        noteService.update(changedPerson)
      }
    } else {
      const name = {
        name: newName,
        number: newNumber
      }
      noteService
        .create(name)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })

      setSuccessMessage('Added ' + name.name)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
      }
  }

  const removePerson = (person) => {
    noteService
      .remove(person.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== person.id))
        console.log(response)
      })
      .catch(error => {
        setFailedMessage('Information of ' + person.name + 'has already been removed from server')
        setTimeout(() => {
        setFailedMessage(null)
        }, 3000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} success={true}/>
      <Notification message={failedMessage} success={false}/>
      <div>
        filter shown with <input value={filter} onChange={handleFilter}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameAdd}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberAdd}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {personsToShow.map(person =>
          <p key={person.name}>
            {person.name} {person.number} <button onClick={() => removePerson(person)}>Delete</button>
          </p>
        )}
    </div>
  )
}

export default App