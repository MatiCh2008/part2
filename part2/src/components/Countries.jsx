import Country from './Country'

const Countries = ({ countriesToShow, term, handleShow }) => {
  return (
    <div>
      {
      
      countriesToShow.map(country => 
        <Country 
          key={country.cca3} 
          country={country} 
          handleShow={() => handleShow(country)} 
        />
      )}

    </div>
  )
}

export default Countries