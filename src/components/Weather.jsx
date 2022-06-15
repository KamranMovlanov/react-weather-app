import React, { useState, useEffect } from 'react'
import style from './Components.module.css'
import { weatherApi } from '../Api/api'


function Weather(props) {
    const [dateTime, setDateTime] = useState(new Date())
    const [sunriseConvert, setSunriseConvert] = useState(0)
    const [sunsetConvert, setSunsetConvert] = useState(0)
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }

    /*FIXME: 

        ** Сделай commit
        1. Время должно меняться в зависимости от страны
        2. Исправь время захода и восхода
        3. Достань погоду на 1-неделю
        4. Раскидай ее в WeeksData 
    
    */



    useEffect(() => {
        const id = setInterval(() => setDateTime(new Date()), 1000)
        return () => {
            clearInterval(id)
        }
    }, []);

    useEffect(() => {
        console.log("Weather Data: ", props.weather.data)
        console.log("WeatherApi : ", weatherApi.weatherData.sunrise)

        {
            let unix_timestamp = props.weather.data !== undefined ? props.weather.data.sys.sunrise : weatherApi.weatherData.sunrise
            let date = new Date(unix_timestamp * 1000);
            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();
            let formattedTime = hours + ':' + minutes.substr(-2);
            setSunriseConvert(formattedTime)
        }

        {
            let unix_timestamp = props.weather.data ? props.weather.data.sys.sunset : weatherApi.weatherData.sunset
            let date = new Date(unix_timestamp * 1000);
            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();
            let formattedTime = hours + ':' + minutes.substr(-2);
            setSunsetConvert(formattedTime)
        }

    }, [weatherApi.weatherData.sunrise]); {/*FIXME: Не корректно отображает время заходи и восхода*/ }


    if (props.weather.data !== undefined) {
        let cityName = props.weather.data.sys.country.toLowerCase() + "-" + props.weather.data.sys.country.toUpperCase()
        // console.log("Icon: ", weatherApi.weatherData.icon)
        console.log("Icon: ", props.weather.data.weather[0].icon)

        return (
            <div className={style.weatherContainer}>
                <h2 className={style.city}>Weather in {props.weather.data.name}</h2>
                <h4 className={style.date}>{dateTime.toLocaleDateString('ru-RU', options)}</h4>
                <h1 className={style.temp}>{props.weather.data.main.temp} °C</h1>
                <h5 className={style.feelsLike}>Feels like: {props.weather.data.main.feels_like}</h5>
                <div className={style.flex}>
                    <img src={"https://openweathermap.org/img/wn/" + props.weather.data.weather[0].icon + ".png"} alt="Icon" className={style.icon} />
                    <div className={style.description}>{props.weather.data.weather[0].description}</div>
                </div>
                <div className={style.OtherInformation}>
                    <div className={style.humidity}>Humidity: {props.weather.data.main.humidity}</div>
                    <div className={style.wind}>Wind speed:  {props.weather.data.wind.speed} km/h</div>
                    <div className={style.wind}>Sunrise: {sunriseConvert}</div>
                    <div className={style.wind}>Sunset: {sunsetConvert}</div>
                    <div className={style.wind}>Pressure: {props.weather.data.main.pressure}</div>
                    <h3 className={style.time}>{`${dateTime.toLocaleTimeString(cityName)}`}</h3>
                </div>
            </div>
        )
    }


    return (
        <div className={style.weatherContainer}>
            <h2 className={style.city}>Weather in {weatherApi.weatherData.name}</h2>
            <h4 className={style.date}>{dateTime.toLocaleDateString('ru-RU', options)}</h4>
            <h1 className={style.temp}>{weatherApi.weatherData.temp} °C</h1>
            <h5 className={style.feelsLike}>Feels like: {weatherApi.weatherData.feels_like}</h5>
            <div className={style.flex}>
                <img src={"https://openweathermap.org/img/wn/" + weatherApi.weatherData.icon + ".png"} alt="Icon" className={style.icon} />
                <div className={style.description}>{weatherApi.weatherData.description}</div>
            </div>
            <div className={style.OtherInformation}>
                <div className={style.humidity}>Humidity: {weatherApi.weatherData.humidity}</div>
                <div className={style.wind}>Wind speed:  {weatherApi.weatherData.speed} km/h</div>
                <div className={style.wind}>Sunrise: {sunriseConvert}</div>
                <div className={style.wind}>Sunset: {sunsetConvert}</div>
                <div className={style.wind}>Pressure: {weatherApi.weatherData.pressure}</div>
                <h3 className={style.time}>{`${dateTime.toLocaleTimeString('ru-RU')}`}</h3>
            </div>
        </div>
    )

}

export default Weather