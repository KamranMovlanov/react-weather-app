import React from "react";
import style from "./Weather.module.css";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import { isEmpty } from "./../utilities/utilities";
const CountryQuery = require("country-query");

function Currency(props) {
  if (!isEmpty(props.searchResult)) {
    return (
      <ul className={style.countryInfo}>
        <ErrorBoundary>
          <h5>Курсы валют за сегодня</h5>
          <div className={style.curencyVallue}>
            <li className={style.countryInfoItems}>
              <img src='./icons/currencyIcons/sack.png' className={style.OtherInformationIcon} alt='icon'></img>
              {` Валюта страны: `}
              {Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] ||
              Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] !== null
                ? `${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][1]["name"]}
                  ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][1]["symbol"]}`
                : `${props.ipData.data.currency.currency_name}`}
            </li>
          </div>

          {/*========= Currency =========*/}
          <li className={style.countryInfoItems}>
            <img src='./icons/currencyIcons/united-states.png' className={style.OtherInformationIcon} alt='icon'></img> USD:{" "}
            {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.USD).toFixed(2) : "Нет данных"}
            {Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] ||
            Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] !== null
              ? ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][1]["symbol"]}`
              : `${props.ipData.data.currency.currency_name}`}
          </li>
          <li className={style.countryInfoItems}>
            <img src='./icons/currencyIcons/european-union.png' className={style.OtherInformationIcon} alt='icon'></img> EUR:{" "}
            {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.EUR).toFixed(2) : "Нет данных"}
            {Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] ||
            Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] !== null
              ? ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][1]["symbol"]}`
              : `${props.ipData.data.currency.currency_name}`}
          </li>
          <li className={style.countryInfoItems}>
            <img src='./icons/currencyIcons/CNY.png' className={style.OtherInformationIcon} alt='icon'></img> CNY:{" "}
            {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.CNY).toFixed(2) : "Нет данных"}
            {Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] ||
            Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] !== null
              ? ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][1]["symbol"]}`
              : `${props.ipData.data.currency.currency_name}`}
          </li>
          <li className={style.countryInfoItems}>
            <img src='./icons/currencyIcons/turkeyLira.png' className={style.OtherInformationIcon} alt='icon'></img> TRY:{" "}
            {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.TRY).toFixed(2) : "Нет данных"}
            {Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] ||
            Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] !== null
              ? ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][1]["symbol"]}`
              : `${props.ipData.data.currency.currency_name}`}
          </li>
          <li className={style.countryInfoItems}>
            <img src='./icons/currencyIcons/russia.png' className={style.OtherInformationIcon} alt='icon'></img> RUB:{" "}
            {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.RUB).toFixed(2) : "Нет данных"}
            {Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] ||
            Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] !== null
              ? ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][1]["symbol"]}`
              : `${props.ipData.data.currency.currency_name}`}
          </li>

          {/*========= second colon =========*/}
          <div className={style.cryptoWrapper}>
            <li className={style.countryInfoItems}>
              <img src='./icons/currencyIcons/canada.png' className={style.OtherInformationIcon} alt='icon'></img> CAD:{" "}
              {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.CAD).toFixed(2) : "Нет данных"}
              {Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] ||
              Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] !== null
                ? ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][1]["symbol"]}`
                : `${props.ipData.data.currency.currency_name}`}
            </li>
            <li className={style.countryInfoItems}>
              <img src='./icons/currencyIcons/united-kingdom.png' className={style.OtherInformationIcon} alt='icon'></img> GBP:{" "}
              {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.GBP).toFixed(2) : "Нет данных"}
              {Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] ||
              Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] !== null
                ? ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][1]["symbol"]}`
                : `${props.ipData.data.currency.currency_name}`}
            </li>
            <li className={style.countryInfoItems}>
              <img src='./icons/currencyIcons/new-zealand.png' className={style.OtherInformationIcon} alt='icon'></img> NZD:{" "}
              {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.NZD).toFixed(2) : "Нет данных"}
              {Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] ||
              Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] !== null
                ? ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][1]["symbol"]}`
                : `${props.ipData.data.currency.currency_name}`}
            </li>
            <li className={style.countryInfoItems}>
              <img src='./icons/currencyIcons/australia.png' className={style.OtherInformationIcon} alt='icon'></img> AUD:{" "}
              {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.AUD).toFixed(2) : "Нет данных"}
              {Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] ||
              Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] !== null
                ? ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][1]["symbol"]}`
                : `${props.ipData.data.currency.currency_name}`}
            </li>
            <li className={style.countryInfoItems}>
              <img src='./icons/currencyIcons/japan.png' className={style.OtherInformationIcon} alt='icon'></img> JPY:{" "}
              {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.JPY).toFixed(2) : "Нет данных"}
              {Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] ||
              Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][0] !== null
                ? ` ${Object.entries(CountryQuery.find("capital", props.searchResult.data.location.tz_id.split("/")[1]).currencies)[0][1]["symbol"]}`
                : `${props.ipData.data.currency.currency_name}`}
            </li>
          </div>
        </ErrorBoundary>
      </ul>
    );
  }

  if (!isEmpty(props.currentWeatherGeneral)) {
    return (
      <>
        <ul className={style.countryInfo}>
          <h5>Курсы валют за сегодня</h5>
          <div className={style.curencyVallue}>
            <li className={style.countryInfoItems}>
              <img src='./icons/currencyIcons/sack.png' className={style.OtherInformationIcon} alt='icon'></img>
              {` Валюта страны: `}
              {CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country)
                ? ` ${props.dynamicallyObjkeyDetect(
                    CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country).currencies,
                    "name"
                  )},

              ${props.dynamicallyObjkeyDetect(CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country).currencies, "symbol")}`
                : ` ${props.ipData.data.currency.currency_name}`}
            </li>
          </div>

          {/*========= Currency =========*/}
          <li className={style.countryInfoItems}>
            <img src='./icons/currencyIcons/united-states.png' className={style.OtherInformationIcon} alt='icon'></img> USD:{" "}
            {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.USD).toFixed(2) : "Нет данных"}
            {CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country)
              ? ` ${props.dynamicallyObjkeyDetect(
                  CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country).currencies,
                  "symbol"
                )}`
              : ` ${props.ipData.data.currency.currency_name}`}
          </li>
          <li className={style.countryInfoItems}>
            <img src='./icons/currencyIcons/european-union.png' className={style.OtherInformationIcon} alt='icon'></img> EUR:{" "}
            {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.EUR).toFixed(2) : "Нет данных"}
            {CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country)
              ? ` ${props.dynamicallyObjkeyDetect(
                  CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country).currencies,
                  "symbol"
                )}`
              : ` ${props.ipData.data.currency.currency_name}`}
          </li>
          <li className={style.countryInfoItems}>
            <img src='./icons/currencyIcons/CNY.png' className={style.OtherInformationIcon} alt='icon'></img> CNY:{" "}
            {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.CNY).toFixed(2) : "Нет данных"}
            {CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country)
              ? ` ${props.dynamicallyObjkeyDetect(
                  CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country).currencies,
                  "symbol"
                )}`
              : ` ${props.ipData.data.currency.currency_name}`}
          </li>
          <li className={style.countryInfoItems}>
            <img src='./icons/currencyIcons/turkeyLira.png' className={style.OtherInformationIcon} alt='icon'></img> TRY:{" "}
            {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.TRY).toFixed(2) : "Нет данных"}
            {CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country)
              ? ` ${props.dynamicallyObjkeyDetect(
                  CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country).currencies,
                  "symbol"
                )}`
              : ` ${props.ipData.data.currency.currency_name}`}
          </li>
          <li className={style.countryInfoItems}>
            <img src='./icons/currencyIcons/russia.png' className={style.OtherInformationIcon} alt='icon'></img> RUB:{" "}
            {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.RUB).toFixed(2) : "Нет данных"}
            {CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country)
              ? ` ${props.dynamicallyObjkeyDetect(
                  CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country).currencies,
                  "symbol"
                )}`
              : ` ${props.ipData.data.currency.currency_name}`}
          </li>

          {/*========= second colon =========*/}
          <div className={style.cryptoWrapper}>
            <li className={style.countryInfoItems}>
              <img src='./icons/currencyIcons/canada.png' className={style.OtherInformationIcon} alt='icon'></img> CAD:{" "}
              {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.CAD).toFixed(2) : "Нет данных"}
              {CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country)
                ? ` ${props.dynamicallyObjkeyDetect(
                    CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country).currencies,
                    "symbol"
                  )}`
                : ` ${props.ipData.data.currency.currency_name}`}
            </li>
            <li className={style.countryInfoItems}>
              <img src='./icons/currencyIcons/united-kingdom.png' className={style.OtherInformationIcon} alt='icon'></img> GBP:{" "}
              {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.GBP).toFixed(2) : "Нет данных"}
              {CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country)
                ? ` ${props.dynamicallyObjkeyDetect(
                    CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country).currencies,
                    "symbol"
                  )}`
                : ` ${props.ipData.data.currency.currency_name}`}
            </li>
            <li className={style.countryInfoItems}>
              <img src='./icons/currencyIcons/new-zealand.png' className={style.OtherInformationIcon} alt='icon'></img> NZD:{" "}
              {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.NZD).toFixed(2) : "Нет данных"}
              {CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country)
                ? ` ${props.dynamicallyObjkeyDetect(
                    CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country).currencies,
                    "symbol"
                  )}`
                : ` ${props.ipData.data.currency.currency_name}`}
            </li>
            <li className={style.countryInfoItems}>
              <img src='./icons/currencyIcons/australia.png' className={style.OtherInformationIcon} alt='icon'></img> AUD:{" "}
              {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.AUD).toFixed(2) : "Нет данных"}
              {CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country)
                ? ` ${props.dynamicallyObjkeyDetect(
                    CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country).currencies,
                    "symbol"
                  )}`
                : ` ${props.ipData.data.currency.currency_name}`}
            </li>
            <li className={style.countryInfoItems}>
              <img src='./icons/currencyIcons/japan.png' className={style.OtherInformationIcon} alt='icon'></img> JPY:{" "}
              {!isEmpty(props.exchangeRate) ? (1 / props.exchangeRate.data.rates.JPY).toFixed(2) : "Нет данных"}
              {CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country)
                ? ` ${props.dynamicallyObjkeyDetect(
                    CountryQuery.findByNameCommon(props.currentWeatherGeneral.data.location.country).currencies,
                    "symbol"
                  )}`
                : ` ${props.ipData.data.currency.currency_name}`}
            </li>
          </div>
        </ul>
      </>
    );
  }
}

export default Currency;
