import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryInfo = ({ country, weather }) => {
  if (weather) {
    return (
      <>
	<h1>{country.name.common}</h1>
	<img src={country.flags.png} height="200"/>
	<p>capital: {country.capital[0]}</p>
	<p>population: {country.population}</p>
	<div>
	  languages:
	  <ul>
	    {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
	  </ul>
	</div>
	
	<h2>Weather in {country.capital[0]}</h2>
	<p>temperature: {(weather.list[0].main.temp - 273.15).toFixed(2)} Celcius</p>
	<p>wind: {weather.list[0].wind.speed} m/s</p>
	<img src={`https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}/>
      </>
    )
  }
}

const List = ({ countryFilter, countries, setCountryToShow, countryToShow }) => {
  const filteredCountries = countries.filter(c => c.name.common.toLowerCase()
					     .includes(countryFilter.toLowerCase()))

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setCountryToShow(filteredCountries[0])
    }
  }, [filteredCountries, setCountryToShow])
  
  if (filteredCountries.length > 10)
    return (
      <div>Too many matches, specify another filter</div>
    )
  else if (filteredCountries.length > 1)
    return (
      <>
	<ul>
	  {
	    filteredCountries
	      .map(country =>
		<li key={country.name.common}>
		  {country.name.common}
		  <button onClick={() => setCountryToShow(country)}>
		    show
		  </button>
		</li>
	      )
	  }
	</ul>
      </>
    )
}

const App = () => {
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [countryToShow, setCountryToShow] = useState(null)
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_WEATHER_API_KEY
  
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
	const countryList = response.data.sort()
	setCountries(countryList)
      })
  }, [])

  useEffect(() => {
    if (!countryToShow)
      return undefined
    
    axios
      .get(`http://api.openweathermap.org/data/2.5/forecast?q=${countryToShow.capital[0]}&appid=${api_key}`)
      .then(response => {
	setWeather(response.data)
      })
  }, [countryToShow])

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }
  
  return (
    <div>
      find countries
      <input
	value={countryFilter}
	onChange={handleFilterChange}
      />

      <List
	countryFilter={countryFilter}
	countries={countries}
	setCountryToShow={setCountryToShow}
	countryToShow={countryToShow}
      />

      
      <CountryInfo
	country={countryToShow}
	weather={weather}
      />
    </div>
  )
}

export default App
