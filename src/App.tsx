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
  return (
    <>
      <ModeToggle />
      <Card>
        <Routes>
          <Route path={'/'} element={<UserLocationInput />} />
          {/* <Route path={'/'} element={<WeatherDisplayMain />} />
          <Route path={'/'} element={<DropdownDisplay />} /> */}
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
