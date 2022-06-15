import * as axios from "axios";

const instance = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/weather?q=",
    timeout: 1000,
});



export let weatherApi = {
    apiKey: "b337235480e9bfdb87e5a2cb1b91ea54",

    weatherData: {},

    // location() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(this.locationApi);
    //     } else {
    //         alert("Определение местоположения не поддерживается");
    //     }
    // },

    // locationApi(position) {
    //     let latitude = position.coords.latitude;
    //     let longitude = position.coords.longitude;

    //     axios.get(
    //         `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=0260ba3bf1344c278c2c5f28776623e2`
    //     )
    //         .then((response) => response.json())
    //         .then((data) => {
    //             let res = data.results[0].components.city;
    //             this.fetchWeather(res);
    //         });
    // },

    async fetchWeather(city) {
        axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
            .then((response) => {
                if (!response.ok) {
                    if (typeof response === 'object') return response;
                    if (typeof response === 'string') return JSON.parse(response);
                }
                // console.log(response.data)
                // const json = JSON.parse(response)
                // return json
            })
            .then((data) => {
                // console.log(data.data)
                const { name } = data.data
                const { speed } = data.data.wind;
                const { icon, description } = data.data.weather[0];
                const { temp, humidity, feels_like, pressure } = data.data.main;
                const { sunrise } = data.data.sys
                const { sunset } = data.data.sys



                let weatherDataNew = {
                    name: name,
                    icon: icon,
                    description: description,
                    temp: temp,
                    humidity: humidity,
                    feels_like: feels_like,
                    speed: speed,
                    sunrise: sunrise,
                    sunset: sunset,
                    pressure: pressure,
                };

                Object.assign(this.weatherData, weatherDataNew)
                // console.log(speed, description, temp, humidity, feels_like, sunrise, name)
                // this.displayWeather(weatherData);
            })

    },

    displayWeather(data) {
        // return {
        //     name: data.data.name,
        //     icon: data.data.weather[0].icon,
        //     description: data.data.weather[0].description,
        //     temp: data.data.main.temp,
        //     humidity: data.data.main.humidity,
        //     feels_like: data.data.main.feels_like,
        //     speed: data.data.wind.speed,
        //     sunrise: data.data.sys.sunrise,
        // };


        // const { icon, description } = data.data.weather[0];
        // const { temp, humidity, feels_like } = data.data.main;
        // const { speed } = data.data.wind.speed;
        // const { sunrise } = data.data.sys

        /*
            FIXME:
            
            Разберись
            1. Найди более лаконичную реализацию
            3. Подумай как грамотно обновлять данные без перезагрузки
            4. Как загрузить данные на неделю (думаю лечше сразу загрузить все, а дальше распределить по нужным
                obj) 
            ** Ты отправляешь данные в 4 действия...
        
        */

    }
}

console.log('rendered')
setTimeout(function () {
    window.location.reload(1);
}, 1800000);