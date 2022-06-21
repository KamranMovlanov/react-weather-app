import style from './Components.module.css'
import { nanoid } from 'nanoid'
import { daysOfTheWeek, isEmpty } from './utilities/utilities';


function Weather(props) {
    if (isEmpty(props.initialWeather.data)) {
        return (
            <div>
                <span className={style.loading}><img src='/loading-bar.png'></img></span>
            </div>
        )
    }


    const d = new Date()
    const n = d.getDay()


    if (!isEmpty(props.searchResult.data)) {
        return (
            <div className={style.weatherContainer}>
                {
                    props.twoDaysWeather > 0 ?
                        props.searchResult.data.forecast.forecastday.filter((el, i) => i === props.twoDaysWeather).map(elem => {
                            return (
                                <>
                                    <button className={style.currentWeatherBtn} onClick={() => { props.setToggle(0) }}>Погода сейчас</button>
                                    <h2 className={style.city}>{props.searchResult.data.location.country} {props.searchResult.data.location.name}</h2>
                                    <p className={style.city}>{props.searchResult.data.location.tz_id}</p>
                                    <h4 className={style.date}>{elem.date}</h4>
                                    <span>Сегодня {daysOfTheWeek([n])}</span>
                                    <h2 className={style.temp}>{elem.day.mintemp_c > 0 ? "+" + Math.round(elem.day.mintemp_c) : "-" + Math.round(elem.day.mintemp_c)}°
                                        {elem.day.maxtemp_c > 0 ? "+" + Math.round(elem.day.maxtemp_c) : "-" + Math.round(elem.day.maxtemp_c)}°
                                    </h2>
                                    <div className={style.flex}>
                                        <img src={elem.day.condition.icon} alt="Icon" className={style.icon} />
                                        <div className={style.description}>{elem.day.condition.text}</div>
                                    </div>
                                    <div className={style.OtherInformationForecast}>
                                        <div className={style.wind}>Скорость ветра: {elem.day.maxwind_kph} км/ч</div>
                                        <div className={style.wind}>Восход: {elem.astro.sunrise}</div>
                                        <div className={style.wind}>Закат: {elem.astro.sunset}</div>
                                        <div className={style.wind}>Давление: {elem.day.avghumidity}</div>
                                    </div>
                                </>
                            )
                        })

                        :
                        <><h2 className={style.city}>{props.searchResult.data.location.country} {props.searchResult.data.location.name}</h2>
                            <p className={style.city}>{props.searchResult.data.location.tz_id}</p>
                            <h4 className={style.date}>{props.searchResult.data.location.localtime}</h4>
                            <span>Сегодня {daysOfTheWeek([n])}</span>
                            <h1 className={style.temp}>{props.searchResult.data.current.temp_c > 0 ? "+" + Math.round(props.searchResult.data.current.temp_c) : "-" + Math.round(props.searchResult.data.current.temp_c)}°</h1>
                            <h5 className={style.feelsLike}>Ощущается как: {props.searchResult.data.current.feelslike_c > 0 ? "+" + Math.round(props.searchResult.data.current.feelslike_c) : "-" + Math.round(props.searchResult.data.current.feelslike_c)}°</h5>

                            <div className={style.flex}>
                                <img src={props.searchResult.data.current.condition.icon} alt="Icon" className={style.icon} />
                                <div className={style.description}>{props.searchResult.data.current.condition.text}</div>
                            </div>
                            <div className={style.OtherInformation}>
                                <div className={style.airQuality}>
                                    <span className={style.airQualityTitle}>Качество воздуха: </span>
                                    <div className={style.co}>CO: {Math.round(props.searchResult.data.current.air_quality.co)}</div>
                                    <div className={style.co}>no2: {Math.round(props.searchResult.data.current.air_quality.no2)}</div>
                                    <div className={style.co}>o3: {Math.round(props.searchResult.data.current.air_quality.o3)}</div>
                                </div>
                                <div className={style.humidity}>Влажность: {props.searchResult.data.current.humidity}</div>
                                <div className={style.wind}>Скорость ветра: {props.searchResult.data.current.wind_kph} км/ч</div>
                                <div className={style.wind}>
                                    УФ-индекс:
                                    <span className={props.searchResult.data.current.uv <= 3 ? style.uvMin : style.uvAverage
                                        && props.initialWeather.data.current.uv >= 7 ? style.uvExtreme : style.uvHight}> {/*FIXME:  поправь условия класса в двух местах */}
                                        {/* 
                                        {" " + props.initialWeather.data.current.uv <= 3 ? " " + props.initialWeather.data.current.uv + ' Низкий'
                                            : " " + props.initialWeather.data.current.uv + " Cредний"
                                                && props.initialWeather.data.current.uv < 7 ? " " + props.initialWeather.data.current.uv + " Экстремальный"
                                                : " " + props.initialWeather.data.current.uv + " Высокий"} */}


                                        {" " + props.searchResult.data.current.uv >= 0 && props.searchResult.data.current.uv <= 3 ? " " + props.searchResult.data.current.uv + ', Низкий' : " "}
                                        {props.searchResult.data.current.uv >= 4 && props.searchResult.data.current.uv <= 6 ? " " + props.searchResult.data.current.uv + ", Средний" : " "}
                                        {props.searchResult.data.current.uv >= 7 && props.searchResult.data.current.uv <= 9 ? props.searchResult.data.current.uv + ", Высокий" : " "}
                                        {props.searchResult.data.current.uv > 10 ? props.searchResult.data.current.uv + ", Экстремальный" : " "}
                                    </span>
                                </div>
                                <div className={style.wind}>Восход: {props.searchResult.data.forecast.forecastday[0].astro.sunrise}</div>
                                <div className={style.wind}>Закат: {props.searchResult.data.forecast.forecastday[0].astro.sunset}</div>
                                <div className={style.wind}>Давление: {props.searchResult.data.current.pressure_mb}</div>
                            </div></>
                }

            </div>
        )

    }

    if (!isEmpty(props.initialWeather.data)) {
        // console.log(props.initialWeather.data)
        return (
            <div className={style.weatherContainer}>
                {
                    props.twoDaysWeather > 0 ?
                        props.initialWeather.data.forecast.forecastday.filter((el, i) => i === props.twoDaysWeather).map((elem, i) => {
                            return (
                                <>
                                    <button className={style.currentWeatherBtn} key={i = nanoid()} onClick={() => { props.setToggle(0) }}>Погода сейчас</button>
                                    <h2 className={style.city} key={i = nanoid()}>{props.initialWeather.data.location.country} {props.initialWeather.data.location.name}</h2>
                                    <p className={style.city} key={i = nanoid()}>{props.initialWeather.data.location.tz_id}</p>
                                    <h4 className={style.date} key={i = nanoid()}>{elem.date}</h4>
                                    <span>Сегодня {daysOfTheWeek([n])}</span>
                                    <h1 className={style.temp} key={i = nanoid()}>{elem.day.mintemp_c > 0 ? "+" + Math.round(elem.day.mintemp_c) : "-" + Math.round(elem.day.mintemp_c)}° {Math.round(elem.day.maxtemp_c) > 0 ? "+" + Math.round(elem.day.maxtemp_c) : "-" + Math.round(elem.day.maxtemp_c)}°</h1>
                                    {/* <h5 className={style.feelsLike}>Чувствуется как: {props.searchResult.data.current.feelslike_c}</h5> */}

                                    <div className={style.flex} key={elem.day.condition.code}>
                                        <img src={elem.day.condition.icon} key={elem.day.condition.code} alt="Icon" className={style.icon} />
                                        <div className={style.description} key={elem.day.condition.code}>{elem.day.condition.text}</div>
                                    </div>
                                    <div className={style.OtherInformationForecast} key={i = nanoid()}>
                                        <div className={style.wind} key={i = nanoid()}>Скорость ветра: {elem.day.maxwind_kph} км/ч</div>
                                        <div className={style.wind} key={i = nanoid()}>Восход: {elem.astro.sunrise}</div>
                                        <div className={style.wind} key={i = nanoid()}>Закат: {elem.astro.sunset}</div>
                                        <div className={style.wind} key={i = nanoid()}>Давление: {elem.day.avghumidity} мм рт. ст.</div>
                                        <div className={style.wind} key={i = nanoid()}>УФ-индекс: {elem.day.uv}</div>
                                    </div>
                                </>
                            )

                        })
                        :

                        <>
                            {/* TODO: ! props.initialWeather.data.current.is_day Показывает день или ночь! исп. для смены темы or background */}
                            <h2 className={style.city}>{props.initialWeather.data.location.country} {props.initialWeather.data.location.name}</h2>
                            <p className={style.city}>{props.initialWeather.data.location.tz_id}</p>
                            <h4 className={style.date}>{props.initialWeather.data.location.localtime}</h4>
                            <span>Сегодня {daysOfTheWeek([n])}</span>
                            <h1 className={style.temp}>{props.initialWeather.data.current.temp_c > 0 ? "+" + Math.round(props.initialWeather.data.current.temp_c) : "-" + Math.round(props.initialWeather.data.current.temp_c)}°</h1>
                            <h5 className={style.feelsLike}>Ощущается как: {props.initialWeather.data.current.feelslike_c > 0 ? "+" + Math.round(props.initialWeather.data.current.feelslike_c) : "-" + Math.round(props.initialWeather.data.current.feelslike_c)}°</h5>
                            <div className={style.flex}>
                                <img src={props.initialWeather.data.current.condition.icon} alt="Icon" className={style.icon} />
                                <div className={style.description}>{props.initialWeather.data.current.condition.text}</div>
                            </div>
                            <div className={style.OtherInformation}>
                                <div className={style.airQuality}>
                                    <span className={style.airQualityTitle}>Качество воздуха: </span>
                                    <div className={style.co}>CO: {Math.round(props.initialWeather.data.current.air_quality.co)}</div>
                                    <div className={style.co}>no2: {Math.round(props.initialWeather.data.current.air_quality.no2)}</div>
                                    <div className={style.co}>o3: {Math.round(props.initialWeather.data.current.air_quality.o3)}</div>
                                </div>
                                <div className={style.humidity}>Влажность: {props.initialWeather.data.current.humidity} %</div>
                                <div className={style.wind}>Ветер: {props.initialWeather.data.current.wind_kph} км/ч</div>
                                <div className={style.wind}>Давление: {props.initialWeather.data.current.pressure_mb} мм рт. ст.</div> {/*TODO: уточни насчет мм рт. ст. + если правильно перенеси в другие места*/}
                                <div className={style.wind}>
                                    УФ-индекс:
                                    <span className={props.initialWeather.data.current.uv <= 3 ? style.uvMin : style.uvAverage
                                        && props.initialWeather.data.current.uv >= 7 ? style.uvExtreme : style.uvHight}>

                                        {" " + props.initialWeather.data.current.uv >= 0 && props.initialWeather.data.current.uv <= 3 ? " " + props.initialWeather.data.current.uv + ', Низкий' : " "}
                                        {props.initialWeather.data.current.uv >= 4 && props.initialWeather.data.current.uv <= 6 ? " " + props.initialWeather.data.current.uv + ", Средний" : " "}
                                        {props.initialWeather.data.current.uv >= 7 && props.initialWeather.data.current.uv <= 9 ? props.initialWeather.data.current.uv + ", Высокий" : " "}
                                        {props.initialWeather.data.current.uv > 10 ? props.initialWeather.data.current.uv + ", Экстремальный" : " "}
                                    </span>
                                </div>
                                <div className={style.wind}>Восход: {props.initialWeather.data.forecast.forecastday[0].astro.sunrise}</div>
                                <div className={style.wind}>Закат: {props.initialWeather.data.forecast.forecastday[0].astro.sunset}</div>
                                {/* <div className={style.wind}>Закат: {props.initialWeather.data.forecast.forecastday[0].astro.sunset + props.initialWeather.data.forecast.forecastday[0].astro.sunrise} </div> */}
                            </div>
                        </>
                }


            </div>
        )
    }

}

export default Weather