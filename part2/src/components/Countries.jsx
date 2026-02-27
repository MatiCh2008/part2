import Country from './Country'
import CountryDetails from './CountryDetails';

const Countries = ({ countries, term, handleShow }) => {

    if (term === ""){
        return null;        
    }

    if (countries.length > 10){
        return <p>Too many matches, specify another filter</p>;
    }   
    
    if (countries.length === 1){
        return (
        <div>
            <CountryDetails
                country={countries[0]}
                />

        </div>            
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