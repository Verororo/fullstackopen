import { useState } from 'react'

const Filter = ({ filterName, handleFilterChange }) => (
  <p>
    filter shown with <input
                        value={filterName}
                        onChange={handleFilterChange}
                      />
  </p>
)

const Form = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      name: <input
              value={props.newName}
              onChange={props.handleNameChange}
            />
    </div>
    <div>
      number: <input
                value={props.newNumber}
                onChange={props.handleNumberChange}
              />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const List = ({ persons, filterName }) => (
  <div>
    <ul>
      {persons
       .filter(person => person.name.includes(filterName))
       .map(person =>
         <li key={person.name}>{person.name} {person.number}</li>
       )}
    </ul>
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    },
    {
      name: 'Dan Abramov',
      number: '123-040040'
    },
    {
      name: 'Arto Heavens',
      number: '765-4321040'
    },
    {
      name: 'Daniil Abramov',
      number: '080-4235923'
    }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setNewFilter] = useState('')

  const addPerson = ({ person }) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).includes(newName))
      alert(`${newName} is already in the phonebook`)
    else
      setPersons(persons.concat(personObject))

    setNewName('')
    setNewNumber('')
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

      <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
      
      <h2>Add a new</h2>

      <Form addPerson={addPerson} handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange} newName={newName}
            newNumber={newNumber}
      />
      
      <h2>Numbers</h2>

      <List persons={persons} filterName={filterName}/>
    </div>
  )
}

export default App
