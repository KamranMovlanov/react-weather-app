import './App.css';
import * as axios from "axios";
import Weather from './components/Weather';
import WeeksData from './components/WeekWeather/WeeksData';
import { useState, useEffect } from 'react';
import { weatherApi } from './Api/api';

const api = {
  apiKey: "b337235480e9bfdb87e5a2cb1b91ea54",
  baseURL: "https://api.openweathermap.org/data/2.5/weather?q=",
}


function App() {
  const [query, setQuery] = useState('')
  const [weatherDataState, setWeatherData] = useState({})

  useEffect(() => {
    weatherApi.fetchWeather('Japan')
  })

  console.log('rendered')


  const search = (e) => {
    if (e.key === 'Enter') {
      axios.get(`${api.baseURL}${query}&units=metric&appid=${api.apiKey}`, {
        timeout: 1000,

      })
        .then((response) => {
          if (!response.ok) {
            if (typeof response === 'object') return response;
            if (typeof response === 'string') return JSON.parse(response);
          }
        })
        .then((data) => {
          // console.log(data.data)
          setWeatherData(data)
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
        <Weather weather={weatherDataState} />
        <WeeksData />
      </div>
    </div>
  );
}

export default App;
