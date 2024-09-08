// import { useState } from 'react';
import AsciiArt from './AsciiArt';
import GlobeSVG from '../assets/images/globe.svg?react';
import classicBoom from '../assets/images/booms/classic_boom.jpg';
import { useParams } from 'react-router-dom';
import weatherData from '../assets/dummy_data/weather.json';

import SunnySVG from '../assets/images/weather_icons/sunny.svg'
import CloudSVG from '../assets/images/weather_icons/cloudy.svg'
import SnowSVG from '../assets/images/weather_icons/snow.svg'
import RainSVG from '../assets/images/weather_icons/rainy.svg'
import FogSVG from '../assets/images/weather_icons/fog.svg'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Dropdownmenu
} from '@/components/ui/card';

import { useState } from 'react';
import { weatherInfoObject, weatherDataFormat, userSideWeatherInfo, weatherTranslateWeekly } from '@/lib/utils';
import DropdownDisplay from './DropdownDisplay';
import { useEffect, useState } from 'react';

interface Props {
  city: string;
}

const WeatherDisplayMain = ({ city }: Props) => {
  const [weather5Day, set5Day] = useState([]);
  const [currentDay, setCurrentDay] = useState(0)
  const { lat, long } = useParams<{ lat: string; long: string }>();

  const [weatherData, setWetherData] = useState(false)

  const allIcons = {
    '10n': RainSVG,
    '04d': CloudSVG,
    '01d': SunnySVG,
    '02d': FogSVG,
    '03d': SnowSVG
  }

  const singleDay = async ()=> {

    const latitude = parseFloat(lat)
    console.log(latitude)
    const longitude = parseFloat(long)
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude.toFixed(4)}&lon=${longitude.toFixed(4)}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=imperial`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      const icon = allIcons[data.weather[0].icon] || SunnySVG

      setWetherData({
        minTemp: Math.floor(data.main.temp_min),
        maxTemp: Math.floor(data.main.temp_max),
        condition: (data.weather[0].description),
        location: data.name,
        icon: icon
      })
    } catch (error) {
      setWetherData(false)
    }
  }

  useEffect(()=> {
    singleDay()
  }, [])

  const today = new Date()

  const currentDay = today.toLocaleDateString()

  return (

    <>
      <CardContent className="flex flex-col items-center justify-center mb-4 px-4">
        {/* <div className="flex justify-between items-center w-full px-3 mt-3 mr-2">
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

        </div> */}
        <DropdownDisplay />
        <div className="flex flex-row justify-center my-4">
          <GlobeSVG height={50} width={50} className="animate-spin-slow" />
          <GlobeSVG height={115} width={115} className="animate-spin-slower animate-reverse-spin" />
          {/* <img src={weatherData.icon} className='w-50 h-12 pl-1 ml-5'/> */}
        </div>

        <div className="text-center">
          {/* <div className="text-lg font-bold">{lat} - {long}</div> */}
          <div className="text-lg font-bold">{weatherData.location}</div>
          <div>
            {weatherData.minTemp}°F
            -- {weatherData.maxTemp}°F
            <div className='text-sm'>
              conditions: <span className='font-bold'>{weatherData.condition}</span>
            </div>
            <div className="italic text-sm">{currentDay}</div>
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
