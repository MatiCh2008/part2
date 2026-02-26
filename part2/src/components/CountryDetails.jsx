const CountryDetails = ({ country }) => {
  return (
    <div>
      <div>
        <h3>{country.name.common}</h3>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
      </div>
    </div>
  )
}

export default CountryDetails