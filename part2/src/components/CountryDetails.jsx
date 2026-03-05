import { useState, useEffect } from 'react'
import weatherService from '../services/Weathers'




const CountryDetails = ({ country }) => {

  const [weather, setWeather] = useState('') 
  
  const query = country.capital ? country.capital[0] : country.name.common

  useEffect(() => {
    weatherService
      .getWeather(query)
      .then(initialWeather => {
        setWeather(initialWeather)
      })
  }, [country.name.common])

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
        
        {weather && (
        <div>
          <h3>Weather in {country.capital ? country.capital[0] : country.name.common}</h3>      
          <p>Temperature: {weather.main.temp} Celsius</p>  
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind: {weather.wind.speed} m/s</p>           
        </div>
        )}

      </div>
    </div>
  )
}

export default CountryDetails