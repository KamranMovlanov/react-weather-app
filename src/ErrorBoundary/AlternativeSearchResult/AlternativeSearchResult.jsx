import React from "react";
import style from "./AlternativeSearchResult.module.css";
import AlternativeCurrency from "../AlternativeSearchResult/AlternativeCurrency";
import AlternativeOtherInformation from "./AlternativeOtherInformation";
import { daysOfTheWeek } from "../../components/utilities/utilities";
import moment from "moment";
const CountryQuery = require("country-query");

function AlternativeSearchResult(props) {
  moment.locale("ru");
  const d = new Date();
  const n = d.getDay();

  const tempClassColor = (param) => {
    if (param <= -10) {
      return style.tempVeryCold;
    }
    if (param <= 0) {
      return style.tempCold;
    }
    if (param <= 15) {
      return style.temp;
    }
    if (param <= 25) {
      return style.tempAverageDegrees;
    }
    if (param <= 35) {
      return style.tempHighDegrees;
    }
    if (param > 35) {
      return style.tempExtremeDegrees;
    }
  };

  console.log("Country qury:", CountryQuery.findByNameCommon(props.searchResult.data.location.country));

  return (
    <>
      <h2 className={style.city}>
        {props.searchResult.data.location.country}
        {props.searchResult.data.location.name}
        {Object.entries(CountryQuery.findByNameCommon(props.searchResult.data.location.country)) !== null
          ? ` ${CountryQuery.findByNameCommon(props.searchResult.data.location.country).flag}`
          : ""}
      </h2>

      <p className={style.city}>{props.searchResult.data.location.tz_id}</p>
      <h4 className={style.date}>
        {props.searchResult.data.location.localtime}, {daysOfTheWeek([n])}
      </h4>
      <span>Сейчас</span>
      <h1 className={`${tempClassColor(props.searchResult.data.current.temp_c)}`}>
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

      <AlternativeOtherInformation searchResult={props.searchResult} />
      <AlternativeCurrency exchangeRate={props.exchangeRate} ipData={props.ipData} searchResult={props.searchResult} />
    </>
  );
}

export default AlternativeSearchResult;
