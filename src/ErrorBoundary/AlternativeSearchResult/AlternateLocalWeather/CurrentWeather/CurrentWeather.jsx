import React from "react";
import style from "../../AlternativeSearchResult.module.css";
import OtherInformation from "../OtherInformation";
import CountryQuery from "country-query";

function CurrentWeather(props) {
  const d = new Date();
  const n = d.getDay();

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

  return (
    <>
      <div className={style.mainInfoWrapper}>
        <h3 className={style.city}>
          {props.initialWeather.data.location.country} {props.initialWeather.data.location.name} {props.flag}
        </h3>
        <p className={style.city}>{props.initialWeather.data.location.tz_id}</p>
        <p className={style.ipAddr}>
          {" "}
          <img src='./ip-address.png' className={style.OtherInformationIconIp} alt='icon'></img> {props.ipAddr}
        </p>
        <p className={style.date}>
          {props.initialWeather.data.location.localtime}, {props.daysOfTheWeek([n])}
        </p>
        <div className={style.weatherNow}>
          <span>Сейчас</span>
          <h4 className={props.tempClassColor(props.initialWeather.data.current.temp_c)}>
            {Math.floor(props.initialWeather.data.current.temp_c) > 0
              ? ` +  ${Math.round(props.initialWeather.data.current.temp_c)}`
              : `${Math.round(props.initialWeather.data.current.temp_c)}`}
            °<img src='./temperature-quarter.svg' className={style.OtherInformationIcon} alt='icon'></img>
          </h4>
          <h5 className={style.feelsLike}>
            Ощущается как:{" "}
            {Math.floor(props.initialWeather.data.current.feelslike_c) > 0
              ? "+" + Math.round(props.initialWeather.data.current.feelslike_c)
              : Math.round(props.initialWeather.data.current.feelslike_c)}
            °
          </h5>
          <div className={style.flex}>
            <img src={props.initialWeather.data.current.condition.icon} alt='Icon' className={style.icon} />
            <div className={style.description}>{props.initialWeather.data.current.condition.text}</div>
          </div>
        </div>
      </div>

      <OtherInformation
        initialWeather={props.initialWeather}
        ipData={props.ipData}
        uvIndexClassColor={props.uvIndexClassColor}
        uvQualityDetector={props.uvQualityDetector}
        airQualityClassColor={props.airQualityClassColor}
        airQualityDetector={props.airQualityDetector}
        calcOfDaylightHours={props.calcOfDaylightHours}
      />
    </>
  );
}

export default CurrentWeather;
