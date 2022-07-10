import React from 'react'
import style from './WeeksData.module.css'
import { daysOfTheWeek, isEmpty } from './../utilities/utilities';
import moment from "moment"


function WeeksData(props) {
    if (isEmpty(props.initialForecast)) {
        return (
            <div className={style.loader}></div>
        )
    }

    const d = new Date()
    const n = d.getDay()
    
    const tempClassColor = (param) => {
        if(param <= -10){
            return style.tempVeryCold
        }
        if(param <= 0){
            return style.tempCold
        }
        if(param <= 15){
            return style.temp
        }
        if(param <= 25){
            return style.tempAverageDegrees
        }
        if(param <= 35){
            return style.tempHighDegrees
        }
        if(param > 35){
            return style.tempExtremeDegrees
        }
    }


    if (!isEmpty(props.searchForecast)) {
        return (
            <div className={style.weekData}>

                {props.searchForecast.data.forecast.forecastday.filter((el, i) => i > 0).map((elem, i, arr) => {
                    
                    return (
                        <div key={i} className={style.container} onClick={() => { props.setToggle(i + 1) }}>
                            <h5 className={style.date}>{i === 0 ? daysOfTheWeek([moment().add(1, 'days').days()]) : daysOfTheWeek([moment().add(+ 2, 'days').days()])}</h5>
                            <span className={tempClassColor(Math.round(elem.day.avgtemp_c))}>
                                {Math.floor(elem.day.mintemp_c) > 0 ? " +" + Math.round(elem.day.mintemp_c) : Math.round(elem.day.mintemp_c)}°
                                {Math.floor(elem.day.maxtemp_c) > 0 ? " +" + Math.round(elem.day.maxtemp_c) : Math.round(elem.day.maxtemp_c)}°
                            </span>
                            <div className={style.flex}>
                                <img src={elem.day.condition.icon} alt="Icon" className={style.icon} />
                                <h4 className={style.description}>{elem.day.condition.text}</h4>
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
                            <h5 className={style.date}>{i === 0 ? daysOfTheWeek([moment().add(1, 'days').days()]) : daysOfTheWeek([moment().add(+ 2, 'days').days()])}</h5>
                            <span className={tempClassColor(Math.round(elem.day.avgtemp_c))}>
                                {Math.floor(elem.day.mintemp_c) > 0 ? " +" + Math.round(elem.day.mintemp_c) : Math.round(elem.day.mintemp_c)}°
                                {Math.floor(elem.day.maxtemp_c) > 0 ? " +" + Math.round(elem.day.maxtemp_c) : Math.round(elem.day.maxtemp_c)}°
                            </span>
                            <div className={style.flex}>
                                <img src={elem.day.condition.icon} alt="Icon" className={style.icon} />
                                <h4 className={style.description}>{elem.day.condition.text}</h4>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

}

export default WeeksData