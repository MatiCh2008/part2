import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

// test
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [term, setTerm] = useState('')  
  const [addedMessage, setAddedMessage] = useState('Person is added')

useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const changeNumberOf = (id, newNumber) => {
    const person = persons.find((p) => p.id === id)
    const changedPerson = { ...person, number: newNumber }
    personService
    .update(id, changedPerson)
    .then((returnedPerson) => {
      setPersons(persons.map((person) => (person.id !== id ? person : returnedPerson)))
      setNewName('')
      setNewNumber('')
    })
    .catch((error) => {
      alert(`Person '${person.name}' was already deleted from server`)
      setPersons(persons.filter((p) => p.id !== id))
    })
  }
  
  const addPerson = (event) => {

    event.preventDefault()

    const trimmedName = newName.trim().replace(/\s+/g, ' ');
    const trimmedNumber = newNumber.trim().replace(/\s+/g, ' ');
    
    const personObject = {
      name: trimmedName,
      number: trimmedNumber
    }

    const existingPerson = persons.find(p => 
      p.name.trim().replace(/\s+/g, ' ').toLowerCase() === trimmedName.toLowerCase()
    )
    const numberExists = persons.some(person => person.number === trimmedNumber)    

    if (!trimmedName || !trimmedNumber){
    alert(`Name and number are required`)
    }  
    else if (numberExists){
    alert(`Number ${trimmedNumber} is already added to phonebook`)      
    }      
    else if (existingPerson){
      if (window.confirm(`${trimmedName} is already added to phonebook, replace the old number with a new one?`)) {
          changeNumberOf(existingPerson.id, trimmedNumber)
      }    
    }
    else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('') 
        setNewNumber('')
        setAddedMessage(`Added ${newName}`)
      })
    }
  }

    const deleteAt = (id) => {
      const person = persons.find((p) => p.id === id)

      if (window.confirm(`delete ${person.name} ?`)) {
        personService
          .remove(id)
          .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          })
          .catch((error) => {
          alert(`Person '${person.name}' was already deleted from server`)
          setPersons(persons.filter((p) => p.id !== id))
          })
      }    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }  

  const handleTermChange = (event) => {
    setTerm(event.target.value)
  }    

  console.log(persons)

  const personsToShow = !term
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(term.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={addedMessage} />
        <Filter term={term} handleTermChange={handleTermChange}/>
      <h3>Add a new</h3>      
        <PersonForm 
          addPerson={addPerson} 
          newName={newName} 
          handleNameChange={handleNameChange}
          newNumber={newNumber} 
          handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
        <Persons personsToShow={personsToShow} deleteAt={deleteAt}/>
        

    </div>
  )
}

export default App