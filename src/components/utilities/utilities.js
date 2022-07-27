
import moment from "moment";


export const isEmpty = (obj) => {
  for (let key in obj) {
    return false;
  }
  return true;
}

export const daysOfTheWeek = (n) => {
  const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота']

  return days[n]
}


export const calcOfDaylightHours = (sunset, sunrise) => {
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

  return `${((sunset - sunrise) / 60).toFixed(0)} ч ${(
    (Number(res) / 100) *
    60
  ).toFixed(0)} мин`;
};



export const airQualityDetector = (param) => {
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
}


export const uvQualityDetector = (param) => {
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