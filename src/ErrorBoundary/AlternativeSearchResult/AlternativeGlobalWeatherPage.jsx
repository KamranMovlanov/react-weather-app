import React from "react";
import moment from "moment";
import style from "./AlternativeSearchResult.module.css";
import { isEmpty, daysOfTheWeek } from "../../components/utilities/utilities";

//Pages
import AlternativeSearchResult from "./AlternativeSearchResult";
import AlternativeSearchNextDays from "./AlternativeSearchNextDays";
import CurrentWeather from "./AlternateLocalWeather/CurrentWeather/CurrentWeather";
import NextDaysWeather from "./AlternateLocalWeather/NextDaysWeather/NextDaysWeather";

function AlternativeGlobalWeatherPage(props) {
  moment.locale("ru");

  console.log("Props:", props.initialWeather.data);

  // if (isEmpty(props.searchResult.data)) {
  //   return <div className={style.loader}></div>;
  // }

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
                  <AlternativeSearchNextDays
                    elem={elem}
                    setToggle={props.setToggle}
                    searchResult={props.searchResult}
                    setSearchWeatherData={props.setSearchWeatherData}
                    exchangeRate={props.exchangeRate}
                    ipData={props.ipData}
                    uvIndexClassColor={uvIndexClassColor}
                    uvQualityDetector={uvQualityDetector}
                    calcOfDaylightHours={calcOfDaylightHours}
                    tempClassColor={tempClassColor}
                  />
                </>
              );
            })
        ) : (
          <>
            <AlternativeSearchResult
              searchResult={props.searchResult}
              setSearchWeatherData={props.setSearchWeatherData}
              exchangeRate={props.exchangeRate}
              ipData={props.ipData}
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
                    exchangeRate={props.exchangeRate}
                    twoDaysWeather={props.twoDaysWeather}
                    setToggle={props.setToggle}
                    tempClassColor={tempClassColor}
                  />
                </>
              );
            })
        ) : (
          <>
            <CurrentWeather
              initialWeather={props.initialWeather}
              ipData={props.ipData.data}
              exchangeRate={props.exchangeRate}
              flag={props.ipData.data.flag.emoji}
              ipAddr={props.ipData.data.ip_address}
              daysOfTheWeek={daysOfTheWeek}
              tempClassColor={tempClassColor}
              uvIndexClassColor={uvIndexClassColor}
              uvQualityDetector={uvQualityDetector}
              airQualityDetector={airQualityDetector}
              calcOfDaylightHours={calcOfDaylightHours}
            />
          </>
        )}
      </main>
    );
  }
}

export default AlternativeGlobalWeatherPage;
