import { useState, useEffect } from 'react'
import Filter from './components/Filter'


// test
const App = () => { 
  const [term, setTerm] = useState('')    

  const handleTermChange = (event) => {
    setTerm(event.target.value)
  }    

  return (
    <div>
      <h2>Countries</h2>
        <Filter term={term} handleTermChange={handleTermChange}/>      

    </div>
  )
}

export default App