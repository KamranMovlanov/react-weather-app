import React from 'react'
import style from './WeeksData.module.css'

// TODO: настрой с помощью Router расписание на неделю + переключение по клику
//TODO: Create css for this component + создай элементы через map

let week = [1, 2, 3, 4, 5, 6, 7]

function WeeksData() {
    return (
        <div className={style.weekData}>
            {week.map((elem, i) => {
                return (
                    <div key={i} className={style.container}>
                        <h5 className={style.date}>Wednesday 1 April</h5>
                        <h2 className={style.temp}>51°C</h2>
                        <div className={style.flex}>
                            <img src="https://openweathermap.org/img/wn/04n.png" alt="Icon" className={style.icon} />
                        </div>
                    </div>
                )
            })}


        </div>
    )
}

export default WeeksData