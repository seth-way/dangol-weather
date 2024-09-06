import AsciiArt from './AsciiArt';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import boomhauer from '../assets/images/boomhauer.jpg';
import { useState } from 'react';
import locationData from '../assets/dummy_data/location.json';
import { useNavigate } from 'react-router-dom';

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
  }

  const handleLocationSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/location/${lat}/${lon}`);
  };

  const handleSearchReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    clearForm();
  };

  return (
    <>
      <CardHeader></CardHeader>
      <CardContent>
        <form onSubmit={handleLocationSubmit}>
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
  );
}

export default UserLocationInput;
