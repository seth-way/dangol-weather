// import { useState } from 'react';
import AsciiArt from './AsciiArt';
import GlobeSVG from '../assets/images/globe.svg?react';
import classicBoom from '../assets/images/booms/classic_boom.jpg';
import { useParams } from 'react-router-dom';
import weatherData from '../assets/dummy_data/weather.json';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Dropdownmenu
} from '@/components/ui/card';

interface Props {
  city: string;
}

const WeatherDisplayMain = ({ city }: Props) => {
  const { lat, long } = useParams<{ lat: string; long: string }>();
  console.log('weather data ', weatherData);

  function weatherTranslate(weatherInfo: any) {
    // translate unix time to utc/javascript,
    // forEach to search for the noon timestamps and put those in an array;
    // read array after to see length, and if not enough for all 5 days,
    // look at weatherinfo.length-1 and use that for last slot
    // F = 1.8*(K-273) + 32.
    //
    interface weatherInfoObject {
      cod: string;
      message: number;
      cnt: number;
      list: any[];
    }

    interface userSideWeatherInfo {
      weather: string;
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
      windspeed: number;
      date_text: string;
      date_val: number;
    }
    interface weatherDataFormat {
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

    // const desiredKey = "list";
    // const listval : {[key:string]:string} = Object.entries(weatherInfo).find(([key, val]) => key === desiredKey)?.[1];;
    console.log(weatherInfo.list[0].main);
    const weatherInfoArrayToday: Array<userSideWeatherInfo> = [];

    function returnInfo(weatherInfo: weatherInfoObject) {
      console.log(weatherInfo);
      // let userInfoReturn :userSideWeatherInfo;

      // let returnObject:weatherInfoObject;

      const arrayOfDates: Array<number> = [];
      function returnCurrentTime(timeNow: number, info: weatherInfoObject) {
        let smallestDifference: number = 999999999999;
        let closestTime: string = 'none';
        let closestGoingToArray: weatherDataFormat = info.list[0];
        info.list.forEach(listObject => {
          if (
            Math.min(Math.abs(timeNow - listObject.dt * 1000)) <=
            smallestDifference
          ) {
            smallestDifference = Math.min(
              Math.abs(timeNow - listObject.dt * 1000)
            );
            closestTime = listObject.dt_txt + ' Universal Time Coordinated';
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
        return closestTime;
      }
      function getDaysAfter(currentTime: number, info: weatherInfoObject) {
        const daysAfter: Array<object> = [];
        info.list.forEach(listObject => {
          if (((listObject.dt + 43200) % 86400) === 0) {
            daysAfter.push(listObject);
          }
        });
        return daysAfter;
        //add in condition that listObject.dt*1000 has to be greater than date.now
      }

      let hourCount = 0;
      weatherInfo.list.forEach(listItem => {
        if (hourCount % 8 === 0) {
          arrayOfDates.push(listItem.dt);
        }
        hourCount++;
      });

      // returnObject.list[0]. = "hey";
      console.log(weatherInfoArrayToday);
      console.log(getDaysAfter(Date.now(), weatherInfo)); // returns only objects at times equal to noon
      console.log(returnCurrentTime(Date.now(), weatherInfo)); // returns only objects at times equal to noon

      // return getDaysAfter(Date.now(), weatherInfo);
      return weatherInfoArrayToday;
    }
    return returnInfo(weatherInfo);
  }
  console.log(weatherTranslate(weatherData));
  // need a util function to turn weatherData.list -> "today & 4 day forcast"
  // setHours(number between 0 and 23) to set an exact hour
  // const currentDay = new Date()
  // const
  return (

    <>
      <CardContent className="flex flex-col items-center justify-center mb-4 px-4">
        <div className="flex justify-between items-center w-full px-3 mt-3 mr-2">
          <div className="flex space-x-2">
            <button className="text-sm font-semibold px-3 py-1 
        border rounded bg-gray-200 hover:bg-gray-300 w-30">
              5 DAY
            </button>
            <button className="text-sm font-semibold px-3 py-1
         border rounded bg-gray-200 hover:bg-gray-300 w-30">
              HOME
            </button>
          </div>

        </div>

        <div className="flex flex-row justify-center my-4">
          <GlobeSVG height={50} width={50} className="animate-spin-slow" />
          <GlobeSVG height={115} width={115} className="animate-spin-slower animate-reverse-spin" />
        </div>

        <div className="text-center">
          {/* <div className="text-lg font-bold">{lat} - {long}</div> */}
          <div className="text-lg font-bold">{city.toUpperCase()}</div>
          <div>
            {(weatherTranslate(weatherData)[0].temp_min).toString()}°F
            -- {(weatherTranslate(weatherData)[0].temp_max).toString()}°F
            <div className='text-sm'>
              conditions: <span className='font-bold'>rain</span>
            </div>
            <div className="italic text-sm">09/04/2024</div>
          </div>
        </div>
      </CardContent>

      <CardFooter className='flex justify-center'>
        <AsciiArt src={classicBoom} height={256} width={256} fontSize={0.3} />
      </CardFooter>

      <CardContent className="text-right italic text-sm tracking-tighter">
      &apos;dang ol rain, like a, a dang ol bucket, man&apos;
      </CardContent>
    </>
  );
};



// <>
//   <CardContent className='flex flex-col items-center justify-center'>
//     <nav>
//     <button
//         type='reset'
//         className='nav-search-button font-semibold padding 10px rounded no-line-through hover:line-through'
//         onClick={weatherTranslate}
//       />
//     </nav>
//     <div>
//       {lat} is your current latitude and {long} is your current longitude.
//     </div>
//     <div>{(weatherTranslate(weatherData)[0].weather).toString()}</div>
//     <div>
//       Your current temperature is {(weatherTranslate(weatherData)[0].temp).toString()} degrees Farenheit.
//     </div>
//     <div>
//       The highs and lows for right now are {(weatherTranslate(weatherData)[0].temp_max).toString()} and {(weatherTranslate(weatherData)[0].temp_min).toString()} degrees Farenheit.
//     </div>
// </CardContent >
// </>


export default WeatherDisplayMain;
