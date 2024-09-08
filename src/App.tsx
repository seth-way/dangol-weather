import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import WeatherDisplayMain from './components/WeatherDisplayMain.tsx';
import DropdownDisplay from './components/DropdownDisplay.tsx';
import UserLocationInput from './components/UserLocationInput.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { ModeToggle } from './components/ui/mode-toggle.tsx';

function App() {
  // const [location, setLocation] = useState(null);
  const [citiesList, setCitiesList] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [city, setCity] = useState<string>('');
  return (
    <>
      <Card>
      <ModeToggle className='mt-5' />
        <Routes>
          <Route path={'/'} element={<UserLocationInput setCity={setCity}/>} />
          <Route path={'/location/:lat/:long'} element={<WeatherDisplayMain city={city}/>} />
         {/*  <Route path={'/'} element={<DropdownDisplay />} /> */}
        </Routes>
        {/* <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>*/}
      </Card>
    </>
  );
}

export default App;
