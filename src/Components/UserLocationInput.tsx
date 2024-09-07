/// <reference types="vite-plugin-svgr/client" />
import AsciiArt from './AsciiArt';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import boomhauer from '../assets/images/booms/classic_boom.jpg';
import GlobeSVG from '../assets/images/globe.svg?react';
import { useState } from 'react';
import locationData from '../assets/dummy_data/location.json';
import { useNavigate } from 'react-router-dom';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

function UserLocationInput() {
  const navigate = useNavigate();
  const { lat, lon } = locationData[0];
  const [userSearchInput, setUserSearchInput] = useState<string>('');

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearchInput(() => e.currentTarget.value);
    //const newList = filterCities(e.currentTarget.value, citiesList);
    //setFilteredCities(newList);
    //if (newList.length === 0) {
    //  alert('No results matching your search, please try again!');
    //}
  };

  // function filterCities(name: string, cities: string[]) {
  //   return cities.filter(city =>
  //     city.name.toLowerCase().includes(name.toLowerCase())
  //   );
  // }

  function clearForm() {
    //setFilteredCities(citiesList);
    setUserSearchInput('');
  };

  const handleLocationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/location/${lat}/${lon}`);
  };

  const handleSearchReset = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    clearForm();
  };

  return (
    <>
      <CardHeader className='title font-bold text-2xl tracking-tighter'>Dang'olWeather.</CardHeader>
      <CardContent className='flex flex-col items-center justify-center'>
      <div className='flex flex-row justify-center my-'>
          <GlobeSVG height={50} width={50} 
          className='animate-spin-slow' />
          <GlobeSVG height={140} width={140}
           className='animate-spin-slower animate-reverse-spin' />
        </div>
        <form onSubmit={handleLocationSubmit}
         className='flex flex-col items-center space-y-2 mt-4'>
          <input
            type='text'
            placeholder='search by city'
            className='search-by-city text-center font-semibold tracking-tighter rounded w-59'
            value={userSearchInput}
            onChange={handleSearchInput}
          />
          <button
            type='reset'
            className='nav-search-button font-semibold padding 10px rounded no-line-through hover:line-through'
            onClick={handleSearchReset}
          >
            RESET
          </button>
        </form>
      </CardContent>
      <CardFooter>
        <AsciiArt src={boomhauer} height={256} width={256} fontSize={0.3} />
      </CardFooter>
    </>
  )
}


export default UserLocationInput;



