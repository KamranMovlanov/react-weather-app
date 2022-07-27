import React from "react";
import style from "../Weather/Weather.module.css";
import moment from "moment";
import { daysOfTheWeek, isEmpty } from "../utilities/utilities";

//Pages
import CurrentWeather from "./LocalWeather/CurrentWeather/CurrentWeather.jsx";
import Currency from "./Currency.jsx";
import NextDaysWeather from "./LocalWeather/NextDaysWeather/NextDaysWeather.jsx";
import SearchCurrentWeather from "./SearchWeather/SearchCurrentWeather/SearchCurrentWeather.jsx";
import SearchNextDaysWeather from "./SearchWeather/SearchNextDaysWeather/SearchNextDaysWeather.jsx";

function GlobalWeatherPage(props) {
  moment.locale("ru");
  const d = new Date();

  if (isEmpty(props.initialWeather.data)) {
    return <div className={style.loader}></div>;
  }

  const calcOfDaylightHours = (sunset, sunrise) => {
    sunset = moment(sunset, "h:mm A").format("H:mm");
    sunrise = moment(sunrise, "h:mm A").format("H:mm");

    if (sunrise.length === 4) {
      sunrise = Number(sunrise.slice(0, 1)) * 60 + Number(sunrise.slice(2, 6));
    }
    if (sunset.length === 4) {
      sunset = Number(sunset.slice(0, 1)) * 60 + Number(sunset.slice(2, 6));
    }
    if (sunrise.length === 5) {
      sunrise = Number(sunrise.slice(0, 2)) * 60 + Number(sunrise.slice(3, 6));
    }
    if (sunset.length === 5) {
      sunset = Number(sunset.slice(0, 2)) * 60 + Number(sunset.slice(3, 6));
    }

    let res = (sunset - sunrise) / 60;
    res = res.toString().slice(3, 5);

    return `${((sunset - sunrise) / 60).toFixed(0)} ч ${((Number(res) / 100) * 60).toFixed(0)} мин`;
  };

  const airQualityDetector = (param) => {
    switch (param) {
      case 1:
        return param + ", Отлично";
      case 2:
        return param + ", Средний";
      case 3:
        return param + ", Плохой";
      case 4:
        return param + ", Вредный";
      case 5:
        return param + ", Очень вредный";
      case 6:
        return param + ", Опасно";

      default:
        return "Не известно";
    }
  };
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

  const uvQualityDetector = (param) => {
    if (param >= 0 && param <= 2) {
      return param + ", Низкий";
    }
    if (param >= 3 && param <= 5) {
      return param + ", Средний";
    }
    if (param >= 6 && param <= 7) {
      return param + ", Высокий";
    }
    if (param >= 8 && param <= 10) {
      return param + ", Очень высокий";
    }
    if (param > 10) {
      return param + ", Экстремально высокий";
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

  const dynamicallyObjkeyDetect = (obj, property) => {
    if (!isEmpty(obj) && obj[Object.keys(obj)]) {
      return obj[Object.keys(obj)][property];
    } else if (Object.entries(obj).length > 0) {
      return Object.values(obj)[0][property];
    }
    return;
  };

  if (!isEmpty(props.searchResult.data)) {
    return (
      <main className={style.weatherContainer}>
        {props.twoDaysWeather > 0 ? (
          props.searchResult.data.forecast.forecastday
            .filter((el, i) => i === props.twoDaysWeather)
            .map((elem) => {
              return (
                <>
                  <SearchNextDaysWeather
                    elem={elem}
                    setToggle={props.setToggle}
                    searchResult={props.searchResult}
                    uvIndexClassColor={uvIndexClassColor}
                    uvQualityDetector={uvQualityDetector}
                    calcOfDaylightHours={calcOfDaylightHours}
                    tempClassColor={tempClassColor}
                  />

                  <Currency
                    exchangeRate={props.exchangeRate}
                    searchResult={props.searchResult}
                    ipData={props.ipData}
                    dynamicallyObjkeyDetect={dynamicallyObjkeyDetect}
                  />
                </>
              );
            })
        ) : (
          <>
            <SearchCurrentWeather
              searchResult={props.searchResult}
              setSearchWeatherData={props.setSearchWeatherData}
              setErrStatus={props.setErrStatus}
              tempClassColor={tempClassColor}
              uvIndexClassColor={uvIndexClassColor}
              uvQualityDetector={uvQualityDetector}
              calcOfDaylightHours={calcOfDaylightHours}
              airQualityClassColor={airQualityClassColor}
              airQualityDetector={airQualityDetector}
            />

            <Currency
              searchResult={props.searchResult}
              exchangeRate={props.exchangeRate}
              ipData={props.ipData}
              dynamicallyObjkeyDetect={dynamicallyObjkeyDetect}
            />
          </>
        )}
      </main>
    );
  }

  if (!isEmpty(props.initialWeather.data)) {
    return (
      <main className={style.weatherContainer}>
        {props.twoDaysWeather > 0 ? (
          props.initialWeather.data.forecast.forecastday
            .filter((el, i) => i === props.twoDaysWeather)
            .map((elem, i) => {
              return (
                <>
                  <NextDaysWeather
                    elem={elem}
                    initialWeather={props.initialWeather}
                    uvIndexClassColor={uvIndexClassColor}
                    uvQualityDetector={uvQualityDetector}
                    calcOfDaylightHours={calcOfDaylightHours}
                    dynamicallyObjkeyDetect={dynamicallyObjkeyDetect}
                    ipData={props.ipData}
                    twoDaysWeather={props.twoDaysWeather}
                    setToggle={props.setToggle}
                    tempClassColor={tempClassColor}
                  />

                  <Currency
                    exchangeRate={props.exchangeRate}
                    currentWeatherGeneral={props.initialWeather}
                    ipData={props.ipData}
                    dynamicallyObjkeyDetect={dynamicallyObjkeyDetect}
                  />
                </>
              );
            })
        ) : (
          <>
            <CurrentWeather
              initialWeather={props.initialWeather}
              ipData={props.ipData.data}
              flag={props.ipData.data.flag.emoji}
              ipAddr={props.ipData.data.ip_address}
              daysOfTheWeek={daysOfTheWeek}
              tempClassColor={tempClassColor}
              uvIndexClassColor={uvIndexClassColor}
              uvQualityDetector={uvQualityDetector}
              airQualityClassColor={airQualityClassColor}
              airQualityDetector={airQualityDetector}
              calcOfDaylightHours={calcOfDaylightHours}
            />

            <Currency
              exchangeRate={props.exchangeRate}
              currentWeatherGeneral={props.initialWeather}
              ipData={props.ipData}
              dynamicallyObjkeyDetect={dynamicallyObjkeyDetect}
            />
          </>
        )}
      </main>
    );
  }
}

export default GlobalWeatherPage;
