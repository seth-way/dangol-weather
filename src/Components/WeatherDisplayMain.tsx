// import { useState } from 'react';
import { useParams } from 'react-router-dom';
import weatherData from '../assets/dummy_data/weather.json';
import { weatherInfoObject, weatherDataFormat, userSideWeatherInfo, weatherTranslate } from '@/lib/utils';

const WeatherDisplayMain = () => {
  const { lat, long } = useParams<{ lat: string; long: string }>();

  // let stringVersion: string = "";
  // weatherTranslate(weatherData)[1].forEach((remainingTime) => {
  //   stringVersion = stringVersion.concat(remainingTime.weather.toString(), "\n")
  // });
  const returnWeather: Array<Array<userSideWeatherInfo>> = (weatherTranslate(weatherData));
console.log(returnWeather)
console.log(returnWeather[0])
console.log(returnWeather[1])
  return (
    <div>
      <div>
        <h1>Your Weather Display
          <br />
          Updated as of {(returnWeather[0][0].date_text).toString()}, UTC.
        </h1>

        <div>
          {lat} is your current latitude and {long} </div>
        <div>Your current weather is: {(returnWeather[0][0].weather).toString()}</div>
        <div>
          Your current temperature is {(returnWeather[0][0].temp).toString()} degrees Farenheit.
        </div>
        <div>
          The highs and lows for right now are {(returnWeather[0][0].temp_max).toString()} and {(returnWeather[0][0].temp_min).toString()} degrees Farenheit.
        </div>
        <div>
          The humidity is {(returnWeather[0][0].humidity).toString()} percent.
        </div>
        <div>
          The windspeed is {(returnWeather[0][0].windspeed).toString()} MPH.
        </div>
      </div>
      <div>
        <br />
        <div>
          Your weather for the rest of the day:
        </div>
        <br />
        {/* {stringVersion} */}
        <br />
        <div>
          {lat} is your current latitude and {long} is your current longitude.
        </div>
        <div>Your current weather is: {(returnWeather[0][0].weather).toString()}</div>
        <div>
          Your current temperature is {(returnWeather[0][0].temp).toString()} degrees Farenheit.
        </div>
        <div>
          The highs and lows for right now are {(returnWeather[0][0].temp_max).toString()} and {(returnWeather[0][0].temp_min).toString()} degrees Farenheit.
        </div>
        <div>
          The humidity is {(returnWeather[0][0].humidity).toString()} percent.
        </div>
        <div>
          The windspeed is {(returnWeather[0][0].windspeed).toString()} MPH.
        </div>
      </div>

      <div>
        <br />
        <div>
          Your 5-ish day forecast:
        </div>
        <br />
        Now: {(returnWeather[1][0].weather)}
        <br />
        {(returnWeather[1][1].date_text)}: {(returnWeather[1][1].weather)}
        <br />
        {(returnWeather[1][2].date_text)}: {(returnWeather[1][2].weather)}
        <br />
        {(returnWeather[1][3].date_text)}: {(returnWeather[1][3].weather)}
        <br />
        {(returnWeather[1][4].date_text)}: {(returnWeather[1][4].weather)}
        <br />
      </div>
    </div >
  )
    ;
};

export default WeatherDisplayMain;