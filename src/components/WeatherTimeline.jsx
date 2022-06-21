import React from 'react'
import style from './Components.module.css'
import { isEmpty } from './utilities/utilities';


function WeatherTimeline(props) {
    // const [dateTime, setDateTime] = useState(new Date())
    // const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }

    // useEffect(() => {
    //     const id = setInterval(() => setDateTime(new Date()), 5000)
    //     return () => {
    //         clearInterval(id)
    //     }
    // }, []);

    if (isEmpty(props.initialForecastHours)) {
        return (
            <div>
                <span className={style.loading}><img src='/loading-bar.png'></img></span>
            </div>
        )
    }

    if (!isEmpty(props.searchForecastHours)) {
        return (
            <div className={style.timelineContainer}>
                {
                    props.twoDaysWeather > 0 ?
                        props.searchForecastHours.data.forecast.forecastday.filter((el, i) => i === props.twoDaysWeather).map((elem, i) => {
                            return (
                                elem.hour.map((element, index) => {
                                    return (
                                        <div key={index} className={style.container}>
                                            <span className={style.dateTimeLine}><img src='/clock.png'></img> {element.time.slice(-5)}</span>
                                            <h3 className={style.tempTimeLine}>{element.temp_c > 0 ? "+" + Math.round(element.temp_c) : Math.round(element.temp_c)}°</h3>
                                            <span className={style.windTimeLine} > <img src='/wind2.png'></img> {element.wind_kph} км/ч</span>
                                            <div className={style.flexTimeLine}>
                                                <img src={element.condition.icon} alt="Icon" className={style.iconTimeLine} />
                                                <div className={style.descriptionTimeLine}>{element.condition.text}</div>
                                            </div>
                                        </div>
                                    )
                                })

                            )
                        })
                        :
                        props.searchForecastHours.data.forecast.forecastday[0].hour.map((elem, i) => {
                            return (
                                <div key={i} className={style.container}>
                                    <span className={style.dateTimeLine}><img src='/clock.png'></img> {elem.time.slice(-5)}</span>
                                    <h3 className={style.tempTimeLine}>{elem.temp_c > 0 ? "+" + Math.round(elem.temp_c) : Math.round(elem.temp_c)}°</h3>
                                    <span className={style.windTimeLine}> <img src='/wind2.png'></img> {elem.wind_kph} км/ч</span>
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
                {
                    props.twoDaysWeather > 0 ?
                        props.initialForecastHours.data.forecast.forecastday.filter((el, i) => i === props.twoDaysWeather).map((elem, i) => {
                            return (
                                elem.hour.map((element, index) => {
                                    return (
                                        <div key={index} className={style.container}>
                                            <span className={style.dateTimeLine}><img src='/clock.png'></img> {element.time.slice(-5)}</span>
                                            <h3 className={style.tempTimeLine}>{element.temp_c > 0 ? "+" + Math.round(element.temp_c) : Math.round(element.temp_c)}°</h3>
                                            <span className={style.windTimeLine} > <img src='/wind2.png'></img> {element.wind_kph} км/ч</span>
                                            <div className={style.flexTimeLine}>
                                                <img src={element.condition.icon} alt="Icon" className={style.iconTimeLine} />
                                                <div className={style.descriptionTimeLine}>{element.condition.text}</div>
                                            </div>
                                        </div>
                                    )
                                })

                            )
                        })
                        :
                        props.initialForecastHours.data.forecast.forecastday[0].hour.map((elem, i) => {
                            return (
                                <div key={i} className={style.container}>
                                    <span className={style.dateTimeLine}><img src='/clock.png'></img> {elem.time.slice(-5)}</span>
                                    <h3 className={style.tempTimeLine}>{elem.temp_c > 0 ? "+" + Math.round(elem.temp_c) : Math.round(elem.temp_c)}°</h3>
                                    <span className={style.windTimeLine} > <img src='/wind2.png'></img> {elem.wind_kph} км/ч</span>
                                    <div className={style.flexTimeLine}>
                                        <img src={elem.condition.icon} alt="Icon" className={style.iconTimeLine} />
                                        <div className={style.descriptionTimeLine}>{elem.condition.text}</div>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        )
    }
}

export default WeatherTimeline