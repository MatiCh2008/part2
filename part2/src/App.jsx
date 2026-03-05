import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import countryService  from './services/Countries'
import Countries from './components/Countries'


const App = () => { 
  const [term, setTerm] = useState('')  
  const [shownCountry, setShownCountry] = useState(null)    
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
    setShownCountry(null)
  } 
  
  const handleShow = cca3 => {
    const country = countries.find(c => c.cca3 === cca3)

    setTerm(country.name.common)
    setShownCountry(country)
  }

  const countriesToShow = term === '' ? [] : countries.filter(country =>
    country.name.common.toLowerCase().includes(term.toLowerCase())
  )

  return (
    <div>
      <h2>Countries</h2>
        <Filter term={term} handleTermChange={handleTermChange}/>      

        <Countries countries={countriesToShow} term={term} shownCountry={shownCountry} handleShow={handleShow}/>

    </div>
  )
}

export default App