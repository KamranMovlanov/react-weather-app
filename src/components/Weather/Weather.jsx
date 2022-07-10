/* eslint-disable no-unused-expressions */
import style from '../Weather/Weather.module.css'
import React from 'react';
import { nanoid } from 'nanoid'
import { daysOfTheWeek, isEmpty } from '../utilities/utilities';
import moment from "moment"
const CountryQuery = require('country-query')



function Weather(props) {
    moment.locale('ru');
    const d = new Date()
    const n = d.getDay()


    if (isEmpty(props.initialWeather.data)) {
        return (
            <div className={style.loader}></div>
        )
    }


    const calcOfDaylightHours = (sunset, sunrise) => {
           sunset = moment(sunset, "h:mm A").format("H:mm")
           sunrise = moment(sunrise, "h:mm A").format("H:mm")
        

        if(sunrise.length === 4 ){
            sunrise =  Number(sunrise.slice(0, 1)) * 60 + Number(sunrise.slice(2, 6))
         } 
         if(sunset.length === 4){
            sunset =  Number(sunset.slice(0, 1)) * 60 + Number(sunset.slice(2, 6))
         }
         if(sunrise.length === 5){
            sunrise =  Number(sunrise.slice(0, 2)) * 60 + Number(sunrise.slice(3, 6))
         }
         if(sunset.length === 5){
            sunset =  Number(sunset.slice(0, 2)) * 60 + Number(sunset.slice(3, 6))
         }

        let res = ((sunset - sunrise) / 60) 
        res =  res.toString().slice(3, 5)

         return `${((sunset - sunrise) / 60).toFixed(0)} ч ${((Number(res) / 100) * 60).toFixed(0)} мин`
         
    }


    const airQualityDetector = (param) => {
        switch(param) {
          case 1:
            return  param + ", Отлично"
            case 2:
            return param + ", Средний"
            case 3:
            return param  + ", Плохой"
            case 4:
            return param + ", Вредный"
            case 5:
            return param + ", Очень вредный"
            case 6:
            return param + ", Опасно"

          default:
            return 'Не известно';
        }
      }
    const airQualityClassColor = (param) => {
        switch(param) {
          case 1:
            return style.airMin;
            case 2:
            return style.airAverage
            case 3:
            return style.airHight
            case 4:
            return style.airVeryHight
            case 5:
            return style.airExtreme
            case 6:
            return style.airDanger

          default:
            return '';
        }
      }

      const uvQualityDetector = (param) => {
        if(param >= 0 && param <= 2){
            return param + ', Низкий';
        }
        if(param >= 3 && param <= 5){
            return param  + ', Средний';
        }
        if(param >= 6 && param <= 7){
            return param  + ', Высокий';
        }
        if(param >= 8 && param <= 10){
            return param  + ', Очень высокий';
        }
        if(param > 10){
            return param  + ', Экстремально высокий';
        }
      }

      const uvIndexClassColor = (param) => {
        if(param >= 0 && param <= 2 ){
            return style.uvMin
        }
        if(param >= 3 && param <= 5 ){
            return style.uvAverage
        }
        if(param >= 6 && param <= 7 ){
            return style.uvHight
        }
        if(param >= 8 && param <= 10 ){
            return style.uvVeryHight
        }
        if(param > 10 ){
            return style.uvExtreme
        }
        }

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
      
        const dynamicallyObjkeyDetect = (obj, property) => {  

            if(!isEmpty(obj) && obj[Object.keys(obj)]){
                return obj[Object.keys(obj)][property]
            }
            else if(Object.entries(obj).length > 0){
                
                return Object.values(obj)[0][property]
            }
            return 

        }


    if (!isEmpty(props.searchResult.data)) {
        return (
            <main className={style.weatherContainer}>
                {
                    props.twoDaysWeather > 0 ?
                        props.searchResult.data.forecast.forecastday.filter((el, i) => i === props.twoDaysWeather).map(elem => {
                            return (
                                <>
                                    <button className={style.currentWeatherBtn} onClick={() => { props.setToggle(0) }}>Погода сейчас</button>
                                    <h2 className={style.city}>{props.searchResult.data.location.country} {props.searchResult.data.location.name}
                                    {
                            Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][0]  ?
                            ` ${CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1])["flag"]}`
                            : 
                            "" 
                            }
                                    </h2>
                                    <p>{
                            Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][0]  ?
                                Object.keys(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1])['name']['native']).length > 1 
                                ?
                                Object.values(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1])['name']['native'])[0]['official']
                                :
                                CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1])['name']['native'][Object.keys(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1])['name']['native'])]['official']
                                :
                                ""
                            }</p>
                                    <p className={style.city}>{props.searchResult.data.location.tz_id}</p>
                                    <h4 className={style.date}>{elem.date} {daysOfTheWeek([moment().add(props.twoDaysWeather, 'days').days()])}</h4>

                                    <h2 className={tempClassColor(elem.day.avgtemp_c)}>
                                        {Math.floor(elem.day.mintemp_c) > 0 ? `+ ${Math.round(elem.day.mintemp_c)}` : `${Math.round(elem.day.mintemp_c)}`}° {" "}
                                        {Math.floor(elem.day.maxtemp_c) > 0 ? `+ ${Math.round(elem.day.maxtemp_c)}` : `${Math.round(elem.day.maxtemp_c)}`}°
                                        <img src='./temperature-quarter.svg' className={style.OtherInformationIcon} alt="icon"></img>
                                    </h2>
                                    <div className={style.flex}>
                                        <img src={elem.day.condition.icon} alt="Icon" className={style.icon} />
                                        <div className={style.description}>{elem.day.condition.text}</div>
                                    </div>
                                    <ul className={style.OtherInformationForecast}>

                                        <li className={style.humidity}>
                                            <img src='./tear.svg' className={style.OtherInformationIcon} alt="icon"></img>
                                            Влажность: {elem.day.avghumidity} %</li>
                                        <li className={style.wind}>
                                            <img src='./wind.svg' className={style.OtherInformationIcon} alt="icon"></img>
                                            Ветер: {elem.day.maxwind_kph} км/ч</li>
                                        <li className={style.wind}>
                                            <img src='./compress-arrows.svg' className={style.OtherInformationIcon} alt="icon"></img>
                                            Давление: {elem.day.totalprecip_mm} мм рт. ст.</li>
                                        <li className={style.wind}>
                                            <img src='./icons8-uv-index.png' className={style.OtherInformationIcon} alt="icon"></img>
                                            УФ-индекс:
                                            <span className={uvIndexClassColor(elem.day.uv)}>{" " + uvQualityDetector(elem.day.uv)}</span>
                                            <span onClick={() =>{alert(`ИНДЕКС УЛЬТРАФИОЛЕТОВОГО ИЗЛУЧЕНИЯ СОЛНЦА
С начала семидесятых годов прошлого века было замечено увеличение количества случаев заболевания раком кожи. Это было связано с индивидуальными привычками людей по отношению к пребыванию на Солнце. Считалось, что загорать - это, несомненно, приятно и полезно. Однако, это не так, и чрезмерное пребывание на солнце приводит к повреждению кожи и увеличению риска заболевания раком.

Все люди на планете подвержены воздействию ультрафиолетового излучения, исходящего от Солнца. Ультрафиолетовое излучение (УФ-излучение или УФ-радиация) соответствует диапазону электромагнитных волн с длинами 100-400 нанометров.

При каких значениях УФ-индекса существует опасность

УФ-индекс дает оценку величины УФ-излучения Солнца на поверхности Земли. Значения УФ-индекса варьируются от безопасного 0 до экстремального 11+.

0–2 Низкий
3–5 Умеренный
6–7 Высокий
8–10 Очень высокий
11+ Экстремальный

В средних широтах УФ-индекс приближается к небезопасным значениям (6–7) только при максимальной высоте Солнца над горизонтом (происходит в конце июня — начале июля). На экваторе в течение года УФ-индекс достигает 9…11+ баллов.
`)}}  className={style.questionIconWrapper}><img src='./icons8-help.png' className={style.questionIcon} alt="icon"></img></span>
                                        </li>
                                        <li className={style.wind}>
                                            <img src='./sunrise(1).svg' className={style.OtherInformationIcon} alt="icon"></img>
                                            Восход: {moment(elem.astro.sunrise, "h:mm A").format("H:mm")}</li>
                                        <li className={style.wind}>
                                            <img src='./sunset(3).svg' className={style.OtherInformationIcon} alt="icon"></img>
                                            Закат: {moment(elem.astro.sunset, "h:mm A").format("H:mm")}</li>
                                            <div className={style.wind}>
                                <img src='./daytime.png' className={style.OtherInformationIcon} alt="icon"></img>
                                Световой день: <span className={style.daylightHours}>{calcOfDaylightHours(elem.astro.sunset, elem.astro.sunrise)}</span></div>
                                    </ul>
                                    <ul className={style.countryInfo}>
                            <h4> Курс валют за {!isEmpty(props.exchangeRate) ?  props.exchangeRate.data.date : ''}</h4>
                                    <li className={style.countryInfoItems}><img src='./sack.png' className={style.OtherInformationIcon} alt="icon"></img>  Валюта страны:
                                    {
                                    Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][0]  ?
                                    ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][1]['name']}
                                      ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][1]['symbol']}`
                                    :
                                     `${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>
                                    <li className={style.countryInfoItems}><img src='./dollar.png' className={style.OtherInformationIcon} alt="icon"></img> USD:  {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.USD).toFixed(2) : "Нет данных"}
                                    {
                                        Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][0]  ?
                                        ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][1]['symbol']}`
                                        :
                                        `${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>
                                    <li className={style.countryInfoItems}><img src='./euro(1).png' className={style.OtherInformationIcon} alt="icon"></img> EUR: {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.EUR).toFixed(2) : "Нет данных"}
                                    {
                                            Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][0]  ?
                                            ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][1]['symbol']}`
                                            :
                                             `${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>

                                    <li className={style.countryInfoItems}><img src='./BTC.png' className={style.OtherInformationIcon} alt="icon"></img>
                                    
                                    BTC:  {!isEmpty(props.exchangeBTC) && props.exchangeBTC.result != null  ? (props.exchangeBTC.result).toFixed(3) : "Нет данных"}
                                    {
                                         Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][0]  ?
                                         ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][1]['symbol']}`
                                         :
                                          `${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>
                                    <li className={style.countryInfoItems}><img src='./ETH.png' className={style.OtherInformationIcon} alt="icon"></img>
                                    ETH:  {!isEmpty(props.exchangeETH) && props.exchangeETH.result != null ? (props.exchangeETH.result).toFixed(3) : "Нет данных"}
                                    {
                                    Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][0]  ?
                                    ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][1]['symbol']}`
                                    :
                                     `${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>
                                </ul>
                                </>
                            )
                        })
                        :
                        <>
                        {/* FIXME: найди или другую библиотеку либо сделай исключения для null + Изучи react query(может поможет) */}
                        {console.log("Capitals: ",props.searchResult.data.location.tz_id) }

                            <h2 className={style.city}>{props.searchResult.data.location.country} {props.searchResult.data.location.name} 
                            {

                             Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][0] !== null ?   
                            ` ${CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1])["flag"]}
                            `
                            : 
                            "" 
                            }
                            </h2>
                            {/* <p>{
                              Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][0]  ?
                            `${Object.keys(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1])['name']['native']).length} > 1 
                            ?
                            ${Object.values(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1])['name']['native'])[0]['official']}`
                            :
                            CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1])['name']['native'][Object.keys(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1])['name']['native'])]['official']
                             :
                             ""
                            }</p> */}

                            <p className={style.city}>{props.searchResult.data.location.tz_id}</p>
                            <h4 className={style.date}>{props.searchResult.data.location.localtime}, {daysOfTheWeek([n])}</h4>
                            <span>Сейчас</span>
                            <h1 className={tempClassColor(props.searchResult.data.current.temp_c)}>
                                {Math.floor(props.searchResult.data.current.temp_c) > 0 ? 
                                `+ ${Math.round(props.searchResult.data.current.temp_c)}`  : `${Math.round(props.searchResult.data.current.temp_c)}`
                                }°
                                <img src='./temperature-quarter.svg' className={style.OtherInformationIcon} alt="icon"></img>
                            </h1>
                            <h5 className={style.feelsLike}>Ощущается как: {Math.floor(props.searchResult.data.current.feelslike_c) > 0 ? 
                            "+" + Math.round(props.searchResult.data.current.feelslike_c) : Math.round(props.searchResult.data.current.feelslike_c)}°</h5>

                            <div className={style.flex}>
                                <img src={props.searchResult.data.current.condition.icon} alt="Icon" className={style.icon} />
                                <div className={style.description}>{props.searchResult.data.current.condition.text}</div>
                            </div>
                            <ul className={style.OtherInformation}>

                                <li className={style.humidity}>
                                    <img src='./tear.svg' className={style.OtherInformationIcon} alt="icon"></img>
                                    Влажность: {props.searchResult.data.current.humidity} %</li>
                                <li className={style.wind}>
                                    <img src='./wind.svg' className={style.OtherInformationIcon} alt="icon"></img>
                                    Ветер: {props.searchResult.data.current.wind_kph} км/ч</li>
                                <li className={style.wind}>
                                    <img src='./compress-arrows.svg' className={style.OtherInformationIcon} alt="icon"></img>
                                    Давление: {props.searchResult.data.current.pressure_mb} мм рт. ст.</li>
                                <li className={style.wind}>
                                    <img src='./icons8-uv-index.png' className={style.OtherInformationIcon} alt="icon"></img>
                                    УФ-индекс:
                                    <span className={uvIndexClassColor(props.searchResult.data.current.uv)}>
                                        {" " + uvQualityDetector(props.searchResult.data.current.uv)}
                                    </span>
                                    <span onClick={() =>{alert(`ИНДЕКС УЛЬТРАФИОЛЕТОВОГО ИЗЛУЧЕНИЯ СОЛНЦА
С начала семидесятых годов прошлого века было замечено увеличение количества случаев заболевания раком кожи. Это было связано с индивидуальными привычками людей по отношению к пребыванию на Солнце. Считалось, что загорать - это, несомненно, приятно и полезно. Однако, это не так, и чрезмерное пребывание на солнце приводит к повреждению кожи и увеличению риска заболевания раком.

Все люди на планете подвержены воздействию ультрафиолетового излучения, исходящего от Солнца. Ультрафиолетовое излучение (УФ-излучение или УФ-радиация) соответствует диапазону электромагнитных волн с длинами 100-400 нанометров.

При каких значениях УФ-индекса существует опасность

УФ-индекс дает оценку величины УФ-излучения Солнца на поверхности Земли. Значения УФ-индекса варьируются от безопасного 0 до экстремального 11+.

0–2 Низкий
3–5 Умеренный
6–7 Высокий
8–10 Очень высокий
11+ Экстремальный

В средних широтах УФ-индекс приближается к небезопасным значениям (6–7) только при максимальной высоте Солнца над горизонтом (происходит в конце июня — начале июля). На экваторе в течение года УФ-индекс достигает 9…11+ баллов.
`)}}  className={style.questionIconWrapper}><img src='./icons8-help.png' className={style.questionIcon} alt="icon"></img></span>
                                </li>
                                <li className={style.airQuality}>
                                    <span className={style.airQualityTitle}>
                                        <img src='./airQuality.png' className={style.OtherInformationIcon} alt="icon"></img>
                                        Качество воздуха: </span>
                                    <div className={airQualityClassColor(props.searchResult.data.current.air_quality["us-epa-index"])}>
                                        {airQualityDetector(props.searchResult.data.current.air_quality["us-epa-index"])}
                                        <span onClick={() =>{alert(`Как работает AQI ? 
Думайте об AQI как о шкале, которая варьируется от 0 до 500. Чем выше значение AQI, тем больше уровень загрязнения воздуха и тем больше опасений для здоровья. Например, значение AQI 50 или ниже указывает на хорошее качество воздуха, а значение AQI выше 300 указывает на опасное качество воздуха. Для каждого загрязнителя значение AQI, равное 100, обычно соответствует концентрации в окружающем воздухе, равной уровню краткосрочного национального качества окружающего воздуха для защиты здоровья населения. Значения AQI на уровне 100 или ниже обычно считаются удовлетворительными. Когда значения AQI выше 100, качество воздуха нездоровое: сначала для определенных чувствительных групп людей, а затем для всех по мере повышения значений AQI.
Что значат эти цвета ?
- Зеленый "Отлично". Значения индекса: от 0 до 50. Качество воздуха удовлетворительное, а загрязнение воздуха практически не представляет опасности.
- Желтый "Умеренный". Значения индекса: от 51 до 100. Качество воздуха приемлемое. Тем не менее, может быть риск для некоторых людей, особенно для тех, кто необычайно чувствителен к загрязнению воздуха.
- Оранжевый "Нездорово для чувствительных групп". Значения индекса: от 101 до 150. 	Члены чувствительных групп могут испытывать последствия для здоровья. Широкая общественность меньше подвержена влиянию.
- Красный "Нездоровый". Значения индекса: от 151 до 200. 	Некоторые представители населения могут испытывать последствия для здоровья; члены чувствительных групп могут испытывать более серьезные последствия для здоровья.
- Пурпурный "Очень нездоровый". Значения индекса: от 201 до 300. 	Предупреждение о здоровье: риск воздействия на здоровье повышен для всех.
- Темно-бордовый "Опасный". Значения индекса: 301 и выше. 	Предупреждение о состоянии здоровья при чрезвычайных ситуациях: вероятность того, что пострадают все, выше.
`)}}  className={style.questionIconWrapper}><img src='./icons8-help.png' className={style.questionIcon} alt="icon"></img></span>
                                        </div>
                                </li>
                                <li className={style.wind}>
                                    <img src='./sunrise(1).svg' className={style.OtherInformationIcon} alt="icon"></img>
                                    Восход: {moment(props.searchResult.data.forecast.forecastday[0].astro.sunrise, "h:mm A").format("H:mm")}</li>
                                <li className={style.wind}>
                                    <img src='./sunset(3).svg' className={style.OtherInformationIcon} alt="icon"></img>
                                    Закат: {moment(props.searchResult.data.forecast.forecastday[0].astro.sunset, "h:mm A").format("H:mm")}</li>
                                <li className={style.wind}>
                                <img src='./daytime.png' className={style.OtherInformationIcon} alt="icon"></img>
                                Световой день: <span className={style.daylightHours}>{calcOfDaylightHours(props.searchResult.data.forecast.forecastday[0].astro.sunset, props.searchResult.data.forecast.forecastday[0].astro.sunrise)}</span></li>
                            </ul>


                            <ul className={style.countryInfo}>
                            <h4> Курс валют за {!isEmpty(props.exchangeRate) ?  props.exchangeRate.data.date : ''}</h4>
                                    <li className={style.countryInfoItems}><img src='./sack.png' className={style.OtherInformationIcon} alt="icon"></img>  Валюта страны:
                                    {
                                    Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][0]  ?
                                    ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][1]['name']}
                                      ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][1]['symbol']}`
                                    :
                                     `${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>
                                    <li className={style.countryInfoItems}><img src='./dollar.png' className={style.OtherInformationIcon} alt="icon"></img> USD:  {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.USD).toFixed(2) : "Нет данных"}
                                    {
                                        Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][0]  ?
                                        ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][1]['symbol']}`
                                        :
                                        `${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>
                                    <li className={style.countryInfoItems}><img src='./euro(1).png' className={style.OtherInformationIcon} alt="icon"></img> EUR: {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.EUR).toFixed(2) : "Нет данных"}
                                    {
                                            Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][0]  ?
                                            ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][1]['symbol']}`
                                            :
                                             `${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>

                                    <li className={style.countryInfoItems}><img src='./BTC.png' className={style.OtherInformationIcon} alt="icon"></img>
                                    
                                    BTC:  {!isEmpty(props.exchangeBTC) && props.exchangeBTC.result != null  ? (props.exchangeBTC.result).toFixed(3) : "Нет данных"}
                                    {
                                         Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][0]  ?
                                         ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][1]['symbol']}`
                                         :
                                          `${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>
                                    <li className={style.countryInfoItems}><img src='./ETH.png' className={style.OtherInformationIcon} alt="icon"></img>
                                    ETH:  {!isEmpty(props.exchangeETH) && props.exchangeETH.result != null ? (props.exchangeETH.result).toFixed(3) : "Нет данных"}
                                    {
                                    Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][0]  ?
                                    ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split('/')[1]).currencies)[0][1]['symbol']}
                                    `
                                    :
                                     `${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>
                                </ul>
                            </>
                }
            </main>
        )
    }

 

    if (!isEmpty(props.initialWeather.data)) {
        return (
            <main className={style.weatherContainer}>
                {
                    props.twoDaysWeather > 0 ?
                        props.initialWeather.data.forecast.forecastday.filter((el, i) => i === props.twoDaysWeather).map((elem, i) => {
                            return (
                                <>
                                    <button className={style.currentWeatherBtn} key={i = nanoid()} onClick={() => { props.setToggle(0) }}>Погода сейчас</button>
                                    <div className={style.mainInfoWrapper}>
                                    <h2 className={style.city} key={i = nanoid()}>{props.initialWeather.data.location.country} {props.initialWeather.data.location.name} {props.ipData.data.flag.emoji}</h2>
                                    <p className={style.city} key={i = nanoid()}>{props.initialWeather.data.location.tz_id}</p>
                                    <p className={style.city} key={i = nanoid()}>Ваш IP: {props.ipData.data.ip_address}</p>
                                    <h4 className={style.date} key={i = nanoid()}>{elem.date}, {daysOfTheWeek([moment().add(props.twoDaysWeather, 'days').days()])}</h4>
                                    <h1 className={ tempClassColor(props.initialWeather.data.current.temp_c)} 
                                    key={i = nanoid()}>
                                        {
                                        Math.floor(elem.day.mintemp_c) 
                                        > 0 ? 
                                        `+ ${Math.round(elem.day.mintemp_c)} ` 
                                        : 
                                        Math.round(elem.day.mintemp_c)}° 
                                        {" "}

                                        {Math.round(elem.day.maxtemp_c) > 0 
                                        ? 
                                         `+ ${Math.round(elem.day.maxtemp_c)}` 
                                        : Math.round(elem.day.maxtemp_c)
                                        
                                        }°
 
                                    <img src='./temperature-quarter.svg' className={style.OtherInformationIcon} alt="icon"></img></h1>
                                    <div className={style.flex} key={elem.day.condition.code}>
                                        <img src={elem.day.condition.icon} key={elem.day.condition.code} alt="Icon" className={style.icon} />
                                        <div className={style.description} key={elem.day.condition.code}>{elem.day.condition.text}</div>
                                    </div>
                                    </div>
                                    <ul className={style.OtherInformationForecast} key={i = nanoid()}>
                                        <li className={style.wind} key={i = nanoid()}>
                                            <img src='./tear.svg' className={style.OtherInformationIcon} alt="icon"></img>
                                            Влажность: {elem.day.avghumidity} %</li>
                                        <li className={style.wind} key={i = nanoid()}>
                                            <img src='./wind.svg' className={style.OtherInformationIcon} alt="icon"></img>
                                            Ветер: {elem.day.maxwind_kph} км/ч</li>
                                        <li className={style.wind} key={i = nanoid()}>
                                            <img src='./compress-arrows.svg' className={style.OtherInformationIcon} alt="icon"></img>
                                            Давление: {elem.day.avghumidity} мм рт. ст.</li>
                                        <li className={style.wind} key={i = nanoid()}>
                                            <img src='./icons8-uv-index.png' className={style.OtherInformationIcon} alt="icon"></img>
                                            УФ-индекс: 
                                            <span className={uvIndexClassColor(elem.day.uv)}>
                                        {" " + uvQualityDetector(elem.day.uv)}
                                            </span>
                                            <span onClick={() =>{alert(`ИНДЕКС УЛЬТРАФИОЛЕТОВОГО ИЗЛУЧЕНИЯ СОЛНЦА
С начала семидесятых годов прошлого века было замечено увеличение количества случаев заболевания раком кожи. Это было связано с индивидуальными привычками людей по отношению к пребыванию на Солнце. Считалось, что загорать - это, несомненно, приятно и полезно. Однако, это не так, и чрезмерное пребывание на солнце приводит к повреждению кожи и увеличению риска заболевания раком.

Все люди на планете подвержены воздействию ультрафиолетового излучения, исходящего от Солнца. Ультрафиолетовое излучение (УФ-излучение или УФ-радиация) соответствует диапазону электромагнитных волн с длинами 100-400 нанометров.

При каких значениях УФ-индекса существует опасность

УФ-индекс дает оценку величины УФ-излучения Солнца на поверхности Земли. Значения УФ-индекса варьируются от безопасного 0 до экстремального 11+.

0–2 Низкий
3–5 Умеренный
6–7 Высокий
8–10 Очень высокий
11+ Экстремальный

В средних широтах УФ-индекс приближается к небезопасным значениям (6–7) только при максимальной высоте Солнца над горизонтом (происходит в конце июня — начале июля). На экваторе в течение года УФ-индекс достигает 9…11+ баллов.
`)}}  className={style.questionIconWrapper}><img src='./icons8-help.png' className={style.questionIcon} alt="icon"></img></span>
                                        </li>
                                        <li className={style.wind} key={i = nanoid()}>
                                            <img src='./sunrise(1).svg' className={style.OtherInformationIcon} alt="icon"></img>
                                            Восход: { moment(elem.astro.sunrise, "h:mm A").format("H:mm")}</li>
                                        <li className={style.wind} key={i = nanoid()}>
                                            <img src='./sunset(3).svg' className={style.OtherInformationIcon} alt="icon"></img>
                                            Закат: {moment(elem.astro.sunset, "h:mm A").format("H:mm")}</li>
                                            <li className={style.wind}>
                                <img src='./daytime.png' className={style.OtherInformationIcon} alt="icon"></img>
                                Световой день: <span className={style.daylightHours}>{calcOfDaylightHours(elem.astro.sunset, elem.astro.sunrise)}</span></li>
                                    </ul>

                                    <ul className={style.countryInfo}>
                                    <h4> Курс валют за {!isEmpty(props.exchangeRate) ?  props.exchangeRate.data.date : ''}</h4>
                                    <li className={style.countryInfoItems}><img src='./sack.png' className={style.OtherInformationIcon} alt="icon"></img>  Валюта страны: 
                                    {
                                    CountryQuery.findByNameCommon(props.initialWeather.data.location.country)  ?
                                    ` ${dynamicallyObjkeyDetect(CountryQuery.findByNameCommon(props.initialWeather.data.location.country).currencies, 'name')},   
                                      ${dynamicallyObjkeyDetect(CountryQuery.findByNameCommon(props.initialWeather.data.location.country).currencies, 'symbol')}
                                    `
                                    :
                                    ` ${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>
                                    <li className={style.countryInfoItems}><img src='./dollar.png' className={style.OtherInformationIcon} alt="icon"></img> USD:  {!isEmpty(props.exchangeRate) ? ((1 / props.exchangeRate.data.rates.USD)).toFixed(2) : "Нет данных"}
                                    {
                                    CountryQuery.findByNameCommon(props.initialWeather.data.location.country)  ?
                                    ` ${dynamicallyObjkeyDetect(CountryQuery.findByNameCommon(props.initialWeather.data.location.country).currencies, 'symbol')}`
                                    :
                                    ` ${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>
                                    <li className={style.countryInfoItems}><img src='./euro(1).png' className={style.OtherInformationIcon} alt="icon"></img> EUR: {!isEmpty(props.exchangeRate) ? ((1 / props.exchangeRate.data.rates.EUR) * 1).toFixed(2) : "Нет данных"}
                                    {
                                    CountryQuery.findByNameCommon(props.initialWeather.data.location.country)  ?
                                    ` ${dynamicallyObjkeyDetect(CountryQuery.findByNameCommon(props.initialWeather.data.location.country).currencies, 'symbol')}`
                                    :
                                    ` ${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>
                                    {/* <li className={style.countryInfoItems}><img src='./BTC.png' className={style.OtherInformationIcon} alt="icon"></img>BTC:  {!isEmpty(props.cryptoRate) ? ((1 / props.cryptoRate.rates.BTC) * 1).toFixed(2) : "Нет данных"}</li>
                                    <li className={style.countryInfoItems}><img src='./ETH.png' className={style.OtherInformationIcon} alt="icon"></img>ETH:  {!isEmpty(props.cryptoRate) ? ((1 / props.cryptoRate.rates.ETH) * 1).toFixed(4) : "Нет данных"}</li> */}
                                    <li className={style.countryInfoItems}><img src='./BTC.png' className={style.OtherInformationIcon} alt="icon"></img>BTC:  {!isEmpty(props.exchangeBTC) ? (props.exchangeBTC.result).toFixed(3) : "Нет данных"}
                                    {
                                    CountryQuery.findByNameCommon(props.initialWeather.data.location.country)  ?
                                    ` ${dynamicallyObjkeyDetect(CountryQuery.findByNameCommon(props.initialWeather.data.location.country).currencies, 'symbol')}`
                                    :
                                    ` ${props.ipData.data.currency.currency_name}`
                                    }                                    
                                    </li>
                                    <li className={style.countryInfoItems}><img src='./ETH.png' className={style.OtherInformationIcon} alt="icon"></img>ETH:  {!isEmpty(props.exchangeETH) ? (props.exchangeETH.result).toFixed(3) : "Нет данных"}
                                    {
                                    CountryQuery.findByNameCommon(props.initialWeather.data.location.country)  ?
                                    ` ${dynamicallyObjkeyDetect(CountryQuery.findByNameCommon(props.initialWeather.data.location.country).currencies, 'symbol')}`
                                    :
                                    ` ${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>
                                </ul>
                                </>
                            )
                        })
                        :
                        <>
                            <div className={style.mainInfoWrapper}>
                            <h3 className={style.city}>{props.initialWeather.data.location.country} {props.initialWeather.data.location.name} {props.ipData.data.flag.emoji}</h3>
                            <p className={style.city}>{props.initialWeather.data.location.tz_id}</p>
                            <p className={style.city}>Ваш IP: {props.ipData.data.ip_address}</p>
                            <p className={style.date}>{props.initialWeather.data.location.localtime}, {daysOfTheWeek([n])}</p>
                            <span>Сейчас</span>
                            <h4 className={tempClassColor(props.initialWeather.data.current.temp_c)}>
                                {Math.floor(props.initialWeather.data.current.temp_c) > 0 ? 
                                 ` +  ${Math.round(props.initialWeather.data.current.temp_c)}` : `${Math.round(props.initialWeather.data.current.temp_c)}`
                                }°
                                <img src='./temperature-quarter.svg' className={style.OtherInformationIcon} alt="icon"></img></h4>
                            <h5 className={style.feelsLike}>Ощущается как: {Math.floor(props.initialWeather.data.current.feelslike_c) > 0 ? 
                            "+" + Math.round(props.initialWeather.data.current.feelslike_c) : Math.round(props.initialWeather.data.current.feelslike_c)}°</h5>
                            <div className={style.flex}>
                                <img src={props.initialWeather.data.current.condition.icon} alt="Icon" className={style.icon} />
                                <div className={style.description}>{props.initialWeather.data.current.condition.text}</div>
                            </div>
                            </div>
                            <ul className={style.OtherInformation}>
                                <li className={style.humidity}>
                                    <img src='./tear.svg' className={style.OtherInformationIcon} alt="icon"></img>
                                    Влажность: {props.initialWeather.data.current.humidity} %</li>
                                <li className={style.wind}>
                                    <img src='./wind.svg' className={style.OtherInformationIcon} alt="icon"></img>
                                    Ветер: {props.initialWeather.data.current.wind_kph} км/ч</li>
                                <li className={style.wind}>
                                    <img src='./compress-arrows.svg' className={style.OtherInformationIcon} alt="icon"></img>
                                    Давление: {props.initialWeather.data.current.pressure_mb} мм рт. ст.</li>
                                <li className={style.wind}>
                                    <img src='./icons8-uv-index.png' className={style.OtherInformationIcon} alt="icon"></img>
                                    УФ-индекс:
                                    <span className={uvIndexClassColor(props.initialWeather.data.current.uv)}>
                                        {" " + uvQualityDetector(props.initialWeather.data.current.uv)}
                                    </span>
                                    <span onClick={() =>{alert(`ИНДЕКС УЛЬТРАФИОЛЕТОВОГО ИЗЛУЧЕНИЯ СОЛНЦА
С начала семидесятых годов прошлого века было замечено увеличение количества случаев заболевания раком кожи. Это было связано с индивидуальными привычками людей по отношению к пребыванию на Солнце. Считалось, что загорать - это, несомненно, приятно и полезно. Однако, это не так, и чрезмерное пребывание на солнце приводит к повреждению кожи и увеличению риска заболевания раком.

Все люди на планете подвержены воздействию ультрафиолетового излучения, исходящего от Солнца. Ультрафиолетовое излучение (УФ-излучение или УФ-радиация) соответствует диапазону электромагнитных волн с длинами 100-400 нанометров.

При каких значениях УФ-индекса существует опасность

УФ-индекс дает оценку величины УФ-излучения Солнца на поверхности Земли. Значения УФ-индекса варьируются от безопасного 0 до экстремального 11+.

0–2 Низкий
3–5 Умеренный
6–7 Высокий
8–10 Очень высокий
11+ Экстремальный

В средних широтах УФ-индекс приближается к небезопасным значениям (6–7) только при максимальной высоте Солнца над горизонтом (происходит в конце июня — начале июля). На экваторе в течение года УФ-индекс достигает 9…11+ баллов.
`)}}  className={style.questionIconWrapper}><img src='./icons8-help.png' className={style.questionIcon} alt="icon"></img></span>
                                </li>
                                <div className={style.airQuality}>
                                    <span className={style.airQualityTitle}>
                                        <img src='./airQuality.png' className={style.OtherInformationIcon} alt="icon"></img>
                                        Качество воздуха:</span>
                                    <div className={airQualityClassColor(props.initialWeather.data.current.air_quality["us-epa-index"])}>
                                    {airQualityDetector(props.initialWeather.data.current.air_quality["us-epa-index"])}
                                    <span onClick={() =>{alert(`Как работает AQI ? 
Думайте об AQI как о шкале, которая варьируется от 0 до 500. Чем выше значение AQI, тем больше уровень загрязнения воздуха и тем больше опасений для здоровья. Например, значение AQI 50 или ниже указывает на хорошее качество воздуха, а значение AQI выше 300 указывает на опасное качество воздуха. Для каждого загрязнителя значение AQI, равное 100, обычно соответствует концентрации в окружающем воздухе, равной уровню краткосрочного национального качества окружающего воздуха для защиты здоровья населения. Значения AQI на уровне 100 или ниже обычно считаются удовлетворительными. Когда значения AQI выше 100, качество воздуха нездоровое: сначала для определенных чувствительных групп людей, а затем для всех по мере повышения значений AQI.
Что значат эти цвета ?
- Зеленый "Отлично". Значения индекса: от 0 до 50. Качество воздуха удовлетворительное, а загрязнение воздуха практически не представляет опасности.
- Желтый "Умеренный". Значения индекса: от 51 до 100. Качество воздуха приемлемое. Тем не менее, может быть риск для некоторых людей, особенно для тех, кто необычайно чувствителен к загрязнению воздуха.
- Оранжевый "Нездорово для чувствительных групп". Значения индекса: от 101 до 150. 	Члены чувствительных групп могут испытывать последствия для здоровья. Широкая общественность меньше подвержена влиянию.
- Красный "Нездоровый". Значения индекса: от 151 до 200. 	Некоторые представители населения могут испытывать последствия для здоровья; члены чувствительных групп могут испытывать более серьезные последствия для здоровья.
- Пурпурный "Очень нездоровый". Значения индекса: от 201 до 300. 	Предупреждение о здоровье: риск воздействия на здоровье повышен для всех.
- Темно-бордовый "Опасный". Значения индекса: 301 и выше. 	Предупреждение о состоянии здоровья при чрезвычайных ситуациях: вероятность того, что пострадают все, выше.
`)}}  className={style.questionIconWrapper}><img src='./icons8-help.png' className={style.questionIcon} alt="icon"></img></span>
                                    </div>
                                </div>
                                <li className={style.wind}>
                                    <img src='./sunrise(1).svg' className={style.OtherInformationIcon} alt="icon"></img>
                                    Восход: {moment(props.initialWeather.data.forecast.forecastday[0].astro.sunrise, "h:mm A").format("H:mm")}</li>
                                <li className={style.wind}>
                                    <img src='./sunset(3).svg' className={style.OtherInformationIcon} alt="icon"></img>
                                    Закат: {moment(props.initialWeather.data.forecast.forecastday[0].astro.sunset, "h:mm A").format("H:mm")}</li>
                                <li className={style.wind}>
                                <img src='./daytime.png' className={style.OtherInformationIcon} alt="icon"></img>
                                Световой день: <span className={style.daylightHours}>{calcOfDaylightHours(props.initialWeather.data.forecast.forecastday[0].astro.sunset, props.initialWeather.data.forecast.forecastday[0].astro.sunrise)}</span></li>
                            </ul>
                            
                                <ul className={style.countryInfo}>
                                    <h4> Курс валют за {!isEmpty(props.exchangeRate) ?  props.exchangeRate.data.date : ''}</h4>

                                    <li className={style.countryInfoItems}><img src='./sack.png' className={style.OtherInformationIcon} alt="icon"></img>  Валюта страны: 
                                    {
                                    CountryQuery.findByNameCommon(props.initialWeather.data.location.country)  ?
                                    ` ${dynamicallyObjkeyDetect(CountryQuery.findByNameCommon(props.initialWeather.data.location.country).currencies, 'name')},   
                                      ${dynamicallyObjkeyDetect(CountryQuery.findByNameCommon(props.initialWeather.data.location.country).currencies, 'symbol')}`
                                    :
                                    ` ${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>
                                    <li className={style.countryInfoItems}><img src='./dollar.png' className={style.OtherInformationIcon} alt="icon"></img> USD:  {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.USD).toFixed(2) : "Нет данных"}
                                    {
                                    CountryQuery.findByNameCommon(props.initialWeather.data.location.country)  ?
                                    ` ${dynamicallyObjkeyDetect(CountryQuery.findByNameCommon(props.initialWeather.data.location.country).currencies, 'symbol')}`
                                    :
                                    ` ${props.ipData.data.currency.currency_name}`
                                    }
                                     </li>
                                    <li className={style.countryInfoItems}><img src='./euro(1).png' className={style.OtherInformationIcon} alt="icon"></img> EUR: {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.EUR).toFixed(2) : "Нет данных"}
                                    {
                                    CountryQuery.findByNameCommon(props.initialWeather.data.location.country)  ?
                                    ` ${dynamicallyObjkeyDetect(CountryQuery.findByNameCommon(props.initialWeather.data.location.country).currencies, 'symbol')}`
                                    :
                                    ` ${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>
                                    {/* <li className={style.countryInfoItems}><img src='./BTC.png' className={style.OtherInformationIcon} alt="icon"></img>BTC:  {!isEmpty(props.cryptoRate) ? props.cryptoRate.rates.BTC  : "Нет данных"}</li> */}
                                    <li className={style.countryInfoItems}><img src='./BTC.png' className={style.OtherInformationIcon} alt="icon"></img>BTC:  {!isEmpty(props.exchangeBTC) ? (props.exchangeBTC.result).toFixed(3) : "Нет данных"}
                                    {
                                    CountryQuery.findByNameCommon(props.initialWeather.data.location.country)  ?
                                    ` ${dynamicallyObjkeyDetect(CountryQuery.findByNameCommon(props.initialWeather.data.location.country).currencies, 'symbol')}`
                                    :
                                    ` ${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>
                                    <li className={style.countryInfoItems}><img src='./ETH.png' className={style.OtherInformationIcon} alt="icon"></img>ETH:  {!isEmpty(props.exchangeETH) ? (props.exchangeETH.result).toFixed(3) : "Нет данных"}
                                    {
                                    CountryQuery.findByNameCommon(props.initialWeather.data.location.country)  ?
                                    ` ${dynamicallyObjkeyDetect(CountryQuery.findByNameCommon(props.initialWeather.data.location.country).currencies, 'symbol')}`
                                    :
                                    ` ${props.ipData.data.currency.currency_name}`
                                    }
                                    </li>
                                    
                                </ul>
                        </>
                }
            </main>
        )
    }

}

export default Weather