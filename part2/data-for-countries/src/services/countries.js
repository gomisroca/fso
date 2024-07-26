import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const req = axios.get(`${baseUrl}/all`)
    return req.then(res => res.data)
}

const getUnique = name => {
    const req = axios.get(`${baseUrl}/name/${name}`)
    return req.then(res => res.data)
}

const getWeather = (lat, lon) => {
    const api_key = import.meta.env.VITE_OPEN_WEATHER_KEY
    const req = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    return req.then(res => res.data)
}


export default { getAll, getUnique, getWeather }