import React from 'react'
import { useState } from 'react'
import { Country } from './Country'
import axios from 'axios'

export const Countries = ({ resultCountries, setResultCountries }) => {
  const [countryWeather, setCountryWeather] = useState()
  const handleClickCountry = (country) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    setResultCountries([country])
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`
      )
      .then((response) => setCountryWeather(response.data))
      .catch((error) => console.log(error))
  }

  if (resultCountries.length >= 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (resultCountries.length === 1) {
    return <Country country={resultCountries[0]} />
  } else {
    return resultCountries.map((country) => (
      <div
        key={country.cca2}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p>{country.name.common}</p>
        <button
          style={{ marginLeft: '10px', height: '30px', lineHeight: '5px' }}
          onClick={() => handleClickCountry(country)}
        >
          show
        </button>
      </div>
    ))
  }
}
