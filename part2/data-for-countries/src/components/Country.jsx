import React, { useEffect, useState } from 'react'
import countriesService from '../services/countries'

function Country({country}) {
    const [weather, setWeather] = useState()

    useEffect(() => {
        countriesService
        .getWeather(country.latlng[0], country.latlng[1])
        .then(newWeather => {
            console.log(newWeather)
            setWeather(newWeather)
        })
    }, [country])
    
    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>
                <p>Capital: {country.capital[0]}</p>
                <p>Area: {country.area}</p>
            </div>
            <div>
                <h3>Languages</h3>
                <ul>
                {Object.entries(country.languages).map(([key, value]) => (
                    <li key={key}>{value}</li>
                ))}
                </ul>
            </div>
            <img src={country.flags.png} alt={country.flags.alt} />
            {weather && <div>
                <h3>Weather in {country.capital[0]}</h3>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                <p>Temperature: {weather.main.temp} °C</p>
                <p>Wind: {weather.wind.speed} m/s</p>
            </div>}
        </div>
    )
}

export default Country