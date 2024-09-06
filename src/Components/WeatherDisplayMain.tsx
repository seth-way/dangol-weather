import { useState } from 'react';
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
    // const desiredKey = "list";
    // const listval : {[key:string]:string} = Object.entries(weatherInfo).find(([key, val]) => key === desiredKey)?.[1];;
    console.log(weatherInfo.list[0].main);
    return weatherInfo.list[0].main;
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
        ${lat}, and also ${long} and $
        {JSON.stringify(weatherTranslate(weatherData))}
      </div>
    </div>
  );
};

export default WeatherDisplayMain;
