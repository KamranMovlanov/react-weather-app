import './App.css';
import * as axios from "axios";
import Weather from './components/Weather';
import WeeksData from './components/WeekWeather/WeeksData';
import { useState, useEffect } from 'react';
import WeatherTimeline from './components/WeatherTimeline';

const api = {
  apiKey: "2f06bba7e5a14a04b81174742221506",
  baseURL: "https://api.weatherapi.com/v1/forecast.json?",
}


function App() {
  const [query, setQuery] = useState('')
  const [searchWeatherData, setSearchWeatherData] = useState({})
  const [weatherDataState, setWeatherData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      return await axios.get(`${api.baseURL}key=${api.apiKey}&q=Moscow&days=7&aqi=no&alerts=no`, { timeout: 1000, })
        .then((response) => {
          if (!response.ok) {

            if (typeof response === 'object') return response;
            if (typeof response === 'string') return JSON.parse(response)
          }
        })
        .then((data) => {
          setWeatherData(data)

        })
    }
    fetchData()
  }, [setWeatherData])


  const search = (e) => {
    if (e.key === 'Enter') {
      axios.get(`${api.baseURL}key=${api.apiKey}&q=${query}&days=7&aqi=no&alerts=no`, {
        timeout: 1000,
      })
        .then((response) => {
          if (!response.ok) {
            if (typeof response === 'object') return response;
            if (typeof response === 'string') return JSON.parse(response);
          }
        })
        .then((data) => {
          console.log(data)
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
          <input type="text" className='searchBar' onChange={e => setQuery(e.target.value)} onKeyPress={search} placeholder="Search city or country"></input>
        </div>
        <Weather initialWeather={weatherDataState} searchResult={searchWeatherData} />
        <WeeksData initialForecast={weatherDataState} searchForecast={searchWeatherData} />
        <span className='timelineItem'>Hours</span>
        <WeatherTimeline searchForecastHours={searchWeatherData} initialForecastHours={weatherDataState} />
      </div>
    </div>
  );
}

export default App;