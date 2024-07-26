import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import countriesService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(countries => {
        setCountries(countries)
      })
      .catch(error => {
        console.log('Something went wrong while fetching countries.')
        console.log(error)
      })
    }, [])

  return (
    <div>
      <h2>Find Countries</h2>
      <Filter countries={countries} />
    </div>
  )
}

export default App