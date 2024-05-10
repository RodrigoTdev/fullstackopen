import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import { Countries } from './components/Countries'

function App() {
  const [resultCountries, setResultCountries] = useState([])
  const [countriesList, setCountriesList] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => setCountriesList(response.data))
      .catch((error) => console.log(error))
  }, [])

  const handleChange = () => {
    if (event.target.value.length > 0) {
      const filteredCountries = countriesList.filter((country) => {
        const name = country.name.common
        return name.toLowerCase().includes(event.target.value.toLowerCase())
      })

      setResultCountries(filteredCountries)
    } else {
      setResultCountries([])
    }
  }
  return (
    <>
      <div>
        find countries{' '}
        <input
          type='text'
          onChange={handleChange}
        />
        <Countries
          resultCountries={resultCountries}
          setResultCountries={setResultCountries}
        />
      </div>
    </>
  )
}

export default App
