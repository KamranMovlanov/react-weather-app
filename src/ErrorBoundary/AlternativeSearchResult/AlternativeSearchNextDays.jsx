import React from "react";
import style from "./AlternativeSearchResult.module.css";
import CountryQuery from "country-query";
import { daysOfTheWeek } from "../../components/utilities/utilities";
import moment from "moment";

//Pages
import AlternativeCurrency from "./AlternativeCurrency";
import AlternativeOtherInformation from "./AlternativeOtherInformation";

function AlternativeSearchNextDays(props) {
  return (
    <>
      <button
        className={style.currentWeatherBtn}
        alt='back'
        onClick={() => {
          props.setToggle(0);
        }}>
        Погода сейчас
      </button>
      <h2 className={style.city}>
        {props.searchResult.data.location.country} {props.searchResult.data.location.name}
        {props.searchResult.data.location.name}
        {Object.entries(CountryQuery.findByNameCommon(props.searchResult.data.location.country)) !== null
          ? ` ${CountryQuery.findByNameCommon(props.searchResult.data.location.country).flag}`
          : ""}
      </h2>
      <p>
        {Object.entries(CountryQuery.findByNameCommon(props.searchResult.data.location.country)) !== null
          ? Object.entries(CountryQuery.findByNameCommon(props.searchResult.data.location.country)["name"]["native"]).length > 1
            ? Object.entries(CountryQuery.findByNameCommon(props.searchResult.data.location.country)["name"]["native"])[0]["official"]
            : Object.entries(CountryQuery.findByNameCommon(props.searchResult.data.location.country)["name"]["native"])[
                Object.entries(CountryQuery.findByNameCommon(props.searchResult.data.location.country)[1])["name"]["native"]
              ]["official"]
          : ""}
      </p>
      <p className={style.city}>{props.searchResult.data.location.tz_id}</p>
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

      <AlternativeOtherInformation searchResult={props.searchResult} />
      <AlternativeCurrency exchangeRate={props.exchangeRate} ipData={props.ipData} searchResult={props.searchResult} />
    </>
  );
}

export default AlternativeSearchNextDays;
