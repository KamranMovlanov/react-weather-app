import React from "react";
import style from "../../Weather.module.css";
import moment from "moment";
import { daysOfTheWeek } from "../../../utilities/utilities";
import OtherInformation from "../OtherInformation";
const CountryQuery = require("country-query");

function SearchNextDaysWeather(props) {
  return (
    <>
      <button
        className={style.currentWeatherBtn}
        onClick={() => {
          props.setToggle(0);
        }}>
        Погода сейчас
      </button>
      <h2 className={style.city}>
        {props.searchResult.data.location.country} {props.searchResult.data.location.name}
        {Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0]
          ? ` ${CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1])["flag"]}`
          : ""}
      </h2>
      <p>
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
        {props.elem.date} {daysOfTheWeek([moment().add(props.twoDaysWeather, "days").days()])}
      </h4>

      <h2 className={props.tempClassColor(props.elem.day.avgtemp_c)}>
        {Math.floor(props.elem.day.mintemp_c) > 0 ? `+ ${Math.round(props.elem.day.mintemp_c)}` : `${Math.round(props.elem.day.mintemp_c)}`}°{" "}
        {Math.floor(props.elem.day.maxtemp_c) > 0 ? `+ ${Math.round(props.elem.day.maxtemp_c)}` : `${Math.round(props.elem.day.maxtemp_c)}`}°
        <img src='./temperature-quarter.svg' className={style.OtherInformationIcon} alt='icon'></img>
      </h2>
      <div className={style.flex}>
        <img src={props.elem.day.condition.icon} alt='Icon' className={style.icon} />
        <div className={style.description}>{props.elem.day.condition.text}</div>
      </div>

      <OtherInformation
        elem={props.elem}
        searchResult={props.searchResult}
        tempClassColor={props.tempClassColor}
        uvIndexClassColor={props.uvIndexClassColor}
        uvQualityDetector={props.uvQualityDetector}
        calcOfDaylightHours={props.calcOfDaylightHours}
      />
    </>
  );
}

export default SearchNextDaysWeather;
