import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import countryService  from './services/Countries'
import Countries from './components/Countries'





const App = () => { 
  const [term, setTerm] = useState('')  
  const [countries, setCountries] = useState([])
  
  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  console.log('render', countries.length, 'countries')  

  const handleTermChange = (event) => {
    setTerm(event.target.value)
  }    

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(term.toLowerCase())
  )

  return (
    <div>
      <h2>Countries</h2>
        <Filter term={term} handleTermChange={handleTermChange}/>      

        <Countries countriesToShow={countriesToShow} term={term}/>

    </div>
  )
}

export default App