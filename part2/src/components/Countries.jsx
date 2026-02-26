import Country from './Country'

const Countries = ({ countries, term, handleShow }) => {

    if (countries.length > 10){
        return <p>Too many matches, specify another filter</p>;
    }        

    if (countries.length === 0){
            const country = countries[0]
        return (
            <Country 
            key={country.cca3} 
            country={country} 
            handleShow={() => handleShow(country)} 
            />            
        )
    }        

    return (
        <div>
        {
            

        
        countries.map(country => 
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