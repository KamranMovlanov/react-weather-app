import React from "react";
import OtherInformation from "../OtherInformation";
import style from "../../Weather.module.css";
import { daysOfTheWeek } from "../../../utilities/utilities";
import moment from "moment";
import CountryQuery from "country-query";

function SearchCurrentWeather(props) {
  moment.locale("ru");
  const d = new Date();
  const n = d.getDay();
  console.log("native lang:", CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]));
  return (
    <>
      <button
        className={style.currentWeatherBtn}
        onClick={() => {
          props.setSearchWeatherData({});
        }}>
        На главную
      </button>
      <h2 className={style.city}>
        {props.searchResult.data.location.country} {props.searchResult.data.location.name}
        {Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] !== null
          ? ` ${CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1])["flag"]}`
          : ""}
      </h2>
      <p>
        {/* Native language city name */}
        {Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0]
          ? Object.keys(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1])["name"]["native"]).length > 1
            ? Object.values(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1])["name"]["native"])[0]["official"]
            : CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1])["name"]["native"][
                Object.keys(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1])["name"]["native"])
              ]["official"]
          : ""}
      </p>

      {/* <p className={style.city}>{props.searchResult.data.location.tz_id}</p> */}
      <h4 className={style.date}>
        {props.searchResult.data.location.localtime}, {daysOfTheWeek([n])}
      </h4>
      <span>Сейчас</span>
      <h1 className={props.tempClassColor(props.searchResult.data.current.temp_c)}>
        {Math.floor(props.searchResult.data.current.temp_c) > 0
          ? `+ ${Math.round(props.searchResult.data.current.temp_c)}`
          : `${Math.round(props.searchResult.data.current.temp_c)}`}
        °<img src='./temperature-quarter.svg' className={style.OtherInformationIcon} alt='icon'></img>
      </h1>
      <h5 className={style.feelsLike}>
        Ощущается как:{" "}
        {Math.floor(props.searchResult.data.current.feelslike_c) > 0
          ? "+" + Math.round(props.searchResult.data.current.feelslike_c)
          : Math.round(props.searchResult.data.current.feelslike_c)}
        °
      </h5>

      <div className={style.flex}>
        <img src={props.searchResult.data.current.condition.icon} alt='Icon' className={style.icon} />
        <div className={style.description}>{props.searchResult.data.current.condition.text}</div>
      </div>

      <OtherInformation
        searchResult={props.searchResult}
        uvIndexClassColor={props.uvIndexClassColor}
        uvQualityDetector={props.uvQualityDetector}
        airQualityClassColor={props.airQualityClassColor}
        airQualityDetector={props.airQualityDetector}
        calcOfDaylightHours={props.calcOfDaylightHours}
      />
    </>
  );
}

export default SearchCurrentWeather;
