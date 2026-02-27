const CountryDetails = ({ country }) => {
  const languages = country.languages ? Object.values(country.languages) : []

  return (
    <div>
      <div>
        <h3>{country.name.common}</h3>
        <p>Capital: {country.capital ? country.capital.join(', ') : 'No capital'}</p>
        <p>Area: {country.area}</p>
        <h3>Languages</h3>
        <ul>    
          {languages.map(language =>
           <li key={language}>{language}</li>
          )}      
        </ul> 

        <img
          src={country.flags.png}
          alt={`flag of ${country.name.common}`}
        />

      </div>
    </div>
  )
}

export default CountryDetails