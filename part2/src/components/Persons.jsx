import Person from './Person'

const Persons = ({ personsToShow, deleteAt }) => {
    return <div>{personsToShow.map(person =>
        <Person key={person.id} person={person} deletePerson={() => deleteAt(person.id)} />
      )}</div>
  }
  
  export default Persons