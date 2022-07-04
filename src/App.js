import React, { useState, useEffect } from 'react';
import * as axios from "axios";
import './App.css';
// import { styled, createGlobalStyle } from 'styled-components';
import Weather from './components/Weather';
import WeeksData from './components/WeekWeather/WeeksData';
import WeatherTimeline from './components/WeatherTimeline';
import { isEmpty } from './components/utilities/utilities';


const api = {
  apiKey: process.env.REACT_APP_APIKEY,
  baseURL: "https://api.weatherapi.com/v1/forecast.json?",
}
const ipAddrApi = { //FIXME: убери key в .env
  apiKey: "fb1cf867f127438994d89ac74c50910f",
  baseURL: "https://ipgeolocation.abstractapi.com/v1/",
}

const exchangeRateApi = { //FIXME: убери key в .env
  apiKey: "68ec782277a1fd8b9a992f7c",
  baseURL: "https://v6.exchangerate-api.com/v6/",
}


function App() {
  const [query, setQuery] = useState('')
  const [cryptoRate, setCryptoRate] = useState({})
  const [exchangeRate, setExchangeRate] = useState({})
  const [searchWeatherData, setSearchWeatherData] = useState({})
  const [currentWeather, setCurrentWeather] = useState({})
  const [ipData, setIpData] = useState({})
  const [toggle, setToggle] = useState(0)



  //=================== TODO:  Узнай как в react 18 вызвать useEffect 1 раз ! =====================
  // Ip Addr
  useEffect(() => {

    axios.get(`${ipAddrApi.baseURL}?api_key=${ipAddrApi.apiKey}&`, { timeout: 1200, })
      .catch(function (error) {
        if (error.response) {
          // alert(`Ошибка: ${error.response.status} `)
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .then((response) => {
        if (!response.ok) {
          if (typeof response === 'object') return response;
          if (typeof response === 'string') return JSON.parse(response)
        }
      })
      .then((data) => {
        setIpData(data)
      })

  }, [])



  //Current Weather
  useEffect(() => {
    const fetchData = () => {
      return axios.get(`${api.baseURL}key=${api.apiKey}&q=${ipData.data.region}&lang=ru&days=7&aqi=yes&alerts=no`, { timeout: 1000, })
        .catch(function (error) {
          if (error.response) {
            // alert(`Ошибка: ${error.response.status} `)
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        })
        .then((response) => {
          if (!response.ok) {
            if (typeof response === 'object') return response;
            if (typeof response === 'string') return JSON.parse(response)
          }
        })
        .then((data) => {
          console.log("Weather ", data)
          setCurrentWeather(data)

        })
    }

    if (!isEmpty(ipData)) {
      fetchData()
    }

  }, [ipData])


  // Exchange Rate USD/EUR
  useEffect(() => {
    const fetchData = () => {
      // return axios.get(`${exchangeRateApi.baseURL}${exchangeRateApi.apiKey}/latest/${ipData.data.currency.currency_code}`, { timeout: 1000, })
      return axios.get(`https://api.exchangerate.host/latest?base=${ipData.data.currency.currency_code}&symbols=USD,EUR`, { timeout: 1000, })
        .catch(function (error) {
          if (error.response) {
            // alert(`Ошибка: ${error.response.status} `)
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        })
        .then((response) => {
          if (!response.ok) {
            if (typeof response === 'object') return response;
            if (typeof response === 'string') return JSON.parse(response)
          }
        })
        .then((data) => {
          console.log("Exchange Data: ", data)
          setExchangeRate(data)
        })
    }

    if (!isEmpty(ipData)) {
      fetchData()
    }

  }, [ipData])

  // Exchange Rate Crypto currencies
  useEffect(() => {
    const fetchData = () => {
      return axios.get(`https://api.exchangerate.host/latest?base=${ipData.data.currency.currency_code}&source=crypto&symbols=BTC,ETH,BNB`, { timeout: 1000, })
        .catch(function (error) {
          if (error.response) {
            // alert(`Ошибка: ${error.response.status} `)
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        })
        .then((response) => {
          if (!response.ok) {
            if (typeof response === 'object') return response;
            if (typeof response === 'string') return JSON.parse(response)
          }
        })
        .then((data) => {
          console.log("Exchange crypto: ", data)
          setCryptoRate(data)
        })
    }

    if (!isEmpty(ipData)) {
      fetchData()
    }

  }, [ipData])


  console.log("KAMAPula: ", exchangeRate)



  const locationWeather = async (e) => {
    if (e._reactName === 'onClick' && navigator.geolocation) {
      // eslint-disable-next-line no-undef
      navigator.geolocation.getCurrentPosition(async (position) => {
        return axios.get(`${api.baseURL}key=${api.apiKey}&q=${position.coords.latitude},${position.coords.longitude}&lang=ru&days=7&aqi=yes&alerts=no`, { timeout: 1000, })
          .catch(function (error) {
            if (error.response) {
              alert(`Ошибка: ${error.response.status}`)
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          })
          .then((response) => {
            if (!response.ok) {
              if (typeof response === 'object') return response;
              if (typeof response === 'string') return JSON.parse(response)
            }
          })
          .then((data) => {
            // console.log("DATA:", data.data.current.is_day ? document.body.style = 'background: white' : document.body.style = 'background: black')
            // data.data.current.is_day ? document.body.style = "background: url('../public/Night.jpg')" : document.body.style = "background: url('../public/Night.jpg')"
            setCurrentWeather(data)
          })
      }, error => {
        console.log('Error', error)
        alert("Вы отменили определение местоположения, город по умолчанию Москва");
        return axios.get(`${api.baseURL}key=${api.apiKey}&q=Москва&lang=ru&days=7&aqi=yes&alerts=no`, { timeout: 1000, })
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

    }

  }

  const search = async (e) => {
    if (e.key === 'Enter' || e._reactName === 'onClick') {
      console.log(query)
      await axios.get(`${api.baseURL}key=${api.apiKey}&q=${query}&lang=ru&days=7&aqi=yes&alerts=no`, {
        timeout: 1000,
      })
        .catch(function (error) {
          if (error.response) {
            alert('Не удалось найти')
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
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
      //============= FIXME: check it: подумай как найти нужный флаг по поиску ==================
      await axios.get(`${ipAddrApi.baseURL}?api_key=${ipAddrApi.apiKey}&`, { timeout: 1000, })
        .then((response) => {
          console.log("res:", response)
          if (!response.ok) {
            if (typeof response === 'object') return response;
            if (typeof response === 'string') return JSON.parse(response)
          }
        })
        .then((data) => {
          setIpData(data)
          // console.log("Data: ", data.data)
        })
    }
  }

  // useEffect(() => {
  //   if (!isEmpty(ipData)) {
  //     window.document.getElementsByTagName("body")[0].style.background = `url(https://source.unsplash.com/random/900*700/?${ipData.data.city},fog) center`
  //     window.document.getElementsByTagName("body")[0].style.backgroundRepeat = 'no-repeat'
  //     window.document.getElementsByTagName("body")[0].style.backgroundSize = 'cover'
  //   }
  // }, [ipData])

  // const GlobalStyle = createGlobalStyle`
  // body {
  //   background: url(https://source.unsplash.com/random/900*700/?Moscow,fog) center;
  //   background-repeat: no-repeat;
  //   background-size: cover;
  // }
  // `




  return (
    <div className='App'>

      <div className='card'>
        {/* <Search /> */}
        <div className='searchContainer'>
          <input type="text" className='searchBar' onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} placeholder="Поиск по городу или стране"></input>
          <button onClick={search} className='searchBtn'><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em"
            width="2.2em" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z">
            </path>
          </svg></button>
          <button onClick={locationWeather} className='locationBtn'>
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em"
              width="2.2em" viewBox="0 0 24 24"><path fill="#6C72F3" d="M21.15,2.86a2.89,2.89,0,0,0-3-.71L4,6.88a2.9,2.9,0,0,0-.12,5.47l5.24,2h0a.93.93,0,0,1,.53.52l2,5.25A2.87,2.87,0,0,0,14.36,22h.07a2.88,2.88,0,0,0,2.69-2L21.85,5.83A2.89,2.89,0,0,0,21.15,2.86ZM20,5.2,15.22,19.38a.88.88,0,0,1-.84.62.92.92,0,0,1-.87-.58l-2-5.25a2.91,2.91,0,0,0-1.67-1.68l-5.25-2A.9.9,0,0,1,4,9.62a.88.88,0,0,1,.62-.84L18.8,4.05A.91.91,0,0,1,20,5.2Z" /></svg>
          </button>
        </div>
        {/* <GlobalStyle /> */}
        <Weather initialWeather={currentWeather} searchResult={searchWeatherData} twoDaysWeather={toggle} setToggle={setToggle} ipData={ipData} exchangeRate={exchangeRate} cryptoRate={cryptoRate.data} />
        <WeeksData initialForecast={currentWeather} searchForecast={searchWeatherData} setToggle={setToggle} />
        <span className='timelineItem'><img className='timeLineClockIcon' src='/clock(2).svg' alt='icon'></img> </span>
        <WeatherTimeline searchForecastHours={searchWeatherData} initialForecastHours={currentWeather} twoDaysWeather={toggle} />
      </div>
    </div >
  );
}

export default App;