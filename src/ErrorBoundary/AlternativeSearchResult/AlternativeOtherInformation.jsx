import React from "react";
import style from "./AlternativeSearchResult.module.css";
import { calcOfDaylightHours, uvQualityDetector, airQualityDetector } from "../../components/utilities/utilities";
import moment from "moment";

const airQualityClassColor = (param) => {
  switch (param) {
    case 1:
      return style.airMin;
    case 2:
      return style.airAverage;
    case 3:
      return style.airHight;
    case 4:
      return style.airVeryHight;
    case 5:
      return style.airExtreme;
    case 6:
      return style.airDanger;

    default:
      return "";
  }
};

const uvIndexClassColor = (param) => {
  if (param >= 0 && param <= 2) {
    return style.uvMin;
  }
  if (param >= 3 && param <= 5) {
    return style.uvAverage;
  }
  if (param >= 6 && param <= 7) {
    return style.uvHight;
  }
  if (param >= 8 && param <= 10) {
    return style.uvVeryHight;
  }
  if (param > 10) {
    return style.uvExtreme;
  }
};

function AlternativeOtherInformation(props) {
  return (
    <ul className={style.OtherInformation}>
      <li className={style.humidity}>
        <img src='./icons/OtherInformationIcons/tear.svg' className={style.OtherInformationIcon} alt='icon'></img>
        Влажность: {props.searchResult.data.current.humidity} %
      </li>
      <li className={style.wind}>
        <img src='./wind.svg' className={style.OtherInformationIcon} alt='icon'></img>
        Ветер: {props.searchResult.data.current.wind_kph} км/ч
      </li>
      <li className={style.wind}>
        <img src='./icons/OtherInformationIcons/compress-arrows.svg' className={style.OtherInformationIcon} alt='icon'></img>
        Давление: {props.searchResult.data.current.pressure_mb} мм рт. ст.
      </li>
      <li className={style.wind}>
        <img src='./icons/OtherInformationIcons/icons8-uv-index.png' className={style.OtherInformationIcon} alt='icon'></img>
        УФ-индекс:
        <span className={`${uvIndexClassColor(props.searchResult.data.current.uv)}`}>
          &nbsp;&nbsp;
          <label htmlFor='progress-bar'>{uvQualityDetector(props.searchResult.data.current.uv)}</label>
          &nbsp;&nbsp;
          <progress className={style.uvProgressBar} value={props.searchResult.data.current.uv} max={11}></progress>
          {/* {" " + uvQualityDetector(props.searchResult.data.current.uv)} */}
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

В средних широтах УФ-индекс приближается к небезопасным значениям (6–7) только при максимальной высоте Солнца над горизонтом (происходит в конце июня — начале июля). На экваторе в течение года УФ-индекс достигает 9…11+ баллов.
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
        <div className={`${airQualityClassColor(props.searchResult.data.current.air_quality["us-epa-index"])}`}>
          {
            <span>
              <label htmlFor='progress-bar'>{airQualityDetector(props.searchResult.data.current.air_quality["us-epa-index"])}</label>
              &nbsp;&nbsp;
              <progress className={style.uvProgressBar} value={props.searchResult.data.current.air_quality["us-epa-index"]} max={5}></progress>
            </span>
          }

          {/* {airQualityDetector(
                    props.searchResult.data.current.air_quality["us-epa-index"]
                  )} */}
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
          {calcOfDaylightHours(
            props.searchResult.data.forecast.forecastday[0].astro.sunset,
            props.searchResult.data.forecast.forecastday[0].astro.sunrise
          )}
        </span>
      </li>
    </ul>
  );
}

export default AlternativeOtherInformation;
