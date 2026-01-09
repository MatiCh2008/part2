import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [term, setTerm] = useState('')  

// test 2

  const addPerson = (event) => {

    event.preventDefault()

    const trimmedName = newName.trim().replace(/\s+/g, ' ');
    const trimmedNumber = newNumber.trim().replace(/\s+/g, ' ');
    
    const personObject = {
      name: trimmedName,
      number: trimmedNumber
    }

    const nameExists = persons.some(person => person.name.toLowerCase() === trimmedName.toLowerCase())
    const numberExists = persons.some(person => person.number === trimmedNumber)    

    if (!trimmedName || !trimmedNumber){
    alert(`Name and number are required`)
    }    
    else if (nameExists){
    alert(`${trimmedName} is already added to phonebook`)
    }
    else if (numberExists){
    alert(`Number ${trimmedNumber} is already added to phonebook`)      
    }
    else {
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')    
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
        <Filter term={term} handleTermChange={handleTermChange}/>
      <h3>Add a new</h3>      
        <PersonForm 
          addPerson={addPerson} 
          newName={newName} 
          handleNameChange={handleNameChange}
          newNumber={newNumber} 
          handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
        <Persons personsToShow={personsToShow}/>
        

    </div>
  )
}

export default App