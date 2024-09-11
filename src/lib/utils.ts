import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  boomHappyQuotes,
  boomSadQuotes,
} from '../assets/boomhauer_quotes/boomhauerQuotes.json';
import classicBoom from '../assets/images/booms/classic_boom.jpg';
import rainBoom from '../assets/images/booms/rain_boom.jpg';
import snowBoom from '../assets/images/booms/snow_boom.jpg';
import sunnyBoom from '../assets/images/booms/sunny_boom.jpg';
import thunderBoom from '../assets/images/booms/thunder_boom.jpg';
import windyBoom from '../assets/images/booms/windy_boom.jpg';

export interface BoomhauerQuote {
  id: number;
  quote: string;
}

export interface BoomhauerQuotes {
  boomHappyQuotes: BoomhauerQuote[];
  boomSadQuotes: BoomhauerQuote[];
}

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
  icon: IIcon;
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
  icon: IIcon;
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
          Math.min(Math.abs(info.list[0].dt - listObject.dt * 1000)) <=
          smallestDifference
        ) {
          smallestDifference = Math.min(
            Math.abs(info.list[0].dt - listObject.dt * 1000)
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
        icon: closestGoingToArray.weather[0].icon,
      };
      weatherInfoArrayToday.push(currentWeather);
      return;
    }

    function getDaysAfter(currentTime: number, info: weatherInfoObject) {
      const daysAfter: Array<weatherDataFormat> = [];
      info.list.forEach(listObject => {
        if (
          listObject.dt * 1000 >= currentTime &&
          (listObject.dt + 43200) % 86400 === 0
        ) {
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
    returnCurrentTime(Date.now(), weatherInfo);

    const weatherPasser: userSideWeatherInfo = {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
      humidity: 0,
      windspeed: 0,
      weather: '',
      date_text: '',
      date_val: 0,
      icon: '',
    };

    if (getDaysAfter(Date.now(), weatherInfo).length <= 4) {
      weatherInfoArrayWeek.push(weatherInfoArrayToday[0]);
    }

    getDaysAfter(Date.now(), weatherInfo).forEach(upcomingDay => {
      weatherPasser.temp = upcomingDay.main.temp;
      weatherPasser.temp_min = upcomingDay.main.temp_min;
      weatherPasser.temp_max = upcomingDay.main.temp_max;
      weatherPasser.humidity = upcomingDay.main.humidity;
      weatherPasser.windspeed = upcomingDay.wind.speed;
      weatherPasser.date_text = upcomingDay.dt_txt;
      weatherPasser.date_val = upcomingDay.dt;
      weatherPasser.weather = upcomingDay.weather[0].main;
      weatherPasser.icon = upcomingDay.weather[0].icon;
      weatherInfoArrayWeek.push(JSON.parse(JSON.stringify(weatherPasser)));
    });
    const dateInstance = new Date(weatherInfoArrayToday[0].date_text);

    if (dateInstance.getHours() >= 12) {
      weatherInfoArrayWeek.unshift(weatherInfoArrayToday[0]);
    }
    while (weatherInfoArrayWeek.length > 5) {
      weatherInfoArrayWeek.splice(5, 1);
    }
    const finalVals: Array<Array<userSideWeatherInfo>> = [
      weatherInfoArrayToday,
      weatherInfoArrayWeek,
    ];
    // return getDaysAfter(Date.now(), weatherInfo);
    return finalVals;
  }
  return returnInfo(weatherInfo);
}

export function weatherTranslateDaily(
  weatherInfo: weatherInfoObject
): userSideWeatherInfo[] {
  console.log(weatherTranslate(weatherInfo)[0]);

  return weatherTranslate(weatherInfo)[0];
}

export function weatherTranslateWeekly(
  weatherInfo: weatherInfoObject
): userSideWeatherInfo[] {
  console.log(weatherTranslate(weatherInfo)[1]);
  return weatherTranslate(weatherInfo)[1];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const determineBoomQuote = (
  currentWeather: string | undefined
): string => {
  if (!currentWeather)
    return `"Tell y'what man, you talk'n bout ol' meanin' ah life, man, go read tha'
   ol hitchiker's guide, man, y'know talkin' bout ol, 42, man."`;
  const happyWeatherKeyWords = [
    'clear',
    'sunny',
    'few clouds',
    'scattered clouds',
  ];
  const weatherDescriptor = currentWeather.toLowerCase();

  const weatherMakesBoomhauerHappy = happyWeatherKeyWords.some(keyword =>
    weatherDescriptor.includes(keyword)
  );

  if (weatherMakesBoomhauerHappy) {
    return boomHappyQuotes[Math.floor(Math.random() * boomHappyQuotes.length)]
      .quote;
  } else {
    return boomSadQuotes[Math.floor(Math.random() * boomSadQuotes.length)]
      .quote;
  }
};

type IIcon =
  | ''
  | '01d'
  | '01n'
  | '02d'
  | '02n'
  | '03d'
  | '03n'
  | '04d'
  | '04n'
  | '09d'
  | '09n'
  | '10d'
  | '10n'
  | '11d'
  | '11n'
  | '13d'
  | '13n'
  | '50d';

export const determineBoomImage = (icon: IIcon): string => {
  if (icon.startsWith('01') || icon.startsWith('02')) return sunnyBoom;
  if (icon.startsWith('03') || icon.startsWith('04')) return windyBoom;
  if (icon.startsWith('09') || icon.startsWith('10')) return rainBoom;
  if (icon.startsWith('11')) return thunderBoom;
  if (icon.startsWith('13')) return snowBoom;
  else return classicBoom;
};
