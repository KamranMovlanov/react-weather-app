import React from 'react'
import style from './WeeksData.module.css'


function WeeksData(props) {
    function isEmpty(obj) {
        for (let key in obj) {
            return false;
        }
        return true;
    }

    if (isEmpty(props.initialForecast)) {
        return (
            <h1>Loading</h1>
        )
    }

    if (!isEmpty(props.searchForecast)) {
        return (
            <div className={style.weekData}>
                <h4>Погода на 2 дня</h4>
                {props.searchForecast.data.forecast.forecastday.filter((el, i) => i > 0).map((elem, i, arr) => {
                    return (
                        <div key={i} className={style.container}>
                            <h5 className={style.date}>{elem.date}</h5>
                            <h2 className={style.temp}>{elem.day.avgtemp_c}°C</h2>
                            <div className={style.flex}>
                                <img src={elem.day.condition.icon} alt="Icon" className={style.icon} />
                                <div className={style.description}>{elem.day.condition.text}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    if (!isEmpty(props.initialForecast)) {
        return (
            <div className={style.weekData}>
                <h4>Погода на 2 дня</h4>
                {props.initialForecast.data.forecast.forecastday.filter((el, i) => i > 0).map((elem, i, arr) => {
                    return (
                        <div key={i} className={style.container}>
                            <h5 className={style.date}>{elem.date}</h5>
                            <h2 className={style.temp}>{elem.day.avgtemp_c}°C</h2>
                            <div className={style.flex}>
                                <img src={elem.day.condition.icon} alt="Icon" className={style.icon} />
                                <div className={style.description}>{elem.day.condition.text}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

}

export default WeeksData