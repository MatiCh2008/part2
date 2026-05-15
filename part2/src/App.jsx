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
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const showMessage = (text, type) => {
    setMessageType(type)
    setMessage(text) 
    setTimeout(() => {
        setMessage(null)
      }, 5000)  
  }

  const changeNumberOf = (id, newNumber) => {
    const person = persons.find((p) => p.id === id)
    const changedPerson = { ...person, number: newNumber }
    personService
    .update(id, changedPerson)
    .then((returnedPerson) => {
      setPersons(persons.map((person) => (person.id !== id ? person : returnedPerson)))
      setNewName('')
      setNewNumber('')  
      showMessage(`Changed ${person.name}'s Phone number`, 'success')      
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.error){
        console.log(error.response.data.error)
        const errorMessage = error.response.data.error;
        showMessage(errorMessage, "danger");   
      }
      else {
      showMessage(`Information of ${person.name} has already been removed from server`, 'danger')  
      setPersons(persons.filter((p) => p.id !== id))        
      }

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
    return
    }  
    else if (numberExists){
    alert(`Number ${trimmedNumber} is already added to phonebook`)   
    return   
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
        showMessage(`Added ${trimmedName}`, 'success')
      })
      .catch(error => {
        // this is the way to access the error message
        console.log(error.response.data.error)
        const errorMessage = error.response.data.error;
        showMessage(errorMessage, "danger");     
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
          showMessage(`Deleted ${person.name}`, 'success')
          })
          .catch((error) => {
          showMessage(`Information of ${person.name} has already been removed from server`, 'danger')  
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
        <Notification message={message} type={messageType}/>
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