import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'

const Filter = ({ filterName, handleFilterChange }) => (
  <p>
    filter shown with <input
                        value={filterName}
                        onChange={handleFilterChange}
                      />
  </p>
)

const Form = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input
              value={newName}
              onChange={handleNameChange}
            />
    </div>
    <div>
      number: <input
                value={newNumber}
                onChange={handleNumberChange}
              />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const List = ({ persons, filterName, removePerson }) => (
  <div>
    <ul>
      {
        persons
          .filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
          .map(person => <Person
			   key={person.id}
			   person={person}
			   removePerson={() => removePerson(person.id, person.name)}
			 />)
      }
    </ul>
  </div>
)

const Person = ({ person, removePerson }) => (
  <>
    <li>{person.name} {person.number}</li>
    <button onClick={removePerson}>delete</button>
  </>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setNewFilter] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
	setPersons(initialPersons)
      })
  }, [])

  const addPerson = () => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const personExisting = persons.find(p => p.name === newName)
    if (personExisting) {
      if (window.confirm(`${newName} is already in the phonebook. Replace the number?`)) {
	personsService
	  .update(personExisting.id, { ...personExisting, number: newNumber })
	  .then(updatedPerson => {
	    setPersons(persons.map(p => p.id === personExisting.id ? updatedPerson : p))
	  })
      }
    }
    else {
      personsService
	.create(personObject)
	.then(newPerson => {
	  setPersons(persons.concat(newPerson))
	})
    }

    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Remove ${name}?`)) {
      personsService
	.remove(id)
	.then(removedPerson => {
	  setPersons(persons.filter(p => p.id !== id))
	})
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
	filterName={filterName}
	handleFilterChange={handleFilterChange}
      />
      
      <h2>Add a new</h2>

      <Form
	addPerson={addPerson}
	handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
	newName={newName}
        newNumber={newNumber}
      />
      
      <h2>Numbers</h2>

      <List
	persons={persons}
	filterName={filterName}
	removePerson={removePerson}
      />
    </div>
  )
}

export default App
