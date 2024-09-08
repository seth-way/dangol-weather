import { useState } from 'react';
import { useParams  } from 'react-router-dom';
import weatherData from '../assets/dummy_data/weather.json';
import { weatherInfoObject, weatherDataFormat, userSideWeatherInfo, weatherTranslateWeekly } from '@/lib/utils';

const WeatherDisplayMain = () => {
  const [weather5Day, set5Day] = useState([]);
  const [currentDay, setCurrentDay] = useState(0)
  const { lat, long } = useParams<{ lat: string; long: string }>();


  const returnWeather: Array<userSideWeatherInfo> = (weatherTranslateWeekly(weatherData));

  return (
    <div>
      <div>
        <h1>Your Weather Display
          <br />
          Updated as of {(returnWeather[0].date_text).toString()}, UTC.
        </h1>

        <div>
          {lat} is your current latitude and {long} </div>
        <div>Your current weather is: {(returnWeather[0].weather).toString()}</div>
        <div>
          Your current temperature is {(returnWeather[0].temp).toString()} degrees Farenheit.
        </div>
        <div>
          The highs and lows for right now are {(returnWeather[0].temp_max).toString()} and {(returnWeather[0].temp_min).toString()} degrees Farenheit.
        </div>
        <div>
          The humidity is {(returnWeather[0].humidity).toString()} percent.
        </div>
        <div>
          The windspeed is {(returnWeather[0].windspeed).toString()} MPH.
        </div>
      </div>

      <div>
        <br />
        <div>
          Your 5-ish day forecast:
        </div>
        <br />
        Now: {(returnWeather[0].weather)}
        <br />
        {(returnWeather[1].date_text)}: {(returnWeather[1].weather)}
        <br />
        {(returnWeather[2].date_text)}: {(returnWeather[2].weather)}
        <br />
        {(returnWeather[3].date_text)}: {(returnWeather[3].weather)}
        <br />
        {(returnWeather[4].date_text)}: {(returnWeather[4].weather)}
        <br />
      </div>
    </div >
)}

export default WeatherDisplayMain;