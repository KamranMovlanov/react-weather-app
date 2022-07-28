import moment from "moment";
import React from "react";
import style from "../../Weather.module.css";
import OtherInformation from "../OtherInformation";
import { daysOfTheWeek } from "../../../utilities/utilities";
const CountryQuery = require("country-query");

function NextDaysWeather(props) {
  return (
    <>
      <button
        className={style.currentWeatherBtn}
        key={props.i}
        alt='back'
        onClick={() => {
          props.setToggle(0);
        }}>
        Погода сейчас
      </button>

      <div className={style.mainInfoWrapper}>
        <h2 className={style.city} key={props.i}>
          {props.initialWeather.data.location.country} {props.initialWeather.data.location.name} {props.ipData.data.flag.emoji}
        </h2>
        <p>
          {Object.entries(CountryQuery.find("capital", props.initialWeather.data.location.tz_id.split("/")[1]).currencies)[0][0]
            ? Object.keys(CountryQuery.find("capital", props.initialWeather.data.location.tz_id.split("/")[1])["name"]["native"]).length > 1
              ? Object.values(CountryQuery.find("capital", props.initialWeather.data.location.tz_id.split("/")[1])["name"]["native"])[0]["official"]
              : CountryQuery.find("capital", props.initialWeather.data.location.tz_id.split("/")[1])["name"]["native"][
                  Object.keys(CountryQuery.find("capital", props.initialWeather.data.location.tz_id.split("/")[1])["name"]["native"])
                ]["official"]
            : ""}
        </p>
        {/* <p className={style.city} key={props.i}>
          {props.initialWeather.data.location.tz_id}
        </p> */}
        <p className={style.ipAddr} key={props.i}>
          Ваш IP: {props.ipData.data.ip_address}
        </p>
        <h4 className={style.date} key={props.i}>
          {props.elem.date}, {daysOfTheWeek([moment().add(props.twoDaysWeather, "days").days()])}
        </h4>
        <h1 className={props.tempClassColor(props.initialWeather.data.current.temp_c)} key={props.i}>
          {Math.floor(props.elem.day.mintemp_c) > 0 ? `+ ${Math.round(props.elem.day.mintemp_c)} ` : Math.round(props.elem.day.mintemp_c)}°{" "}
          {Math.round(props.elem.day.maxtemp_c) > 0 ? `+ ${Math.round(props.elem.day.maxtemp_c)}` : Math.round(props.elem.day.maxtemp_c)}°
          <img src='./temperature-quarter.svg' className={style.OtherInformationIcon} alt='icon'></img>
        </h1>
        <div className={style.flex} key={props.elem.day.condition.code}>
          <img src={props.elem.day.condition.icon} key={props.elem.day.condition.code} alt='Icon' className={style.icon} />
          <div className={style.description} key={props.elem.day.condition.code}>
            {props.elem.day.condition.text}
          </div>
        </div>
      </div>

      <OtherInformation
        currentWeatherGeneral={props.initialWeather}
        ipData={props.ipData}
        i={props.i}
        elem={props.elem}
        twoDaysWeather={props.twoDaysWeather}
        uvIndexClassColor={props.uvIndexClassColor}
        uvQualityDetector={props.uvQualityDetector}
        airQualityClassColor={props.airQualityClassColor}
        airQualityDetector={props.airQualityDetector}
        calcOfDaylightHours={props.calcOfDaylightHours}
      />
    </>
  );
}

export default NextDaysWeather;
