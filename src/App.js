import './App.css';
import * as axios from "axios";
import Weather from './components/Weather';
import WeeksData from './components/WeekWeather/WeeksData';
import { useState, useEffect } from 'react';
import WeatherTimeline from './components/WeatherTimeline';


export const api = {
  apiKey: process.env.REACT_APP_APIKEY,
  baseURL: "https://api.weatherapi.com/v1/forecast.json?",
}


function App() {
  const [query, setQuery] = useState('')
  const [searchWeatherData, setSearchWeatherData] = useState({})
  const [currentWeather, setCurrentWeather] = useState({})
  const [toggle, setToggle] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      if (navigator.geolocation) {
        // eslint-disable-next-line no-undef
        navigator.geolocation.getCurrentPosition((position) => {
          return axios.get(`${api.baseURL}key=${api.apiKey}&q=${position.coords.latitude},${position.coords.longitude}&lang=ru&days=7&aqi=yes&alerts=no`, { timeout: 1000, })
            .then((response) => {
              if (!response.ok) {

                if (typeof response === 'object') return response;
                if (typeof response === 'string') return JSON.parse(response)
              }
            })
            .then((data) => {
              // console.log("DATA:", data.data.current.is_day ? document.body.style = 'background: white' : document.body.style = 'background: black')
              // data.data.current.is_day ? document.body.style = "background: url('../public/Night.jpg')" : document.body.style = "background: url('../public/Night.jpg')"
              console.log(data)
              setCurrentWeather(data)
            })
        }, error => {
          console.log('Error', error)
          alert("Вы отменили определение местоположения, город по умолчанию Москва");
          axios.get(`${api.baseURL}key=${api.apiKey}&q=Москва&lang=ru&days=7&aqi=yes&alerts=no`, { timeout: 1000, })
            .then((response) => {
              if (!response.ok) {
                if (typeof response === 'object') return response;
                if (typeof response === 'string') return JSON.parse(response)
              }
            })
            .then((data) => {
              setCurrentWeather(data)
            })
        })

      } else {
        alert("Определение местоположения не поддерживается");
        return await axios.get(`${api.baseURL}key=${api.apiKey}&q=Москва&lang=ru&days=7&aqi=yes&alerts=no`, { timeout: 1000, })
          .then((response) => {
            if (!response.ok) {
              if (typeof response === 'object') return response;
              if (typeof response === 'string') return JSON.parse(response)
            }
          })
          .then((data) => {
            setCurrentWeather(data)
          })
      }
    }
    fetchData()
  }, [setCurrentWeather])


  const search = (e) => {
    {/*TODO: узнай можно ли так оставлять функцию функцию*/ }
    if (e.key === 'Enter') {
      axios.get(`${api.baseURL}key=${api.apiKey}&q=${query}&lang=ru&days=7&aqi=yes&alerts=no`, {
        timeout: 1000,
      })
        .then((response) => {
          if (!response.ok) {
            if (typeof response === 'object') return response;
            if (typeof response === 'string') return JSON.parse(response);
          }
        })
        .then((data) => {
          setSearchWeatherData(data)
          setQuery('')
        })
    }
  }

  return (
    <div className='App'>
      <div className='card'>
        {/* <Search /> */}
        <div className='searchContainer'>
          <input type="text" className='searchBar' onChange={e => setQuery(e.target.value)} onKeyPress={search} placeholder="Поиск по городу или стране"></input>
        </div>
        <Weather initialWeather={currentWeather} searchResult={searchWeatherData} twoDaysWeather={toggle} setToggle={setToggle} />
        <WeeksData initialForecast={currentWeather} searchForecast={searchWeatherData} setToggle={setToggle} />
        <span className='timelineItem'>Погода по часам</span>
        <WeatherTimeline searchForecastHours={searchWeatherData} initialForecastHours={currentWeather} twoDaysWeather={toggle} />
      </div>
    </div>
  );
}

export default App;