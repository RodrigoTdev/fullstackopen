import React from 'react'

export const Country = ({ country, countryWeather }) => {
  return (
    <div key={country.cca2}>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} km²</p>
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
      <h2>Weather in {country.capital[0]}</h2>
      {countryWeather && (
        <div>
          <p>Temperature: {(countryWeather.main.temp - 273.15).toFixed(1)}°</p>
          <img
            src={`http://openweathermap.org/img/wn/${countryWeather.weather[0].icon}@2x.png`}
            alt={countryWeather.weather[0].description}
          />
          <p>Wind: {countryWeather.wind.speed} km/h</p>
        </div>
      )}
    </div>
  )
}
