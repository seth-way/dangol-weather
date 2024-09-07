/// <reference types="vite-plugin-svgr/client" />
import AsciiArt from './AsciiArt';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
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
    setUserSearchInput(e.currentTarget.value);
  };


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
      <CardHeader className='title font-bold text-2xl'>DANGOL'WEATHER.</CardHeader>
      <CardContent className='flex flex-col items-center justify-center'>
        <div className='flex flex-row justify-center space-x-1'>
          <GlobeSVG height={50} width={50} />
          <GlobeSVG height={50} width={50} />
        </div>
        <form onSubmit={handleLocationSubmit} className='flex flex-col items-center space-y-2 mt-4'>
          <input
            type='text'
            placeholder='Search by City'
            className='search-by-city'
            value={userSearchInput}
            onChange={handleSearchInput}
          />
          <button
            type='reset'
            className='nav-search-button'
            onClick={handleSearchReset}
          >
            Reset
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
