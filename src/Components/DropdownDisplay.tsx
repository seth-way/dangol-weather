import React, { useEffect, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
} from '@/components/ui/popover';
// import weatherData from '../assets/dummy_data/weather.json'
import { Button } from '@/components/ui/button';
import SunnySVG from '../assets/images/weather_icons/sunny.svg'
import CloudSVG from '../assets/images/weather_icons/cloudy.svg'
import SnowSVG from '../assets/images/weather_icons/snow.svg'
import RainSVG from '../assets/images/weather_icons/rainy.svg'
import FogSVG from '../assets/images/weather_icons/fog.svg'
import { useNavigate, useParams } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



const functionToRemoveYear = (oldDate: string)=> {
  const [date] = oldDate.split(' ')
  const [year, month, day] = date.split('-')
  const newDateFormate = new Date(`${month}/${day}`)
  const ourFormate = { month: '2-digit', day: '2-digit'}
  return newDateFormate.toLocaleDateString(undefined, ourFormate)
}

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



const DropdownDisplay: React.FC = () => {

  const {lat, long} = useParams<{lat:string; long: string}>();
  console.log(lat)
  console.log(long)
  const navigate = useNavigate();

  const homePageView = () => {
    navigate('/')
  }


  const allIcons: Record<string, string> = {
    '10n': RainSVG,
    '04d': CloudSVG,
    '01d': SunnySVG,
    '02d': FogSVG,
    '03d': SnowSVG
  }
  
  // const [apiWeather, setApiWeather] = useState(false)
  const [fiveDayForecast, setFiveDayForecast] = useState<{ date: string; icon: string }[] | undefined>(undefined);



  const fiveDaySerchForecast = async () => {
    if (!lat || !long) {
      return
    }

    const latitude = parseFloat(lat)
    console.log(latitude)
    const longitude = parseFloat(long)
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude.toFixed(4)}&lon=${longitude.toFixed(4)}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=imperial`;
      console.log('-----',long)
      const response = await fetch(url);
      const data = await response.json();
      console.log('what am i getting ----> ',data)
      if(!response.ok) {
        console.error('Errorrrrr', data.message)
        return
      }
      // console.log(data.list)
      console.log('----->')
      console.log('*---->', lat)


      const sortedByDate = data.list.reduce((acc, element)=> {
        const time = element.dt_txt.split(' ')[0]
        if(!acc[time]) {
          acc[time] = element;
        }
        return acc
      }, {})
      console.log(data)
      // return Object.values(sortedByDate).slice(0, 5).map(element => ({
      //       date: functionToRemoveYear(element.dt_txt),
      //       icon: element.weather[0].icon
      // }))
      const anotherForecast = Object.values(sortedByDate).slice(0, 5).map(element => ({
        date: functionToRemoveYear(element.dt_txt),
        icon: element.weather[0].icon
      }))
      console.log('anotherForecast---->', anotherForecast)
      setFiveDayForecast(anotherForecast)

    //   const icon = allIcons[data.weather[0].icon] || SunnySVG

    //   setApiWeather({
    //     temperature: Math.floor(data.main.temp),
    //     icon: icon
    //   })
    } catch (error) {
      setFiveDayForecast(undefined);
    }
  }

  useEffect(()=> {
    console.log('lat', lat, 'lon', long)
    fiveDaySerchForecast()
    
  }, [lat, long])

  console.log('line 110', fiveDayForecast)
  return (
    <div className='flex justify-start p-4'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">5 Day</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20 ml-12">
          <DropdownMenuLabel>Forecast</DropdownMenuLabel>
          <DropdownMenuGroup className='max-h-[500px] w-25 pl-1'>
            <div>
              {fiveDayForecast?.map((weather, index)=> (
                <DropdownMenuItem className='flex items-center' >
                  <div key={index} className='flex items-center justify-between mb-2'>
                    <p className="text-xs">{weather.date}</p>
                    <img src={allIcons[weather.icon] || SunnySVG} className='w-8 h-8 pl-1 ml-5'/>
                  </div>
                </DropdownMenuItem>  
              ))}
            </div>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className='ml-2' onClick={homePageView}>
            Home
            </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  )
}

export default DropdownDisplay;