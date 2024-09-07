import React, { useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import weatherData from '../assets/dummy_data/weather.json'
import { Button } from '@/components/ui/button';
import SunnySVG from '../assets/images/weather_icons/sunny.svg'
import CloudSVG from '../assets/images/weather_icons/cloudy.svg'
import SnowSVG from '../assets/images/weather_icons/snow.svg'
import RainSVG from '../assets/images/weather_icons/rainy.svg'
import FogSVG from '../assets/images/weather_icons/fog.svg'
import { useNavigate } from 'react-router-dom';

//display the date without the year
//the drop down will have an image and the date in month and day
//

const functionToRemoveYear = (oldDate: string)=> {
  const [date] = oldDate.split(' ')
  const [year, month, day] = date.split('-')
  const newDateFormate = new Date(`${month}/${day}`)
  //we can keep month as a number with 'numeric'
  //or make it 'Sep' or 'Oct' by changing it to 'short' instead of 'numeric'
  //to make the layout better had to use '2-digit'
  const ourFormate = { month: '2-digit', day: '2-digit'}
  return newDateFormate.toLocaleDateString(undefined, ourFormate)
}
// need the drop down to have a date and an icon
// in the weather data we have a date and an icon
// need to import a dummy icon to replace the one in the data

interface WeatherIcon {
  icon: string;
}

interface WeatherTime {
  dt_txt: string;
  weather: WeatherIcon[]
}

interface WeatherMain {
  list : WeatherTime[]
}
// assign the JSON data to a variable 
const newWeatherData: NewWeatherData = weatherData
console.log('line 34--', newWeatherData)

// const removeYear = (oldDate)=> {
//   const noYear = oldDate.split('-')
  
// }

// data type 'NewWeatherData' is an argument and 
// we use it to grab the information we need
// reduce would be better to group them by date
const displayMyDropdown = (data: NewWeatherData)=> {
  const sortedByDate = data.list.reduce((acc, element)=> {
    const time = element.dt_txt.split(' ')[0]
    if(!acc[time]) {
      acc[time] = element;
    }
    return acc
  }, {} as Record<string, WeatherTime>)
  return Object.values(sortedByDate).slice(0, 5).map(element => ({
    // // console.log('------->',element.dt_txt.split(' ')[0])
    //   return {
        // date: element.dt_txt.split(' ')[0],
        date: functionToRemoveYear(element.dt_txt),
        icon: element.weather[0].icon
  }))
    // })
    // console.log(sortedByDate)
    // return Object.values(sortedByDate).slice(0, 5).map(item => ({
    //   date: item.dt_txt.split(' ')[0],
    //   icon: item.weather[0].icon
    // }))
  // const convertedData = Object.values(sortedByDate).slice(0, 5).map(element => {
  // // console.log('------->',element.dt_txt.split(' ')[0])
  //   return {
  //     date: element.dt_txt.split(' ')[0],
  //     icon: element.weather[0].icon
  //   }
  // })
}



const DropdownDisplay: React.FC = () => {

  const navigate = useNavigate();

  const homePageView = () => {
    navigate('/')
  }

  const [drop, setDrop] = useState<boolean>(false)
  // const [myWeather, setMyWeather] = useState<boolean>(false)
  // need to toggle the functionality of the button 
  // setDrop updates it so if its open its true
  // '!' makes it false
  // the function goes back and forth based on if its true or false
  const toggleFunction = () => {
    setDrop(open => !open)
  }

  // console.log(weatherData.list[0].dt_txt) //time
  // console.log(weatherData.list[0].weather[0].icon) //icon
  // console.log(weatherData.list)
  // const newWeather = weatherData.list
  const allIcons: Record<string, string> = {
    '10n': RainSVG,
    '04d': CloudSVG,
    '01d': SunnySVG,
    '02d': FogSVG,
    '03d': SnowSVG
  }
  // setMyWeather({

  // })

  console.log('line 97' ,allIcons)

  // const icon = allIcons[weatherData.list[0].weather[0].icon] || sunny_icon

  const newWeatherData: NewWeatherData = weatherData
  console.log('line 100', newWeatherData)
  const [fiveDayForecast, setFiveDayForecast] = useState<{date: string, icon: string}[] | undefined>(undefined)
  // const fiveDayForecast = displayMyDropdown(newWeatherData)
  // console.log(fiveDayForecast)

  useEffect(()=> {
    const foreCast = displayMyDropdown(newWeatherData)
    setFiveDayForecast(foreCast)
  }, [newWeatherData])
  console.log('line 110', fiveDayForecast)
  return (
    <div className='flex justify-start p-4'>
      <Popover open={drop} onOpenChange={setDrop} >
        <PopoverTrigger asChild>
          <Button onClick={toggleFunction} className='cursor-pointer'>
            5 Days
          </Button>
        </PopoverTrigger>
        <PopoverContent className='max-h-[500px] w-20 pl-1'>
          <div >
            {fiveDayForecast?.map((weather, index)=> (
              <div key={index} className='flex items-center justify-between mb-2'>
                <p className="text-xs">{weather.date}</p>
                <img src={allIcons[weather.icon] || SunnySVG} className='w-8 h-8 pl-1'/>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <Popover>
      <PopoverTrigger className='pl-1' >
          <Button onClick={homePageView}>
            Home
          </Button>
        </PopoverTrigger>
      </Popover>
    </div>
  )
}

export default DropdownDisplay;