import AsciiArt from './AsciiArt';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import boomhauer from '../assets/images/boomhauer.jpg';
import {useState } from 'react'

function UserLocationInput (setFilteredCities: (arg0: String[]) => void, citiesList: String[]) {

  const [userSearchInput, setUserSearchInput] = useState('');
  function test(){
    console.log("tested")
  }

  const handleSearchInput = (e) => {
    setUserSearchInput(() => e.target.value);
    const newList = filterCities(e.target.value, citiesList)
    setFilteredCities(newList)
    if (newList.length === 0) {
      alert("No results matching your search, please try again!")
    };
  };

  function filterCities(name:string, cities:Array<String>) {
    return cities.filter(city => city.name.toLowerCase().includes(name.toLowerCase()))
  };

  function clearForm() {
    setFilteredCities(citiesList);
    setUserSearchInput('');
  }


  const handleSearchReset = (e) => {
    e.preventDefault();
    return
  };


  return (
    <>
    <CardHeader></CardHeader>
    <CardContent>
    <form onSubmit={test}>
      <input
        type="text"
        placeholder="Search by City"
        className="search-by-city"
        value={userSearchInput}
        onChange={handleSearchInput}
      />
      <button type="reset" className="nav-search-button" onClick={clearForm}>Reset</button>
    </form>
    </CardContent>
    <CardFooter><AsciiArt src={boomhauer} height={256} width={256} fontSize={0.3} /></CardFooter>
    </>
  )
}

export default UserLocationInput;
