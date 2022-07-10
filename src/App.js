import React, { useState, useEffect } from 'react';
import * as axios from "axios";
import './App.css';
import Weather from './components/Weather/Weather';
import WeeksData from './components/WeekWeather/WeeksData';
import WeatherTimeline from './components/WeatherTimeLine/WeatherTimeline';
import Search from './components/Search/Search';
import { isEmpty } from './components/utilities/utilities';
import CountryQuery from 'country-query'


const api = {
  apiKey: process.env.REACT_APP_APIKEY,
  baseURL: "https://api.weatherapi.com/v1/forecast.json?",
}

const ipAddrApi = {
  apiKey: process.env.REACT_APP_IP_APIKEY,
  baseURL: "https://ipgeolocation.abstractapi.com/v1/",
}

const exchangeRateApi = {
  apiKey: process.env.REACT_APP_EXCHANGE_RATE_APIKEY,
  baseURL: "https://v6.exchangerate-api.com/v6/",
}


function App() {
  const [query, setQuery] = useState('')
  const [searchWeatherData, setSearchWeatherData] = useState({})
  const [exchangeRate, setExchangeRate] = useState({})
  const [exchangeBTC, setExchangeBTC] = useState({})
  const [exchangeETH, setExchangeETH] = useState({})
  const [currentWeather, setCurrentWeather] = useState({})
  const [ipData, setIpData] = useState({})
  const [toggle, setToggle] = useState(0)


  //=================== TODO:  Узнай как в react 18 вызвать useEffect 1 раз ! =====================
  // Ip Addr data
  useEffect(() => {
    const fetchData = async () => {
      return await axios.get(`${ipAddrApi.baseURL}?api_key=${ipAddrApi.apiKey}&`, { timeout: 1500, })
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
    }
    fetchData()
      .catch(console.error);
  }, [])

  //Current Weather
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

  useEffect(() => {
    if (!isEmpty(ipData) && !isEmpty(currentWeather)) {
      // window.document.getElementsByTagName("body")[0].style.background = `url(https://source.unsplash.com/random/1280*760/?${ipData.data.city},fog) center`
      // TODO: Сделай определение размера экрана и делай запросы в зависимости от найденного разрешения !
      // console.log(`url(https://source.unsplash.com/random/1366*768/?Wallpapers?orientation=landscape,${currentWeather.data.current.is_day ? "sun" : "moon"})`)
      window.document.getElementsByTagName("body")[0].style.background = `url(https://source.unsplash.com/random/1366*768/?Wallpapers,${currentWeather.data.current.is_day ? "sun" : "moon"}?orientation=landscape) center`
      window.document.getElementsByTagName("body")[0].style.backgroundRepeat = 'no-repeat'
      window.document.getElementsByTagName("body")[0].style.backgroundSize = 'cover'
    }
  }, [ipData, currentWeather])


  // Exchange currencies rate
  useEffect(() => {


    try {
      console.log('CountryQuery: ',
        // CountryQuery.findBylatlng(searchWeatherData.data.location.lat, searchWeatherData.data.location.lon)
        // CountryQuery.find("latlng", searchWeatherData.data.location.lat, searchWeatherData.data.location.lon),
        //TODO: Задача: в tz_id: "Europe/Berlin" вычленить сталицу. Тоесть нужно оставить только Berlin. Дальше меняешь запросы в Exchange rete и тестируешь.

        Object.entries(CountryQuery.find("capital", searchWeatherData.data.location.tz_id.split('/')[1]).currencies)[0][0],
        // CountryQuery.find("capital", searchWeatherData.data.location.tz_id.split('/')[1]['currencies']),

        // searchWeatherData.data.location.tz_id.split('/')[1],
        // searchWeatherData
      )
    } catch (err) {
      console.log(err)
    }


    const countryCur = !isEmpty(searchWeatherData.data) ? Object.entries(CountryQuery.find("capital", searchWeatherData.data.location.tz_id.split('/')[1]).currencies)[0][0] : 'USD'
    // console.log('countryCur', countryCur)
    // const countryCur = !isEmpty(searchWeatherData.data) && CountryQuery.findByNameCommon(searchWeatherData.data.location.country) ? CountryQuery.findByNameCommon(searchWeatherData.data.location.country).currencies : 'RUB'
    // const fetchCryptoData = () => {
    //   return axios.get(`https://api.exchangerate.host/latest?base=${!isEmpty(searchWeatherData.data) ? Object.keys(countryCur)[0] : ipData.data.currency.currency_code}&source=crypto&symbols=BTC,ETH,BNB`, { timeout: 1000, })
    //     // return axios.get(`https://api.exchangerate.host/convert?from=BTC&to=${!isEmpty(searchWeatherData.data) ? Object.keys(countryCur)[0] : ipData.data.currency.currency_code}`, { timeout: 1000, })
    //     .catch(function (error) {
    //       if (error.response) {
    //         // alert(`Ошибка: ${error.response.status} `)
    //         console.log(error.response.data);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    //       }
    //     })
    //     .then((response) => {
    //       if (!response.ok) {
    //         if (typeof response === 'object') return response;
    //         if (typeof response === 'string') return JSON.parse(response)
    //       }
    //     })
    //     .then((data) => {
    //       setCryptoRate(data)
    //       console.log("DATA:", data)
    //     })
    // }




    // TODO: Сделай возможным доставать данные, только на английском языке


    const fetchBTC = async () => {
      return await axios.get(`https://api.exchangerate.host/convert?from=BTC&to=${!isEmpty(searchWeatherData.data) ? countryCur : ipData.data.currency.currency_code}`, { timeout: 1000, })
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
          setExchangeBTC(data)
        })
    }
    const fetchETH = async () => {
      console.log(countryCur)
      return await axios.get(`https://api.exchangerate.host/convert?from=ETH&to=${!isEmpty(searchWeatherData.data) ? countryCur : ipData.data.currency.currency_code}`, { timeout: 1000, })
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
          setExchangeETH(data)
        })
    }
    const fetchExchangeData = async () => {
      return await axios.get(`https://api.exchangerate.host/latest?base=${!isEmpty(searchWeatherData.data) ? countryCur : ipData.data.currency.currency_code}&symbols=USD,EUR`, { timeout: 1000, })
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
          setExchangeRate(data)
        })
    }


    if (!isEmpty(searchWeatherData) || !isEmpty(ipData) || !isEmpty(exchangeBTC) || !isEmpty(exchangeETH)) {
      // fetchCryptoData()
      fetchExchangeData()
      fetchBTC()
      fetchETH()
    }
  }, [ipData, searchWeatherData])



  const locationWeather = async (e) => {
    if (e._reactName === 'onClick' && navigator.geolocation) {
      e.preventDefault();
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
            setCurrentWeather(data)
          })
      }, error => {
        console.log('Error', error)
        alert("Ошибка навигации, определяем по ip")
        return axios.get(`${api.baseURL}key=${api.apiKey}&q=${ipData.data.region}&lang=ru&days=7&ip&aqi=yes&alerts=no`, { timeout: 1000, })
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
      e.preventDefault();
      await axios.get(`${api.baseURL}key=${api.apiKey}&q=${query}&lang=ru&days=7&aqi=yes&alerts=no`, {
        timeout: 1000,
      })
        .catch(function (error) {
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
        .then((response) => {
          if (!response.ok) {
            if (typeof response === 'object') return response;
            if (typeof response === 'string') return JSON.parse(response);
          }
        })
        .then((data) => {
          // console.log("DATA: ", data)
          setSearchWeatherData(data)
          setQuery('')
        })
    }
  }



  return (
    <div className='App'>

      <div className='card'>
        {/* 
        <nav className='searchContainer'>
          <form className='searchForm'>
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
          </form>
        </nav> */}

        <Search query={query} search={search} locationWeather={locationWeather} setQuery={setQuery} />
        <Weather initialWeather={currentWeather} searchResult={searchWeatherData} twoDaysWeather={toggle}
          setToggle={setToggle} ipData={ipData} exchangeRate={exchangeRate}
          exchangeBTC={exchangeBTC.data} exchangeETH={exchangeETH.data} />
        <WeeksData initialForecast={currentWeather} searchForecast={searchWeatherData} setToggle={setToggle} />
        {/* <span className='timelineItem'><img className='timeLineClockIcon' src='/clock(2).svg' alt='icon'></img></span> */}
        <WeatherTimeline searchForecastHours={searchWeatherData} initialForecastHours={currentWeather} twoDaysWeather={toggle} />

      </div>
    </div >
  );
}

export default App;