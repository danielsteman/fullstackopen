import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const SelectCountry = (props) => {
  const filtered = props.countries.filter(x =>
    x.name.includes(props.country))

  const results = filtered.length
  const countriesLength = props.countries.length

  if (results === countriesLength) {
    return (null)
  } else if (results > 10) {
    return (<p>
      Too many matches, specify another filter
    </p>)
  } else if (results <= 10 && results > 1) {
    const formatted = filtered.map(x => 
      <p key={x.name}>
        {x.name}
      </p>
    )
    return (<div>
      {formatted}
      </div>)
  } else if (results === 1) {
    const name = <h1>{filtered[0].name}</h1>
    const capital = <p>capital {filtered[0].capital}</p>
    const population = <p>population {filtered[0].population}</p>
    const languages = <ul>
      {filtered[0].languages.map(x => 
        <li key={x.name}>
          {x.name}
        </li>
        )}
    </ul>
    const flag = <img scr={filtered[0].flag} alt={filtered[0].flag}/>
    
    return (
      <div>
        {name}
        {capital}
        {population}
        <h2>Languages</h2>
        {languages}
        {flag}
      </div>
    )
  } else {
    return (
      <div>
        No results
      </div>
    )
  }
  }

const App = () => {

  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  const handleCountry = (event) => {
    setCountry(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return(
    <div>
      <form>
        find countries: <input value={country} onChange={handleCountry}/>
      </form>

      <SelectCountry countries={countries} country={country}/>
      
    </div>
  )
}

export default App;
