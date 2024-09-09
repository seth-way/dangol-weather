import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export interface weatherInfoObject {
  cod: string;
  message: number;
  cnt: number;
  list: weatherDataFormat[];
  city: ICity;
}
interface ICity {
  id: number;
  name: string;
  coord: ICoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface ICoord {
  lat: number;
  lon: number;
}
export interface userSideWeatherInfo {
  weather: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  windspeed: number;
  date_text: string;
  date_val: number;
}
export interface weatherDataFormat {
  dt: number;
  main: mainSubObjectInterface;
  weather: Array<weatherSubArrayInterface>;
  clouds: object;
  wind: windSubObjectInterface;
  visibility: number;
  pop: number;
  sys: object;
  dt_txt: string;
}
interface weatherSubArrayInterface {
  id: number;
  main: string;
  description: string;
  icon: string;
}
interface mainSubObjectInterface {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}
interface windSubObjectInterface {
  speed: number;
  deg: number;
  gust: number;
}


export function weatherTranslate(weatherInfo: any) {

  const weatherInfoArrayToday: Array<userSideWeatherInfo> = [];
  const weatherInfoArrayWeek: Array<userSideWeatherInfo> = [];
  function returnInfo(weatherInfo: weatherInfoObject) {
    const arrayOfDates: Array<number> = [];
    function returnCurrentTime(timeNow: number, info: weatherInfoObject) {
      let smallestDifference: number = 999999999999;
      //let closestTime: string = 'none';
      let closestGoingToArray: weatherDataFormat = info.list[0];
      info.list.forEach(listObject => {
        if (
          Math.min(Math.abs(timeNow - listObject.dt * 1000)) <=
          smallestDifference
        ) {
          smallestDifference = Math.min(
            Math.abs(timeNow - listObject.dt * 1000)
          );
          //closestTime = listObject.dt_txt + ' Universal Time Coordinated';
          closestGoingToArray = listObject;
        }
      });
      const currentWeather: userSideWeatherInfo = {
        weather: closestGoingToArray.weather[0].main,
        temp: closestGoingToArray.main.temp,
        temp_min: closestGoingToArray.main.temp_min,
        temp_max: closestGoingToArray.main.temp_max,
        humidity: closestGoingToArray.main.humidity,
        windspeed: closestGoingToArray.wind.speed,
        date_text: closestGoingToArray.dt_txt,
        date_val: closestGoingToArray.dt,
      };
      weatherInfoArrayToday.push(currentWeather);
      return;
    }
    function getDaysAfter(currentTime: number, info: weatherInfoObject) {
      const daysAfter: Array<weatherDataFormat> = [];
      info.list.forEach(listObject => {
        if ((listObject.dt * 1000 >= currentTime) && (((listObject.dt + 43200) % 86400) === 0)) {
          daysAfter.push(listObject);
        }
      });
      return daysAfter;
    }
    let hourCount = 0;
    weatherInfo.list.forEach(listItem => {
      if (hourCount % 8 === 0) {
        arrayOfDates.push(listItem.dt);
      }
      hourCount++;
    });
    returnCurrentTime(Date.now(), weatherInfo)

    const weatherPasser: userSideWeatherInfo = { temp: 0, temp_max: 0, temp_min: 0, humidity: 0, windspeed: 0, weather: "", date_text: "", date_val: 0 };
    // function weatherRestOfTheDay(currentTimestamp: number, info: weatherInfoObject) {
    //   let happenedYet: Boolean = true;
    //   const nowTillTomorrow: Array<weatherDataFormat> = [];
    //   info.list[0].forEach((weatherObject: weatherDataFormat) => {
    //     if (currentTimestamp <= weatherObject.dt) {
    //       happenedYet = false;
    //     }
    //     if ((happenedYet === false) && (((weatherObject.dt + 43200) % 86400) != 0)) {
    //       nowTillTomorrow.push(weatherObject);
    //     }
    //   })

    //   nowTillTomorrow.forEach((times) => {
    //     weatherPasser.temp = times.main.temp;
    //     weatherPasser.temp_min = times.main.temp_min;
    //     weatherPasser.temp_max = times.main.temp_max;
    //     weatherPasser.humidity = times.main.humidity;
    //     weatherPasser.windspeed = times.wind.speed;
    //     weatherPasser.date_text = times.dt_txt;
    //     weatherPasser.date_val = times.dt;
    //     weatherPasser.weather = times.weather[0].main;
    //     weatherInfoArrayToday.push(JSON.parse(JSON.stringify(weatherPasser)));
    //   })
    //   return;
    // }

    if (getDaysAfter(Date.now(), weatherInfo).length <= 4) {
      weatherInfoArrayWeek.push(weatherInfoArrayToday[0])
    }
    getDaysAfter(Date.now(), weatherInfo).forEach((upcomingDay) => {
      weatherPasser.temp = upcomingDay.main.temp;
      weatherPasser.temp_min = upcomingDay.main.temp_min;
      weatherPasser.temp_max = upcomingDay.main.temp_max;
      weatherPasser.humidity = upcomingDay.main.humidity;
      weatherPasser.windspeed = upcomingDay.wind.speed;
      weatherPasser.date_text = upcomingDay.dt_txt;
      weatherPasser.date_val = upcomingDay.dt;
      weatherPasser.weather = upcomingDay.weather[0].main;
      weatherInfoArrayWeek.push(JSON.parse(JSON.stringify(weatherPasser)));
    })
    const dateInstance = new Date(weatherInfoArrayToday[0].date_text);

    if (dateInstance.getHours() >= 12) {
      weatherInfoArrayWeek.unshift(weatherInfoArrayToday[0]);
    }
    while (weatherInfoArrayWeek.length > 5) {
      weatherInfoArrayWeek.splice(5, 1);
    }
    const finalVals: Array<Array<userSideWeatherInfo>> = [weatherInfoArrayToday, weatherInfoArrayWeek]
    // return getDaysAfter(Date.now(), weatherInfo);
    return finalVals;
  }
  return returnInfo(weatherInfo);
}

export function weatherTranslateDaily(weatherInfo: any) {
  console.log(weatherTranslate(weatherInfo)[0])
  // let stringVersion: string = "";
  // weatherTranslate(weatherData)[1].forEach((remainingTime) => {
  //   stringVersion = stringVersion.concat(remainingTime.weather.toString(), "\n")
  // });
  return weatherTranslate(weatherInfo)[0];
}
export function weatherTranslateWeekly(weatherInfo: any) {
  console.log(weatherTranslate(weatherInfo)[1])
  return weatherTranslate(weatherInfo)[1];

}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
