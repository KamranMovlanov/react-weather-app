import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as axios from "axios";
import './App.css';
import { isEmpty } from './components/utilities/utilities';
import CountryQuery from 'country-query'

//Pages
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import GlobalWeatherPage from './components/Weather/GlobalWeatherPage';
import TwoDaysWeather from './components/TwoDaysWeather/TwoDaysWeather';
import WeatherTimeline from './components/WeatherTimeLine/WeatherTimeline';
import Search from './components/Search/Search';


const api = {
  apiKey: process.env.REACT_APP_APIKEY,
  baseURL: "https://api.weatherapi.com/v1/forecast.json?",
}

const ipAddrApi = {
  apiKey: process.env.REACT_APP_IP_APIKEY,
  baseURL: "https://ipgeolocation.abstractapi.com/v1/",
}


function App() {
  const [query, setQuery] = useState('')
  const [searchWeatherData, setSearchWeatherData] = useState({})
  const [exchangeRate, setExchangeRate] = useState({})
  const [currentWeather, setCurrentWeather] = useState({})
  const [ipData, setIpData] = useState({})
  const [toggle, setToggle] = useState(0)
  const [errStatus, setErrStatus] = useState(false)

  //Changing url-addr
  // const navigate = useNavigate()

  //Unsplash background
  useEffect(() => {
    if (!isEmpty(ipData) && !isEmpty(currentWeather)) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      window.document.getElementsByTagName("body")[0].style.background = `url(https://source.unsplash.com/random/${w}*${h}/?Wallpapers,${currentWeather.data.current.is_day ? "colorfull" : "dark-colors"}) center`
      window.document.getElementsByTagName("body")[0].style.backgroundRepeat = 'no-repeat'
      window.document.getElementsByTagName("body")[0].style.backgroundSize = 'cover'
    }
  }, [ipData, currentWeather])


  // Ip Addr data
  useEffect(() => {
    const fetchData = async () => {
      return await axios.get(`${ipAddrApi.baseURL}?api_key=${ipAddrApi.apiKey}&`, { timeout: 3000, })
        .then((data) => {
          setIpData(data)
          // navigate("/current", { replace: true })
        })
        .catch(function (error) {
          console.log("Ip Error: ", error)
          if (error.response) {
            // alert(`Ошибка: ${error.response.status} `)
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            if (error.response.status === 429) {
            }
          }
        })
    }

    if (isEmpty(ipData)) {
      fetchData()
    }

  }, [ipData])

  //Current-local Weather
  useEffect(() => {
    const fetchData = async () => {
      return await axios.get(`${api.baseURL}key=${api.apiKey}&q=${ipData.data.region}&lang=ru&days=7&ip&aqi=yes&alerts=no`, { timeout: 1000, })
        .catch(error => {
          if (error.response) {
            alert(`Ошибка: ${error.response.status} `)
            console.log(error.response.data);
            console.log(error.response.status);
            navigator.geolocation.getCurrentPosition(async (position) => {
              return axios.get(`${api.baseURL}key=${api.apiKey}&q=${position.coords.latitude},${position.coords.longitude}&lang=ru&days=7&aqi=yes&alerts=no`, { timeout: 1000, })
                .catch(function (error) {
                  if (error.response) {
                    alert(`Ошибка: ${error.response.status}`)
                    console.log(error.response.data);
                    console.log(error.response.status);
                  }
                })
                .then((response) => {
                  if (!response.ok) {
                    if (typeof response === 'object') return response;
                    if (typeof response === 'string') return JSON.parse(response)
                  }
                })
                .then((data) => {
                  setCurrentWeather(data)
                  // navigate("/current", { replace: true })
                })
            })
          }

        })
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

    if (!isEmpty(ipData)) {
      fetchData()
    }

  }, [ipData])


  // Exchange currencies rate
  useEffect(() => {
    let countryCur = null

    //Looking in CountryQuery currenci base
    try {
      !isEmpty(searchWeatherData.data) ?
        countryCur = Object.entries(CountryQuery.find("capital", searchWeatherData.data.location.tz_id.split('/')[1]).currencies)[0][0]
        :
        countryCur = "USD"
    }
    catch (error) {
      try {
        Array.isArray(Object.entries(CountryQuery.findByNameCommon(searchWeatherData.data.location.country).currencies)) ?
          countryCur = Object.entries(CountryQuery.findByNameCommon(searchWeatherData.data.location.country).currencies)[0][0]
          :
          countryCur = Object.entries(CountryQuery.findByNameCommon(searchWeatherData.data.location.country).currencies) ?
            countryCur = countryCur = Object.entries(CountryQuery.findByNameCommon(searchWeatherData.data.location.country).currencies)
            :
            countryCur = "USD"
      }
      catch (err) {
        countryCur = "USD"
      }
    }


    const allCurrencies = async () => {
      let URL = `https://api.exchangerate.host/latest?base=${!isEmpty(searchWeatherData.data) ?
        countryCur
        :
        ipData.data.currency.currency_code}&symbols=USD,EUR,TRY,CNY,RUB,JPY,GBP,CAD,AUD,NZD`

      return await axios.get(URL, { timeout: 1000, })
        .then(function (values) {
          setExchangeRate(values)
        })
        .catch((error) => {
          if (error.response) {
            // alert(`Ошибка: ${error.response.status} `)
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        })
    }


    if (!isEmpty(searchWeatherData) || !isEmpty(ipData)) {
      allCurrencies()
    }

  }, [ipData, searchWeatherData])


  //Location weather
  const locationWeather = async (e) => {
    if (e._reactName === 'onClick' && navigator.geolocation) {
      e.preventDefault();
      navigator.geolocation.getCurrentPosition(async (position) => {
        return axios.get(`${api.baseURL}key=${api.apiKey}&q=${position.coords.latitude},${position.coords.longitude}&lang=ru&days=7&aqi=yes&alerts=no`, { timeout: 1000, })
          .then((data) => {
            setCurrentWeather(data)
            // navigate("/current", { replace: true })
          })
      }, error => {
        console.log('Error', error)
        alert("Ошибка навигации, определяем по ip")
        return axios.get(`${api.baseURL}key=${api.apiKey}&q=${ipData.data.region}&lang=ru&days=7&ip&aqi=yes&alerts=no`, { timeout: 1000, })
          .then((data) => {
            setCurrentWeather(data)
          })
      })

    }

  }

  //Search
  const search = async (e) => {
    if (e.key === 'Enter' || e._reactName === 'onClick') {
      e.preventDefault();
      await axios.get(`${api.baseURL}key=${api.apiKey}&q=${query}&lang=ru&days=7&aqi=yes&alerts=no`, {
        timeout: 1000,
      })
        .then(data => {
          setSearchWeatherData(data)
          // navigate(`/search`, { replace: true })
          setQuery('')
        })
        .catch(error => {
          if (!query) {
            alert('Пустая строка')
          }

          else if (error.response) {
            alert('Не удалось найти')
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        })
    }
  }


  return (
    <div className='App'>
      <div className='card'>
        <Search query={query} search={search} locationWeather={locationWeather} setQuery={setQuery} errStatus={errStatus} />
        <ErrorBoundary >
          <GlobalWeatherPage initialWeather={currentWeather} setSearchWeatherData={setSearchWeatherData} searchResult={searchWeatherData} twoDaysWeather={toggle}
            setToggle={setToggle} ipData={ipData} exchangeRate={exchangeRate} setErrStatus={setErrStatus} />
        </ErrorBoundary>
        <TwoDaysWeather initialForecast={currentWeather} searchForecast={searchWeatherData} setToggle={setToggle} errStatus={errStatus} />
        <WeatherTimeline searchForecastHours={searchWeatherData} initialForecastHours={currentWeather} twoDaysWeather={toggle} errStatus={errStatus} />
      </div>
    </div >
  );
}

export default App;