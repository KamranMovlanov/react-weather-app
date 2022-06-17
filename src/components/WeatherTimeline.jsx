import React from 'react'
import style from './Components.module.css'

function WeatherTimeline(props) {
    function isEmpty(obj) {
        for (let key in obj) {
            // если тело цикла начнет выполняться - значит в объекте есть свойства
            return false;
        }
        return true;
    }

    if (isEmpty(props.initialForecastHours)) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    }

    if (!isEmpty(props.searchForecast)) {
        return (
            <div className={style.timelineContainer}>
                {
                    props.searchForecastHours.data.forecast.forecastday[0].hour.map((elem, i) => {
                        return (
                            <div key={i} className={style.container}>
                                <h5 className={style.dateTimeLine}>{elem.time.slice(-5)}</h5>
                                <h3 className={style.tempTimeLine}>{elem.temp_c}°C</h3>
                                <div className={style.flexTimeLine}>
                                    <img src={elem.condition.icon} alt="Icon" className={style.iconTimeLine} />
                                    <div className={style.descriptionTimeLine}>{elem.condition.text}</div>
                                </div>
                            </div>
                        )
                    })}
            </div>)
    }

    if (!isEmpty(props.initialForecastHours)) {
        return (
            <div className={style.timelineContainer}>
                {props.initialForecastHours.data.forecast.forecastday[0].hour.map((elem, i) => {
                    return (
                        <div key={i} className={style.container}>
                            <h5 className={style.dateTimeLine}>{elem.time.slice(-5)}</h5>
                            <h3 className={style.tempTimeLine}>{elem.temp_c}°C</h3>
                            <div className={style.flexTimeLine}>
                                <img src={elem.condition.icon} alt="Icon" className={style.iconTimeLine} />
                                <div className={style.descriptionTimeLine}>{elem.condition.text}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default WeatherTimeline