import React, { useState, useEffect } from 'react'
import style from './Components.module.css'
// import { weatherApi } from '../Api/api'


function Weather(props) {
    const [dateTime, setDateTime] = useState(new Date())
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }

    function isEmpty(obj) {
        for (let key in obj) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        const id = setInterval(() => setDateTime(new Date()), 1000)
        return () => {
            clearInterval(id)
        }
    }, []);



    if (isEmpty(props.initialWeather.data)) {
        return (
            <div className={style.weatherContainer}>
                <h1>Loading</h1>
            </div>
        )
    }




    if (!isEmpty(props.searchResult.data)) {
        return (
            <div className={style.weatherContainer}>
                <h2 className={style.city}>{props.searchResult.data.location.country} {props.searchResult.data.location.name}</h2>
                <p className={style.city}>{props.searchResult.data.location.tz_id}</p>
                <h4 className={style.date}>{props.searchResult.data.location.localtime}</h4>
                <h1 className={style.temp}>{props.searchResult.data.current.temp_c} °C</h1>
                <h5 className={style.feelsLike}>Чувствуется как: {props.searchResult.data.current.feelslike_c}</h5>
                <div className={style.flex}>
                    <img src={props.searchResult.data.current.condition.icon} alt="Icon" className={style.icon} />
                    <div className={style.description}>{props.searchResult.data.current.condition.text}</div>
                </div>
                <div className={style.OtherInformation}>
                    <div className={style.humidity}>Влажность: {props.searchResult.data.current.humidity}</div>
                    <div className={style.wind}>Скорость ветра:  {props.searchResult.data.current.wind_kph} km/h</div>
                    <div className={style.wind}>Восход: {props.searchResult.data.forecast.forecastday[0].astro.sunrise}</div>
                    <div className={style.wind}>Закат: {props.searchResult.data.forecast.forecastday[0].astro.sunset}</div>
                    <div className={style.wind}>Давление: {props.searchResult.data.current.pressure_mb}</div>
                </div>
            </div>
        )
    }

    if (!isEmpty(props.initialWeather.data)) {
        return (
            <div className={style.weatherContainer}>
                <h2 className={style.city}>{props.initialWeather.data.location.country} {props.initialWeather.data.location.name}</h2>
                <p className={style.city}>{props.initialWeather.data.location.tz_id}</p>
                <h4 className={style.date}>{props.initialWeather.data.location.localtime}</h4>
                <h1 className={style.temp}>{props.initialWeather.data.current.temp_c} °C</h1>
                <h5 className={style.feelsLike}>Чувствуется как: {props.initialWeather.data.current.feelslike_c}</h5>
                <div className={style.flex}>
                    <img src={props.initialWeather.data.current.condition.icon} alt="Icon" className={style.icon} />
                    <div className={style.description}>{props.initialWeather.data.current.condition.text}</div>
                </div>
                <div className={style.OtherInformation}>
                    <div className={style.humidity}>Влажность: {props.initialWeather.data.current.humidity}</div>
                    <div className={style.wind}>Скорость ветра:  {props.initialWeather.data.current.wind_kph} km/h</div>
                    <div className={style.wind}>Восход: {props.initialWeather.data.forecast.forecastday[0].astro.sunrise}</div>
                    <div className={style.wind}>Закат: {props.initialWeather.data.forecast.forecastday[0].astro.sunset}</div>
                    <div className={style.wind}>Давление: {props.initialWeather.data.current.pressure_mb}</div>
                </div>
            </div>
        )
    }

}

export default Weather