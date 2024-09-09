import React from 'react';
import { Button } from '@/components/ui/button';
import SunnySVG from '../assets/images/weather_icons/sunny.svg?react';
import CloudSVG from '../assets/images/weather_icons/cloudy.svg?react';
import SnowSVG from '../assets/images/weather_icons/snow.svg?react';
import RainSVG from '../assets/images/weather_icons/rainy.svg?react';
import FogSVG from '../assets/images/weather_icons/fog.svg?react';
import { useNavigate } from 'react-router-dom';
import {
  // weatherInfoObject,
  // weatherDataFormat,
  userSideWeatherInfo,
} from '@/lib/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IDays } from './WeatherDisplayMain';

const functionToRemoveYear = (oldDate: string) => {
  const [date] = oldDate.split(' ');
  const [, month, day] = date.split('-');
  const newDateFormated = new Date(`${month}/${day}`);
  //we can keep month as a number with 'numeric'
  //or make it 'Sep' or 'Oct' by changing it to 'short' instead of 'numeric'
  //to make the layout better had to use '2-digit'
  const ourFormat = { month: '2-digit', day: '2-digit' } as const;
  return newDateFormated.toLocaleDateString(undefined, ourFormat);
};

interface Props {
  weather5Day: userSideWeatherInfo[] | [];
  selectedDay: IDays;
  setSelectedDay: (day: IDays) => void;
}

const DropdownDisplay: React.FC<Props> = ({
  weather5Day,
  //selectedDay,
  setSelectedDay,
}) => {
  const navigate = useNavigate();

  const homePageView = () => {
    navigate('/');
  };

  const allIcons: Record<string, JSX.Element> = {
    '10n': <RainSVG />,
    '04d': <CloudSVG />,
    '01d': <SunnySVG />,
    '02d': <FogSVG />,
    '03d': <SnowSVG />,
  };

  return (
    <div className='flex justify-start p-4 mr-24'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>5 Day</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-20 ml-12'>
          <DropdownMenuLabel>Forecast</DropdownMenuLabel>
          <DropdownMenuGroup className='max-h-[500px] w-25 pl-1'>
            <div>
              {weather5Day.map((weather, index) => {
                const date = functionToRemoveYear(weather.date_text);
                const icon = weather.icon;
                return (
                  <DropdownMenuItem
                    className='flex items-center'
                    key={`item_${index}`}
                    onClick={() => setSelectedDay(index as IDays)}
                  >
                    <div
                      key={index}
                      className='flex items-center justify-between mb-2'
                    >
                      <p className='text-xs'>{date}</p>
                      {allIcons[icon] || <SunnySVG />}
                      {/* // className='w-8 h-8 pl-1 ml-5' */}
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </div>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='ml-2' onClick={homePageView}>
            Home
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
};

export default DropdownDisplay;
