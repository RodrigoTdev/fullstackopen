import React from 'react'

export const Countries = ({ resultCountries }) => {
  if (resultCountries.length >= 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (resultCountries.length === 1) {
    const country = resultCountries[0]
    return (
      <div key={country.cca2}>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <h4>Languages:</h4>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt={country.flags.alt}
        />
      </div>
    )
  } else {
    return resultCountries.map((country) => (
      <p key={country.cca2}>{country.name.common}</p>
    ))
  }
}
