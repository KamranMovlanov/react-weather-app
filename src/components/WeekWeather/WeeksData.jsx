import React from 'react'
import style from './WeeksData.module.css'
import { daysOfTheWeek, isEmpty } from './../utilities/utilities';


function WeeksData(props) {
    if (isEmpty(props.initialForecast)) {
        return (
            <div>
                <span className={style.loading}><img src='/loading-bar.png'></img></span>
            </div>
        )
    }


    const d = new Date()
    const n = d.getDay()


    if (!isEmpty(props.searchForecast)) {
        return (
            <div className={style.weekData}>

                {props.searchForecast.data.forecast.forecastday.filter((el, i) => i > 0).map((elem, i, arr) => {
                    return (
                        <div key={i} className={style.container} onClick={() => { props.setToggle(i + 1) }}>
                            <h5 className={style.date}>{i === 0 ? daysOfTheWeek([n + 1]) : daysOfTheWeek([n + 2])}</h5>
                            <span className={style.temp}>{elem.day.mintemp_c > 0 ? "+" + Math.round(elem.day.mintemp_c) : "-" + Math.round(elem.day.mintemp_c)}°
                                {elem.day.maxtemp_c > 0 ? "+" + Math.round(elem.day.maxtemp_c) : "-" + Math.round(elem.day.maxtemp_c)}°
                            </span>
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
                {props.initialForecast.data.forecast.forecastday.filter((el, i) => i > 0).map((elem, i, arr) => {
                    return (
                        <div key={i} className={style.container} onClick={() => { props.setToggle(i + 1) }}>
                            <h5 className={style.date}>{i === 0 ? daysOfTheWeek([n + 1]) : daysOfTheWeek([n + 2])}</h5> {/*TODO: Сделай дату более наглядной*/}
                            <span className={style.temp}>{elem.day.mintemp_c > 0 ? "+" + Math.round(elem.day.mintemp_c) : "-" + Math.round(elem.day.mintemp_c)}°
                                {elem.day.maxtemp_c > 0 ? "+" + Math.round(elem.day.maxtemp_c) : "-" + Math.round(elem.day.maxtemp_c)}°
                            </span>
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