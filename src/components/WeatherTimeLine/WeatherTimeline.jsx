import React from "react";
import style from "./WeatherTimeLine.module.css";
import { isEmpty, daysOfTheWeek } from "../utilities/utilities";

function WeatherTimeline(props) {
  const d = new Date();
  const n = d.getDay();

  if (isEmpty(props.initialForecastHours)) {
    return <div className={style.loader}></div>;
  }

  const tempClassColor = (param) => {
    if (param <= -10) {
      return style.tempTimeLineVeryCold;
    }
    if (param <= 0) {
      return style.tempTimeLineCold;
    }
    if (param <= 15) {
      return style.tempTimeLine;
    }
    if (param <= 25) {
      return style.tempTimeLineAverageDegrees;
    }
    if (param <= 35) {
      return style.tempTimeLineHighDegrees;
    }
    if (param > 35) {
      return style.tempTimeLineExtremeDegrees;
    }
  };

  //Search weather
  if (!isEmpty(props.searchForecastHours) && !props.errStatus) {
    return (
      <footer className={style.timelineContainer}>
        {/*twoDaysWeather mean next days weather  */}
        {props.twoDaysWeather > 0
          ? props.searchForecastHours.data.forecast.forecastday
              .filter((el, i) => i === props.twoDaysWeather)
              .map((elem, i) => {
                return elem.hour
                  .filter((el) => parseInt(el.time.slice(11, -3)) >= parseInt(props.searchForecastHours.data.current.last_updated.slice(11, -3)))
                  .map((element, index, arr) => {
                    return (
                      <>
                        <div key={element.time_epoch} className={style.container}>
                          <span className={style.dateTimeLine}>
                            <img src='/clock.png' alt='clock icon'></img>&nbsp; {element.time.slice(-5)}
                          </span>
                          <h3 className={tempClassColor(Math.round(element.temp_c))}>
                            {element.temp_c > 0 ? `+ ${Math.round(element.temp_c)}` : Math.round(element.temp_c)}°
                          </h3>
                          <span className={style.windTimeLine}>
                            {" "}
                            <img src='/wind.svg' alt='wind icon'></img> {element.wind_kph} км/ч
                          </span>
                          <div className={style.flexTimeLine}>
                            <img src={element.condition.icon} alt='Icon' className={style.iconTimeLine} />
                            <div className={style.descriptionTimeLine}>{element.condition.text}</div>
                          </div>
                        </div>
                        {/* */}
                        {index > arr.length - 2
                          ? props.searchForecastHours.data.forecast.forecastday[props.twoDaysWeather].hour.map((element, index) => {
                              return (
                                <div
                                  key={element.time_epoch}
                                  className={element.time.slice(10, -3).trim() !== "00" ? style.container : style.containerNextDay}>
                                  <span className={element.time.slice(10, -3).trim() !== "00" ? style.dateTimeLine : style.dateTimeLineNextDay}>
                                    <img src='/clock.png' alt='clock icon'></img>
                                    &nbsp;
                                    {element.time.slice(10, -3).trim() !== "00" ? element.time.slice(-5) : daysOfTheWeek([n + 1]) + element.time}
                                  </span>
                                  <h3 className={tempClassColor(Math.round(element.temp_c))}>
                                    {Math.floor(element.temp_c) > 0 ? `+ ${Math.round(element.temp_c)}` : Math.round(element.temp_c)}°
                                  </h3>
                                  <span className={style.windTimeLine}>
                                    {" "}
                                    <img src='./wind.svg' alt='icon'></img> {element.wind_kph} км/ч
                                  </span>
                                  <div className={style.flexTimeLine}>
                                    <img src={element.condition.icon} alt='Icon' className={style.iconTimeLine} />
                                    <div className={style.descriptionTimeLine}>{element.condition.text}</div>
                                  </div>
                                </div>
                              );
                            })
                          : ""}
                      </>
                    );
                  });
              })
          : // Today weather hours
            props.searchForecastHours.data.forecast.forecastday[0].hour
              .filter((el, index) => parseInt(el.time.slice(11, -3)) >= parseInt(props.searchForecastHours.data.current.last_updated.slice(11, -3)))
              .map((elem, i, arr) => {
                return (
                  <>
                    <div key={elem.time_epoch} className={style.container}>
                      <span className={style.dateTimeLine}>
                        <img src='/clock.png' alt='clock icon'></img>
                        {i === 0 ? " Сейчас" : " " + elem.time.slice(-5) && elem.time.slice(10, -3) !== "00" ? " " + elem.time.slice(-5) : elem.time}
                      </span>
                      <h3 className={tempClassColor(Math.round(elem.temp_c))}>
                        {elem.temp_c > 0 ? `+ ${Math.round(elem.temp_c)}` : Math.round(elem.temp_c)}°
                      </h3>
                      <span className={style.windTimeLine}>
                        {" "}
                        <img src='./wind.svg' alt='icon'></img> {elem.wind_kph} км/ч
                      </span>
                      <div className={style.flexTimeLine}>
                        <img src={elem.condition.icon} alt='Icon' className={style.iconTimeLine} />
                        <div className={style.descriptionTimeLine}>{elem.condition.text}</div>
                      </div>
                    </div>
                    {i > arr.length - 2
                      ? props.searchForecastHours.data.forecast.forecastday[1].hour.map((element, index) => {
                          return (
                            <div
                              key={element.time_epoch}
                              className={element.time.slice(10, -3).trim() !== "00" ? style.container : style.containerNextDay}>
                              <span className={element.time.slice(10, -3).trim() !== "00" ? style.dateTimeLine : style.dateTimeLineNextDay}>
                                <img src='/clock.png' alt='clock icon'></img>
                                &nbsp;
                                {element.time.slice(10, -3).trim() !== "00" ? element.time.slice(-5) : daysOfTheWeek([n + 1]) + " " + element.time}
                              </span>
                              <h3 className={tempClassColor(Math.round(elem.temp_c))}>
                                {Math.floor(element.temp_c) > 0 ? `+ ${Math.round(element.temp_c)}` : Math.round(element.temp_c)}°
                              </h3>
                              <span className={style.windTimeLine}>
                                {" "}
                                <img src='./wind.svg' alt='icon'></img> {element.wind_kph} км/ч
                              </span>
                              <div className={style.flexTimeLine}>
                                <img src={element.condition.icon} alt='Icon' className={style.iconTimeLine} />
                                <div className={style.descriptionTimeLine}>{element.condition.text}</div>
                              </div>
                            </div>
                          );
                        })
                      : ""}
                  </>
                );
              })}
      </footer>
    );
  }

  // Local weather
  if (!isEmpty(props.initialForecastHours) && !props.errStatus) {
    return (
      <footer className={style.timelineContainer}>
        {props.twoDaysWeather > 0
          ? props.initialForecastHours.data.forecast.forecastday
              .filter((el, i) => i === props.twoDaysWeather)
              .map((elem) => {
                return elem.hour
                  .filter(
                    (el, index) => parseInt(el.time.slice(11, -3)) >= parseInt(props.initialForecastHours.data.current.last_updated.slice(11, -3))
                  )
                  .map((element, index, arr) => {
                    return (
                      <>
                        <div key={element.time_epoch} className={style.container}>
                          <span className={style.dateTimeLine}>
                            <img src='/clock.png' alt='clock icon'></img> {element.time.slice(-5)}
                          </span>
                          <h3 className={tempClassColor(Math.round(element.temp_c))}>
                            {element.temp_c > 0 ? "+" + Math.round(element.temp_c) : Math.round(element.temp_c)}°
                          </h3>
                          <span className={style.windTimeLine}>
                            {" "}
                            <img src='./wind.svg' alt='icon'></img> {element.wind_kph} км/ч
                          </span>
                          <div className={style.flexTimeLine}>
                            <img src={element.condition.icon} alt='Icon' className={style.iconTimeLine} />
                            <div className={style.descriptionTimeLine}>{element.condition.text}</div>
                          </div>
                        </div>
                        {index > arr.length - 2
                          ? props.initialForecastHours.data.forecast.forecastday[props.twoDaysWeather].hour.map((element, index) => {
                              return (
                                <div
                                  key={element.time_epoch}
                                  className={element.time.slice(10, -3).trim() !== "00" ? style.container : style.containerNextDay}>
                                  <span className={element.time.slice(10, -3).trim() !== "00" ? style.dateTimeLine : style.dateTimeLineNextDay}>
                                    <img src='/clock.png' alt='clock icon'></img>
                                    &nbsp;
                                    {element.time.slice(10, -3).trim() !== "00" ? element.time.slice(-5) : daysOfTheWeek([n + 1]) + element.time}
                                  </span>
                                  <h3 className={tempClassColor(Math.round(element.temp_c))}>
                                    {Math.floor(element.temp_c) > 0 ? "+" + Math.round(element.temp_c) : Math.round(element.temp_c)}°
                                  </h3>
                                  <span className={style.windTimeLine}>
                                    {" "}
                                    <img src='./wind.svg' alt='icon'></img> {element.wind_kph} км/ч
                                  </span>
                                  <div className={style.flexTimeLine}>
                                    <img src={element.condition.icon} alt='Icon' className={style.iconTimeLine} />
                                    <div className={style.descriptionTimeLine}>{element.condition.text}</div>
                                  </div>
                                </div>
                              );
                            })
                          : ""}
                      </>
                    );
                  });
              })
          : props.initialForecastHours.data.forecast.forecastday[0].hour
              .filter((el, index) => parseInt(el.time.slice(11, -3)) >= parseInt(props.initialForecastHours.data.current.last_updated.slice(11, -3)))
              .map((elem, i, arr) => {
                return (
                  <>
                    <div key={elem.time_epoch} className={style.container}>
                      <span className={style.dateTimeLine}>
                        <img src='/clock.png' alt='clock icon'></img>{" "}
                        {i === 0 ? " Сейчас" : elem.time.slice(-5) && elem.time.slice(10, -3) !== "00" ? elem.time.slice(-5) : elem.time}
                      </span>
                      <h3 className={tempClassColor(Math.round(elem.temp_c))}>
                        {elem.temp_c > 0 ? "+" + Math.round(elem.temp_c) : Math.round(elem.temp_c)}°
                      </h3>
                      <span className={style.windTimeLine}>
                        {" "}
                        <img src='./wind.svg' alt='icon'></img> {elem.wind_kph} км/ч
                      </span>
                      <div className={style.flexTimeLine}>
                        <img src={elem.condition.icon} alt='Icon' className={style.iconTimeLine} />
                        <div className={style.descriptionTimeLine}>{elem.condition.text}</div>
                      </div>
                    </div>
                    {i > arr.length - 2
                      ? props.initialForecastHours.data.forecast.forecastday[1].hour.map((element, index) => {
                          return (
                            <div
                              key={element.time_epoch}
                              className={element.time.slice(10, -3).trim() !== "00" ? style.container : style.containerNextDay}>
                              <span className={element.time.slice(10, -3).trim() !== "00" ? style.dateTimeLine : style.dateTimeLineNextDay}>
                                <img src='/clock.png' alt='clock icon'></img>
                                &nbsp;
                                {element.time.slice(10, -3).trim() !== "00"
                                  ? element.time.slice(-5)
                                  : daysOfTheWeek([n + 1]) + " " + element.time.slice(-5)}
                                {/* {element.time.slice(10, -3).trim() !== "00" ? element.time.slice(-5) : daysOfTheWeek([n + 1]) + " " + element.time}  Это как было*/}
                              </span>
                              <h3 className={tempClassColor(Math.round(element.temp_c))}>
                                {Math.floor(element.temp_c) > 0 ? "" + Math.round(element.temp_c) : Math.round(element.temp_c)}°
                              </h3>
                              <span className={style.windTimeLine}>
                                {" "}
                                <img src='./wind.svg' alt='icon'></img> {element.wind_kph} км/ч
                              </span>
                              <div className={style.flexTimeLine}>
                                <img src={element.condition.icon} alt='Icon' className={style.iconTimeLine} />
                                <div className={style.descriptionTimeLine}>{element.condition.text}</div>
                              </div>
                            </div>
                          );
                        })
                      : ""}
                  </>
                );
              })}
      </footer>
    );
  }
}

export default WeatherTimeline;
