// import { useState } from 'react';
import { useParams } from 'react-router-dom';
import weatherData from '../assets/dummy_data/weather.json';

const WeatherDisplayMain = () => {
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
    const weatherInfoArrayWeek: Array<userSideWeatherInfo> = [];

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
    <div>
      <h1>Hello You Weather Display Main</h1>
      <div>
        {lat} is your current latitude and {long} is your current longitude.
      </div>
      <div>Your current weather is: {(weatherTranslate(weatherData)[0].weather).toString()}</div>
      <div>
      Your current temperature is {(weatherTranslate(weatherData)[0].temp).toString()} degrees Farenheit.
      </div>
      <div>
      The highs and lows for right now are {(weatherTranslate(weatherData)[0].temp_max).toString()} and {(weatherTranslate(weatherData)[0].temp_min).toString()} degrees Farenheit.
      </div>
      {/* add humidity, add date, add windspeed. */}
    </div>
  );
};

export default WeatherDisplayMain;
