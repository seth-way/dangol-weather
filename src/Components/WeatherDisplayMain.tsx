// import { useState } from 'react';
import AsciiArt from './AsciiArt';
import GlobeSVG from '../assets/images/globe.svg?react';
import classicBoom from '../assets/images/booms/classic_boom.jpg';
//import { useParams } from 'react-router-dom';
import weatherData from '../assets/dummy_data/weather.json';
import {
  CardContent,
  CardFooter,
} from '@/components/ui/card';
//import { useState } from 'react';
//import { weatherInfoObject, weatherDataFormat, userSideWeatherInfo} from '/@lib/utils';
import { weatherTranslateWeekly } from '@/lib/utils';


import DropdownDisplay from './DropdownDisplay';

interface Props {
  city: string;
}

const WeatherDisplayMain = ({ city }: Props) => {
  //const [weather5Day, set5Day] = useState([]);
  //const [currentDay, setCurrentDay] = useState(0)
  //const { lat, long } = useParams<{ lat: string; long: string }>();
  console.log('weather data ', weatherData);
  //const returnWeather: Array<userSideWeatherInfo> = (weatherTranslateWeekly(weatherData));

 
  
  console.log(weatherTranslateWeekly(weatherData));
  // need a util function to turn weatherData.list -> "today & 4 day forcast"
  // setHours(number between 0 and 23) to set an exact hour
  // const currentDay = new Date()
  // const
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
        </div>

        <div className="text-center">
          {/* <div className="text-lg font-bold">{lat} - {long}</div> */}
          <div className="text-lg font-bold">{city.toUpperCase()}</div>
          <div>
            {/* {(weatherTranslate(weatherData)[0].temp_min).toString()}°F */}
            420 degrees
            -- 
            {/* {(weatherTranslate(weatherData)[0].temp_max).toString()}°F */}
            69 celsius
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
