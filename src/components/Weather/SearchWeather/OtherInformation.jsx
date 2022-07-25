import React from "react";
import style from "../Weather.module.css";
import { isEmpty } from "../../utilities/utilities";
import moment from "moment";

function OtherInformation(props) {
  if (!isEmpty(props.elem)) {
    return (
      <ul className={style.OtherInformationForecast}>
        <li className={style.humidity}>
          <img src='./icons/OtherInformationIcons/tear.svg' className={style.OtherInformationIcon} alt='icon'></img>
          Влажность: {props.elem.day.avghumidity} %
        </li>
        <li className={style.wind}>
          <img src='./icons/OtherInformationIcons/wind.svg' className={style.OtherInformationIcon} alt='icon'></img>
          Ветер: {props.elem.day.maxwind_kph} км/ч
        </li>
        <li className={style.wind}>
          <img src='./icons/OtherInformationIcons/compress-arrows.svg' className={style.OtherInformationIcon} alt='icon'></img>
          Давление: {props.elem.day.totalprecip_mm} мм рт. ст.
        </li>
        <li className={style.wind}>
          <img src='./icons/OtherInformationIcons/icons8-uv-index.png' className={style.OtherInformationIcon} alt='icon'></img>
          УФ-индекс:
          <span className={props.uvIndexClassColor(props.elem.day.uv)}>
            &nbsp;&nbsp;
            <label htmlFor='progress-bar'>{props.uvQualityDetector(props.elem.day.uv)}</label>
            &nbsp;&nbsp;
            <progress className={style.uvProgressBar} value={props.elem.day.uv} max={11}></progress>
          </span>
          <span
            onClick={() => {
              alert(`ИНДЕКС УЛЬТРАФИОЛЕТОВОГО ИЗЛУЧЕНИЯ СОЛНЦА
  УФ-индекс дает оценку величины УФ-излучения Солнца на поверхности Земли. Значения УФ-индекса варьируются от безопасного 0 до экстремального 11+.
  
  0–2 Низкий
  3–5 Умеренный
  6–7 Высокий
  8–10 Очень высокий
  11+ Экстремальный
`);
            }}
            className={style.questionIconWrapper}>
            <img src='./icons/OtherInformationIcons/icons8-help.png' className={style.questionIcon} alt='icon'></img>
          </span>
        </li>
        <li className={style.wind}>
          <img src='./icons/OtherInformationIcons/sunrise(1).svg' className={style.OtherInformationIcon} alt='icon'></img>
          Восход: {moment(props.elem.astro.sunrise, "h:mm A").format("H:mm")}
        </li>
        <li className={style.wind}>
          <img src='./icons/OtherInformationIcons/sunset(3).svg' className={style.OtherInformationIcon} alt='icon'></img>
          Закат: {moment(props.elem.astro.sunset, "h:mm A").format("H:mm")}
        </li>
        <div className={style.wind}>
          <img src='./icons/OtherInformationIcons/daytime.png' className={style.OtherInformationIcon} alt='icon'></img>
          Световой день: <span className={style.daylightHours}>{props.calcOfDaylightHours(props.elem.astro.sunset, props.elem.astro.sunrise)}</span>
        </div>
      </ul>
    );
  }

  if (!isEmpty(props.searchResult)) {
    return (
      <ul className={style.OtherInformation}>
        <li className={style.humidity}>
          <img src='./icons/OtherInformationIcons/tear.svg' className={style.OtherInformationIcon} alt='icon'></img>
          Влажность: {props.searchResult.data.current.humidity} %
        </li>
        <li className={style.wind}>
          <img src='./icons/OtherInformationIcons/wind.svg' className={style.OtherInformationIcon} alt='icon'></img>
          Ветер: {props.searchResult.data.current.wind_kph} км/ч
        </li>
        <li className={style.wind}>
          <img src='./icons/OtherInformationIcons/compress-arrows.svg' className={style.OtherInformationIcon} alt='icon'></img>
          Давление: {props.searchResult.data.current.pressure_mb} мм рт. ст.
        </li>
        <li className={style.wind}>
          <img src='./icons/OtherInformationIcons/icons8-uv-index.png' className={style.OtherInformationIcon} alt='icon'></img>
          УФ-индекс:
          <span className={props.uvIndexClassColor(props.searchResult.data.current.uv)}>
            &nbsp;&nbsp;
            <label htmlFor='progress-bar'>{props.uvQualityDetector(props.searchResult.data.current.uv)}</label>
            &nbsp;&nbsp;
            <progress className={style.uvProgressBar} value={props.searchResult.data.current.uv} max={11}></progress>
          </span>
          <span
            onClick={() => {
              alert(`ИНДЕКС УЛЬТРАФИОЛЕТОВОГО ИЗЛУЧЕНИЯ СОЛНЦА
  УФ-индекс дает оценку величины УФ-излучения Солнца на поверхности Земли. Значения УФ-индекса варьируются от безопасного 0 до экстремального 11+.
  
  0–2 Низкий
  3–5 Умеренный
  6–7 Высокий
  8–10 Очень высокий
  11+ Экстремальный
`);
            }}
            className={style.questionIconWrapper}>
            <img src='./icons/OtherInformationIcons/icons8-help.png' className={style.questionIcon} alt='icon'></img>
          </span>
        </li>
        <li className={style.airQuality}>
          <span className={style.airQualityTitle}>
            <img src='./icons/OtherInformationIcons/airQuality.png' className={style.OtherInformationIcon} alt='icon'></img>
            Качество воздуха:{" "}
          </span>
          <div className={props.airQualityClassColor(props.searchResult.data.current.air_quality["us-epa-index"])}>
            {
              <span>
                <label htmlFor='progress-bar'>{props.airQualityDetector(props.searchResult.data.current.air_quality["us-epa-index"])}</label>
                &nbsp;&nbsp;
                <progress className={style.uvProgressBar} value={props.searchResult.data.current.air_quality["us-epa-index"]} max={5}></progress>
              </span>
            }
            <span
              onClick={() => {
                alert(`Как работает AQI ? 
  Что значат эти цвета ?
  - Зеленый "Отлично". Значения индекса: от 0 до 50. Качество воздуха удовлетворительное, а загрязнение воздуха практически не представляет опасности.
  - Желтый "Умеренный". Значения индекса: от 51 до 100. Качество воздуха приемлемое. Тем не менее, может быть риск для некоторых людей, особенно для тех, кто необычайно чувствителен к загрязнению воздуха.
  - Оранжевый "Нездорово для чувствительных групп". Значения индекса: от 101 до 150. 	Члены чувствительных групп могут испытывать последствия для здоровья. Широкая общественность меньше подвержена влиянию.
  - Красный "Нездоровый". Значения индекса: от 151 до 200. 	Некоторые представители населения могут испытывать последствия для здоровья; члены чувствительных групп могут испытывать более серьезные последствия для здоровья.
  - Пурпурный "Очень нездоровый". Значения индекса: от 201 до 300. 	Предупреждение о здоровье: риск воздействия на здоровье повышен для всех.
  - Темно-бордовый "Опасный". Значения индекса: 301 и выше. 	Предупреждение о состоянии здоровья при чрезвычайных ситуациях: вероятность того, что пострадают все, выше.
`);
              }}
              className={style.questionIconWrapper}>
              <img src='./icons/OtherInformationIcons/icons8-help.png' className={style.questionIcon} alt='icon'></img>
            </span>
          </div>
        </li>
        <li className={style.wind}>
          <img src='./icons/OtherInformationIcons/sunrise(1).svg' className={style.OtherInformationIcon} alt='icon'></img>
          Восход: {moment(props.searchResult.data.forecast.forecastday[0].astro.sunrise, "h:mm A").format("H:mm")}
        </li>
        <li className={style.wind}>
          <img src='./icons/OtherInformationIcons/sunset(3).svg' className={style.OtherInformationIcon} alt='icon'></img>
          Закат: {moment(props.searchResult.data.forecast.forecastday[0].astro.sunset, "h:mm A").format("H:mm")}
        </li>
        <li className={style.wind}>
          <img src='./icons/OtherInformationIcons/daytime.png' className={style.OtherInformationIcon} alt='icon'></img>
          Световой день:{" "}
          <span className={style.daylightHours}>
            {props.calcOfDaylightHours(
              props.searchResult.data.forecast.forecastday[0].astro.sunset,
              props.searchResult.data.forecast.forecastday[0].astro.sunrise
            )}
          </span>
        </li>
      </ul>
    );
  }
}

export default OtherInformation;
